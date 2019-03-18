import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { getGithubIssuesRoute } from '../../../utils/helpers';
import { Link } from '../../UI/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/fontawesome-free-brands';

const Container = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 0 15px;
  padding: 0;
  border: 1px solid #ccc;
  list-style: none;
`;

const LI = styled.li`
  margin: 0;
  padding: 4px;
  flex: 1 0 45px;
  > a {
    text-decoration: none;
  }
`;

/**
 * gets a github issue route with a precanned message as params
 * @param {String} repo
 * @param {String} owner
 * @param {String} pageTitle the title of the resource page
 * @param {String} originalSource path to the markdown file as found in github
 * @param {String} devhubPath path to the resource page as found in devhub
 * @returns {String} the url to the issues route
 */
export const getCannedIssueMessage = (repo, owner, pageTitle, originalSource, devhubPath) => {
  const route = getGithubIssuesRoute(repo, owner);
  const title = encodeURIComponent(`Devhub Issue: ${pageTitle} [short description here]`);
  const body = encodeURIComponent(
    `> path: (do not delete) ${originalSource}\n > (do not delete) devhub page: ${devhubPath}\n\n## Devhub Content Issue\n[description of your issue here]`,
  );
  return `${route}/new?title=${title}&body=${body}`;
};

export const IDS = {
  issue: 'actions-issue',
};

const Actions = ({ repo, owner, pageTitle, originalSource, devhubPath }) => (
  <Container>
    <LI>
      <Link
        id={IDS.issue}
        to={getCannedIssueMessage(repo, owner, pageTitle, originalSource, devhubPath)}
      >
        <FontAwesomeIcon icon={faGithub} /> Make an Issue
      </Link>
    </LI>
  </Container>
);

Actions.propTypes = {
  repo: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  originalSource: PropTypes.string.isRequired,
  devhubPath: PropTypes.string.isRequired,
};

export default Actions;
