


import gql from 'graphql-tag';

export const ROCKET_GATE_QUERY  = gql`
  query DevHubQuery($queryString: String!) {
    search(searchString: $queryString) {
      message
      author
      time
      roomId
      id
    }
  }
`;