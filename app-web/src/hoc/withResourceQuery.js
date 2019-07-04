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

/**
 * passes all devhubSiphon data to the child component
 */
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { sortDevhubTopicsAfterSelectedTopics } from '../utils/helpers';

const withResourceQuery = WrappedComponent => () => props => (
  <StaticQuery
    query={graphql`
      query resourceQuery {
        siteSearchIndex {
          index
        }

        allDevhubCollection {
          edges {
            node {
              id
              name
              description
              fields {
                githubRaw {
                  id
                  fields {
                    resourceType
                  }
                  childMarkdownRemark {
                    fields {
                      title
                      description
                      image
                      author
                    }
                  }
                }
              }
              childrenDevhubSiphon {
                id
                resource {
                  type
                  path
                }
                _metadata {
                  position
                }
                unfurl {
                  title
                  description
                  image
                }
              }
            }
          }
        }
        allEventbriteEvents(
          sort: { fields: [start___local], order: ASC }
          filter: { shareable: { eq: true } }
        ) {
          edges {
            node {
              siphon {
                unfurl {
                  title
                  description
                  image
                }
                resource {
                  type
                  path
                }
                id
              }
              start {
                day: local(formatString: "DD")
                month: local(formatString: "MMM")
                year: local(formatString: "YYYY")
                daysFromNow: local(difference: "days")
              }
              venue {
                name
              }
            }
          }
        }
        allMeetupGroup {
          edges {
            node {
              childrenMeetupEvent {
                siphon {
                  unfurl {
                    title
                    description
                    image
                  }
                  resource {
                    type
                    path
                  }
                  id
                }
                day: local_date(formatString: "DD")
                month: local_date(formatString: "MMM")
                year: local_date(formatString: "YYYY")
                daysFromNow: local_date(difference: "days")
                status
                fields {
                  location
                  description
                  link
                }
              }
            }
          }
        }
        allDevhubSiphon {
          edges {
            node {
              id
              name
              owner
              parent {
                id
              }
              _metadata {
                position
              }
              fields {
                resourceType
                personas
              }
              source {
                displayName
                sourcePath
                type
                name
              }
              resource {
                path
                type
              }
              unfurl {
                title
                description
                type
                image
                author
              }
              childMarkdownRemark {
                frontmatter {
                  pageOnly
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const sortedTopics = sortDevhubTopicsAfterSelectedTopics(data.allDevhubCollection.edges);

      return (
        <WrappedComponent
          data={{ ...data, allDevhubCollection: { edges: sortedTopics } }}
          {...props}
        />
      );
    }}
  />
);

export default withResourceQuery;
