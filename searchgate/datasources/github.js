/*
Copyright 2019 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
const { graphql } = require('@octokit/graphql');
const _ = require('lodash');

const { BASE_DATA_SOURCES } = require('../constants');

class GithubApi {
  constructor({ baseURL, authToken }) {
    this.baseURL = `${baseURL}`;
    this.authToken = authToken;
    this.dataSourceType = BASE_DATA_SOURCES.github;
  }

  /**
     * assembles a github v4 api search query that specifically searches within an organization
     * @param {String} query
     * @param {String} org
     */
  static queryWithOrg(query, org) {
    return `${query} org:${org}`;
  }

  static githubResultsReducer(edge) {
    return {
      type: BASE_DATA_SOURCES.github,
      id: edge.node.id,
      typePayload: JSON.stringify(edge.node),
    };
  }

  async searchReposInOrg({ query, org, first }) {
    try {
      const { search } = await graphql(`
      query Search($searchString: String!, $first: Int!){
        search(query: $searchString, type: REPOSITORY, first: $first ) {
          edges {
            node {
              __typename 
              ... on Repository {
                id
                isArchived
                createdAt
                watchers {
                  totalCount
                }
                owner {
                  login
                }
                updatedAt
                stargazers {
                  totalCount
                }
                description
                url
                name
              }
            }
          }
        } 
      }`,
      {
        searchString: GithubApi.queryWithOrg(query, org),
        first,
        headers: {
          authorization: `token ${this.authToken}`,
        },
      });
      return search;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async searchIssuesInOrg({ query, org, first }) {
    try {
      const { search } = await graphql(`
      query Search($searchString: String!, $first: Int!) {
        search(query: $searchString, type: ISSUE, first: $first ) {
          edges {
            node {
              __typename 
              ... on Issue {
                id
                author {
                  avatarUrl
                  login
                }
                number
                body
                url
                title
                state
                repository {
                  name
                  owner {
                    login
                  }
                }
                createdAt
                updatedAt
              }
            }
          }
        } 
      }`,
      {

        searchString: GithubApi.queryWithOrg(query, org),
        first,
        headers: {
          authorization: `token ${this.authToken}`,
        },
      });
      return search;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  static reduceToSingleSet(results) {
    return results.reduce((array, resultSet) => array.concat(resultSet.edges), []);
  }


  async search({ query, orgs, first = 100 }) {
    // search against the list of orgs

    const issues = await Promise.all(_.map(orgs, (org) => this.searchIssuesInOrg({ query, org, first })));

    const repos = await Promise.all(_.map(orgs, (org) => this.searchReposInOrg({ query, org, first })));

    // issues and repos are 2d arrays of edges that need to be reduced to a single set
    const reducedIssues = GithubApi.reduceToSingleSet(issues);
    const reducedRepos = GithubApi.reduceToSingleSet(repos);
    // flatten results
    const flattenedResults = _.flatten(reducedIssues.concat(reducedRepos));

    return _.map(flattenedResults, GithubApi.githubResultsReducer);
  }
}

module.exports = GithubApi;
