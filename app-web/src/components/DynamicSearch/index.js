import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Title, LinkContainer } from '../Home';
import { ChevronLink } from '../UI/Link';
import { SEARCH_SOURCE_CONFIG, SEARCH_SOURCES } from '../../constants/search';

import documizeLogo from '../../assets/images/documize_logo.png';
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

export const SearchResults = ({ results, sourceType, link, renderItem, ...rest }) => {
  const contentMapping = {
    [SEARCH_SOURCES.documize]: {
      name: 'From Documize',
      logo: documizeLogo,
      id: 'documize',
    },
    [SEARCH_SOURCES.rocketchat]: {
      name: 'From Rocket.Chat',
      logo: rocketchatLogo,
      id: 'rocketChat',
    },
  };

  const content = contentMapping[sourceType];
  const settings = SEARCH_SOURCE_CONFIG[sourceType]
    ? SEARCH_SOURCE_CONFIG[sourceType]
    : SEARCH_SOURCE_CONFIG.default;

  return (
    <Container {...rest}>
      <Title id={content.id}>
        {content.name} <img src={content.logo} alt={content.name} />
      </Title>

      {results.length > settings.maxResults && (
        <small>
          Showing {settings.maxResults} of {results.length}
        </small>
      )}
      {results.slice(0, settings.maxResults).map(r => renderItem(r))}
      <LinkContainer>
        <ChevronLink to={link.to}>{link.text}</ChevronLink>
      </LinkContainer>
    </Container>
  );
};

SearchResults.propTypes = {
  link: PropTypes.shape({
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
  renderItem: PropTypes.func,
  results: PropTypes.array,
  sourceType: PropTypes.string,
};
