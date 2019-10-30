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
import React from 'react';
import { TOPICS_PAGE } from '../messages';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { Title } from '../components/Page';
import TopicPreview from '../components/TopicPreview/TopicPreview';
import Main from '../components/Page/Main';
import withResourceQuery from '../hoc/withResourceQuery';
import Layout from '../hoc/Layout';
import { getFirstNonExternalResource } from '../utils/helpers';

export const TopicsPage = ({ data }) => {
  let topics = flattenGatsbyGraphQL(data.allTopicRegistryJson.edges);
  // resources are grouped by type, 'ungroup' them so we can find the first available
  // non external link to use as the entry page for the topic card
  return (
    <Layout>
      <Main>
        <Title
          title={TOPICS_PAGE.header.title.defaultMessage}
          subtitle={TOPICS_PAGE.header.subtitle.defaultMessage}
        />
        {topics.map(topic => (
          <TopicPreview
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
      </Main>
    </Layout>
  );
};

export default withResourceQuery(TopicsPage)();
