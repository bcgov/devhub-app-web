const isString = require('lodash/isString');
const { NO_DESCRIPTION, LONG_DESCRIPTION, TOO_LONG_DESCRIPTION } = require('./strings');

const error = (message, id) => ({
  message,
  id,
  type: 'error',
});

const warning = (message, id) => ({
  message,
  id,
  type: 'warn',
});

const VALIDATORS = {
  DESCRIPTION: 'DESCRIPTION',
};
/**
 * validates description
 * @param {Object} frontmatter
 */
const validateDescription = ({ description }) => {
  if (!description) {
    return error(NO_DESCRIPTION, VALIDATORS.DESCRIPTION);
  }

  if (!isString(description)) {
    return error(NO_DESCRIPTION, VALIDATORS.DESCRIPTION);
  }

  const { length } = description;

  if (length > 140 && length < 240) {
    return warning(LONG_DESCRIPTION, VALIDATORS.DESCRIPTION);
  }

  if (length >= 240) {
    return error(TOO_LONG_DESCRIPTION, VALIDATORS.DESCRIPTION);
  }
  return null;
};

/**
 *
 * @param {Array} messages the list of messages returned from a validation set
 * @returns {Boolean}
 */
const hasNoErrors = messages => messages.every(m => !m || m.type !== 'error');

module.exports = { validateDescription, hasNoErrors, VALIDATORS };
