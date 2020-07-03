/**
 * takes in a 'source' object from the TopicForm and reduces it to the
 * expected format from the registry
 * @param {Object} source the source (could be web or github)
 * @param {String} source.sourceType
 * @param {Object} source.sourceProperties
 * @param {String} operation the form mode (edit or create)
 */
export const reduceFormSourceToSourceProperties = ({ sourceType, sourceProperties }) => {
  if (sourceType === 'github') {
    return {
      ...sourceProperties,
      files: sourceProperties.files.split(',').map(file => file.trim()),
    };
  }

  if (sourceType === 'web') {
    return sourceProperties;
  }

  return {};
};

/**
 *
 * @param {Object} values values from topic form submission
 * @param {String} operation the form mode (edit or create)
 * @returns {Object}
 */
export const convertToRegistryFormat = ({ name, description, sources }, operation) => {
  const convertedFields = {
    name,
    description,
    sourceProperties: {
      sources: sources.map(source => ({
        sourceType: source.sourceType,
        sourceProperties: reduceFormSourceToSourceProperties(source),
        resourceType: source.resourceType,
      })),
    },
  };
  return convertedFields;
};
