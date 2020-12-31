import React from 'react';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import {
  SEARCH_SOURCE_CONFIG,
  SEARCH_SOURCES,
  GITHUB_SEARCH_SOURCE_TYPENAMES,
} from '../../constants/search';
import { SEARCH_RESOURCE_TYPES } from '../../constants/ui';
import { githubSearchReducer, documizeSearchPurifier } from '../../utils/search';

import { DynamicSearchResults } from '../DynamicSearchResults';
import { RocketChatItem } from '../RocketChatItem/RocketChatItem';
import Row from '../Card/Row';
import Column from '../Card/Column';
import { Card } from '../Card';
import GithubIssueCardHeader from '../DynamicSearchResults/GithubIssueCardHeader';
import CardHeader from '../Card/CardHeader';

export const convertGithubResultsToCardNodes = results => {
  const parsedPayloads = results.map(gh => JSON.parse(gh.typePayload));
  // github results come in different flavors: issues, prs, repos
  // they also belong to the same list and require separating out in order
  // to ensure both 'types' display
  const githubGroupedByType = {
    [GITHUB_SEARCH_SOURCE_TYPENAMES.Repository]: [], // provide default values incase no results resolve
    [GITHUB_SEARCH_SOURCE_TYPENAMES.Issue]: [],
    ...groupBy(parsedPayloads, '__typename'),
  };

  const issues = githubGroupedByType[GITHUB_SEARCH_SOURCE_TYPENAMES.Issue]
    .slice(0, SEARCH_SOURCE_CONFIG[SEARCH_SOURCES.github].maxResults)
    .map(githubSearchReducer);

  const repositories = githubGroupedByType[GITHUB_SEARCH_SOURCE_TYPENAMES.Repository]
    .slice(0, SEARCH_SOURCE_CONFIG[SEARCH_SOURCES.github].maxResults)
    .map(githubSearchReducer);

  return issues.concat(repositories);
};

export const convertDocumizeResultsToCardNodes = results => {
  const parsedPayloads = results.map(dc => JSON.parse(dc.typePayload));
  return parsedPayloads
    .slice(0, SEARCH_SOURCE_CONFIG[SEARCH_SOURCES.documize].maxResults)
    .map(documizeSearchPurifier);
};

export const convertRocketchatResultsToItems = results => {
  const { maxResults } = SEARCH_SOURCE_CONFIG[SEARCH_SOURCES.rocketchat];
  return results.slice(0, maxResults).map(r => {
    return JSON.parse(r.typePayload);
  });
};

/**
 * renders cards from documize or github results
 * @param {Array} cards
 */
export const renderCards = cards => (
  <Row>
    {cards.map(gh => (
      <Column
        key={gh.id}
        style={{
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <Card
          {...gh.fields}
          type={gh.fields.resourceType}
          data-testid={gh.id}
          renderHeader={() => {
            return gh.fields.resourceType === SEARCH_RESOURCE_TYPES.GITHUB_ISSUE ? (
              <GithubIssueCardHeader
                resourceType={gh.fields.resourceType}
                repository={gh.repository.name}
              />
            ) : (
              <CardHeader resourceType={gh.fields.resourceType} linksToExternal />
            );
          }}
        />
      </Column>
    ))}
  </Row>
);

/**
 * renders rocket chat items
 * @param {Array} results
 */
export const renderRocketchat = results =>
  results.map(r => <RocketChatItem key={r.id} {...r} data-testid={r.id} />);

export const SearchGateResults = ({ searchSources }) => {
  const searchSourceConfig = {
    [SEARCH_SOURCES.github]: {
      link: {
        to: 'https://github.com/bcgov',
        text: 'Go To Github',
      },
      render: renderCards,
      converter: convertGithubResultsToCardNodes,
    },
    [SEARCH_SOURCES.documize]: {
      link: {
        to: 'https://docs.pathfinder.gov.bc.ca/',
        text: 'Go To documize',
      },
      render: renderCards,
      converter: convertDocumizeResultsToCardNodes,
    },
    [SEARCH_SOURCES.rocketchat]: {
      link: {
        to: 'https://chat.pathfinder.gov.bc.ca',
        text: 'Go To Rocket.Chat',
      },
      render: renderRocketchat,
      converter: convertRocketchatResultsToItems,
    },
  };

  // convert results based on the source type
  const results = Object.keys(searchSources).reduce((results, searchSource) => {
    const searchSourceResults = searchSources[searchSource];
    results[searchSource] = searchSourceResults
      ? searchSourceConfig[searchSource].converter(searchSourceResults)
      : [];
    return results;
  }, {});

  // render results as their appropriate component based on source  type
  return Object.keys(results).map(sourceType => {
    const sourceResults = results[sourceType];

    if (!isEmpty(sourceResults) && sourceResults.length > 0) {
      const { link, render } = searchSourceConfig[sourceType];
      return (
        <DynamicSearchResults
          key={sourceType}
          numResults={sourceResults.length}
          sourceType={sourceType}
          link={link}
        >
          {render(sourceResults)}
        </DynamicSearchResults>
      );
    }
    return null;
  });
};
