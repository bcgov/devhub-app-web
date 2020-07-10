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
import queryString from 'query-string';
import React, { useState, useEffect } from 'react';
import { TOPICS_PAGE } from '../messages';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { Title } from '../components/Page';
import Topic from '../components/Topic';
import Main from '../components/Page/Main';
import Layout from '../hoc/Layout';
import { getFirstNonExternalResource, reduceNodeForTableOfContents } from '../utils/helpers';
import TableOfContents, {
  TableOfContentsToggle,
  AccordionList,
  OutsideBorder,
  viewToggle,
} from '../components/TableOfContents/TableOfContents';
import { JOURNEY_TOPIC_VIEW_MODES as VIEW_MODES } from '../constants/ui';

export const TEST_IDS = {
  toggle: 'topic-page-view-toggle',
  cardView: 'topic-page-view-card',
  listView: 'topic-page-view-list',
};

export const TopicsPage = ({ data, location }) => {
  let topics = flattenGatsbyGraphQL(data.allTopicRegistryJson.edges);

  const queryParam = queryString.parse(location.search);

  let [viewMode, setMode] = useState(VIEW_MODES.card);

  useEffect(() => {
    if (queryParam.v === VIEW_MODES.list) {
      setMode(VIEW_MODES.list);
    } else {
      setMode(VIEW_MODES.card);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParam.v]); //Only re-run the effect if queryParam.v changes

  // resources are grouped by type, 'ungroup' them so we can find the first available
  // non external link to use as the entry page for the topic card
  const currentView =
    viewMode === VIEW_MODES.card ? (
      <div data-testid={TEST_IDS.cardView}>
        {topics.map(topic => (
          <Topic
            key={topic.id}
            title={topic.name}
            description={topic.description}
            resources={topic.connectsWith}
            link={{
              to: getFirstNonExternalResource(topic.connectsWith),
              text: 'View',
            }}
          />
        ))}
      </div>
    ) : (
      <AccordionList style={{ padding: '20px' }} data-testid={TEST_IDS.listView}>
        {topics.map(topic => (
          <OutsideBorder key={topic.id}>
            <TableOfContents
              title={topic.name}
              contents={topic.connectsWith.map(reduceNodeForTableOfContents)}
            />
          </OutsideBorder>
        ))}
      </AccordionList>
    );
  return (
    <Layout>
      <Main>
        <Title
          title={TOPICS_PAGE.header.title.defaultMessage}
          subtitle={TOPICS_PAGE.header.subtitle.defaultMessage}
        />
        <TableOfContentsToggle
          onChange={() => viewToggle(location.pathname, viewMode)}
          data-testid={TEST_IDS.toggle}
          viewMode={viewMode}
        />
        {currentView}
      </Main>
    </Layout>
  );
};

export default TopicsPage;

export const TopicsQuery = graphql`
  query {
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
  }
`;
