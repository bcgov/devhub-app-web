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

const withResourceQuery = WrappedComponent => () => props => (
  <StaticQuery
    query={graphql`
      query resourceQuery {
        allGithubRaw(filter: { fields: { pageOnly: { eq: false } } }) {
          edges {
            node {
              id
              pageViews
              html_url
              fields {
                resourceType
                title
                description
                image {
                  ...cardFixedImage
                }
                pagePaths
                standAlonePath
                slug
                personas
              }
              internal {
                type
              }
              childMarkdownRemark {
                htmlAst
                html
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
        allJourneyRegistryJson {
          edges {
            node {
              id
              name
              fields {
                slug
                description
              }
              connectsWith {
                ...JourneyNodeConnection
              }
            }
          }
        }
        allTopicRegistryJson {
          edges {
            node {
              id
              name
              description
              connectsWith {
                ...DevhubNodeConnection
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
              internal {
                type
              }
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

              parent {
                id
              }
              fields {
                resourceType
                personas
                title
                description
                image {
                  ...cardFixedImage
                }
                pagePaths
                standAlonePath
              }
              internal {
                type
              }
              source {
                type
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
            }
          }
        }
      }
    `}
    render={data => {
      return <WrappedComponent data={data} {...props} />;
    }}
  />
);

export default withResourceQuery;
