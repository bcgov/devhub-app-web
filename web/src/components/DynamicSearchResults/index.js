import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Title, LinkContainer } from '../Home';
import { ChevronLink } from '../UI/Link';
import { SEARCH_SOURCE_CONFIG, SEARCH_SOURCES } from '../../constants/search';
import { Element } from 'react-scroll';
import documizeLogo from '../../assets/images/documize_logo.png';
import githubLogo from '../../assets/images/github_logo.png';
import rocketchatLogo from '../../assets/images/rocketchat_logo.svg';

const Container = styled.div`
  padding: 0;
  margin: 0;
  list-style: none;
  max-width: 1100px;
  margin: 20px auto;
  img {
    width: 40px;
    margin-bottom: 0;
    margin-left: 3px;
  }
`;

export const SEARCH_SOURCE_CONTENT = {
  [SEARCH_SOURCES.documize]: {
    name: 'From Documize',
    logo: documizeLogo,
    id: 'documize',
    testid: 'searchgate.documize',
  },
  [SEARCH_SOURCES.rocketchat]: {
    name: 'From Rocket.Chat',
    logo: rocketchatLogo,
    id: 'rocketChat',
    testid: 'searchgate.rocketChat',
  },
  [SEARCH_SOURCES.github]: {
    name: 'From Github',
    logo: githubLogo,
    id: 'github',
    testid: 'searchgate.github',
  },
};

export const DynamicSearchResults = ({ numResults, sourceType, link, children, ...rest }) => {
  const content = SEARCH_SOURCE_CONTENT[sourceType];
  const settings = SEARCH_SOURCE_CONFIG[sourceType]
    ? SEARCH_SOURCE_CONFIG[sourceType]
    : SEARCH_SOURCE_CONFIG.default;

  return (
    <Container data-testid={content.testid} {...rest}>
      <Element name={content.id}>
        <Title id={content.id}>
          {content.name} <img src={content.logo} alt={content.name} />
        </Title>
      </Element>

      {numResults > settings.maxResults && (
        <small>
          Showing {settings.maxResults} of {numResults}
        </small>
      )}

      {children}

      <LinkContainer>
        <ChevronLink to={link.to}>{link.text}</ChevronLink>
      </LinkContainer>
    </Container>
  );
};

DynamicSearchResults.propTypes = {
  link: PropTypes.shape({
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
  numResults: PropTypes.number,
  children: PropTypes.node,
  sourceType: PropTypes.string,
};
