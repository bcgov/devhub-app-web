import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
import { getCannedIssueMessage } from '../../../utils/helpers';
import { Link } from '../../UI/Link';

const Container = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 0 15px;
  padding: 0;
  font-size: 18px;
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
  > a:hover {
    text-decoration: underline;
  }
`;

export const TEST_IDS = {
  issue: 'actions-issue',
};

const Actions = ({ repo, owner, pageTitle, originalSource, devhubPath }) => (
  <Container>
    <LI>
      <Link
        data-testid={TEST_IDS.issue}
        to={getCannedIssueMessage(repo, owner, pageTitle, originalSource, devhubPath)}
        aria-label="create an issue for this page on github"
      >
        <FontAwesomeIcon icon={faGithub} /> Create an Issue
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
