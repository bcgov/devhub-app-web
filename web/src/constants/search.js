// key of the query param in the url when searching ie ?q=
export const SEARCH_QUERY_PARAM = 'q';

// federated search configurations
export const SEARCH_SOURCES = {
  rocketchat: 'rocketchat',
  github: 'github',
  documize: 'documize',
};

export const SEARCH_SOURCE_CONFIG = {
  [SEARCH_SOURCES.rocketchat]: {
    maxResults: 10,
  },
  [SEARCH_SOURCES.documize]: {
    maxResults: 12,
  },
  [SEARCH_SOURCES.github]: {
    // Github will be rendered as cards, since cards align in grids of 4
    // columns this will make a neat set of of 3 rows
    maxResults: 12,
  },
  default: {
    maxResults: 9,
  },
};

// these constant values are based on the Github v4 graphql api issue/repo search
// they provide a field called '__typename' which relates to these values
export const GITHUB_SEARCH_SOURCE_TYPENAMES = {
  Issue: 'Issue',
  PullRequest: 'PullRequest',
  Repository: 'Repository',
};
