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
import { sortDevhubTopicsAfterSelectedTopics, buildPopularTopic } from '../utils/helpers';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { POPULAR_TOPIC_CONFIGURATION, DYNAMIC_TOPIC_PATHS } from '../constants/ui';

const withResourceQuery = WrappedComponent => () => props => (
  <StaticQuery
    query={graphql`
      query resourceQuery {
        siteSearchIndex {
          index
        }
        allGithubRaw {
          edges {
            node {
              id
              pageViews
              fields {
                resourceType
                title
                description
                image
                pagePaths
                standAlonePath
                slug
                personas
              }
            }
          }
        }
        allMarkdownRemark {
          edges {
            node {
              fields {
                title
                slug
                standAlonePath
                resourceType
                image
                description
              }
              id
            }
          }
        }
        allDevhubTopic {
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
                    title
                    description
                    image
                    slug
                  }
                }
              }
              connectsWith {
                ...DevhubNodeConnection
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
                fields {
                  resourceType
                  pagePaths
                  title
                  description
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
              fields {
                resourceType
                title
                description
                pagePaths
                image
                standAlonePath
              }
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
              id
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
        #Commented out since Meetup no longer has an API and has switched to OAUTH, but the plugin we use may be updated
        #more info at https://chat.pathfinder.gov.bc.ca/channel/general?msg=MdAyQzrPRPpQt382o
        #allMeetupGroup {
        #edges {
        #node {
        #childrenMeetupEvent {
        #siphon {
        #unfurl {
        #title
        #description
        #image
        #}
        #resource {
        #type
        #path
        #}
        #id
        #}
        #id
        #day: local_date(formatString: "DD")
        #month: local_date(formatString: "MMM")
        #year: local_date(formatString: "YYYY")
        #daysFromNow: local_date(difference: "days")
        #status
        #fields {
        #location
        #description
        #link
        #resourceType
        #title
        #pagePaths
        #image
        #standAlonePath
        #}
        #}
        #}
        #}
        #}
        allDevhubSiphon(filter: { source: { type: { eq: "web" } } }) {
          edges {
            node {
              id
              name
              owner
              fields {
                standAlonePath
              }
              parent {
                id
              }
              fields {
                resourceType
                personas
                title
                description
                image
                pagePaths
                standAlonePath
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
      const sortedTopics = sortDevhubTopicsAfterSelectedTopics(data.allDevhubTopic.edges);
      const { name, description, minPageViews, maxNodes } = POPULAR_TOPIC_CONFIGURATION;

      const popularTopic = buildPopularTopic(
        flattenGatsbyGraphQL(data.allGithubRaw.edges),
        name,
        description,
        DYNAMIC_TOPIC_PATHS.popular,
        minPageViews,
        maxNodes,
      );

      return (
        <WrappedComponent
          data={{ ...data, allDevhubTopic: { edges: [popularTopic].concat(sortedTopics) } }}
          {...props}
        />
      );
    }}
  />
);

export default withResourceQuery;
