// key of the query param in the url when searching ie ?q=
export const SEARCH_QUERY_PARAM = 'q';

export const SEARCH_FIELD_NAMES = [
  'title',
  'titles',
  'content',
  'contents',
  'description',
  'descriptions',
  'topicName',
  'topicname',
  'topicNames',
  'topicnames',
  'topic Name',
  'topic name',
  'topic Names',
  'topic names',
  'tags',
  'label',
  'author',
  'authors',
  'persona',
  'personas',
];

export const SEARCH_FIELD_MAPPING = {
  persona: { text: 'personas' },
  personas: { text: 'personas' },
  author: { text: 'author' },
  authors: { text: 'author' },
  label: { text: 'labels' },
  tags: { text: 'tags' },
  title: { text: 'title' },
  titles: { text: 'title' },
  content: { text: 'content' },
  contents: { text: 'content' },
  description: { text: 'description' },
  descriptions: { text: 'description' },
  topicName: { text: 'topicName' },
  topicname: { text: 'topicName' },
  topicNames: { text: 'topicName' },
  topicnames: { text: 'topicName' },
  'topic Name': { text: 'topicName' },
  'topic name': { text: 'topicName' },
  'topic Names': { text: 'topicName' },
  'topic names': { text: 'topicName' },
};

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
