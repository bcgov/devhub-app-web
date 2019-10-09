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
import React, { useState } from 'react';
import { TOPICS_PAGE } from '../messages';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { Title } from '../components/Page';
import TopicPreview from '../components/TopicPreview/TopicPreview';
import Main from '../components/Page/Main';
import withResourceQuery from '../hoc/withResourceQuery';
import Layout from '../hoc/Layout';
import { getFirstNonExternalResource } from '../utils/helpers';
import TableofContents from '../components/TopicPreview/TableofContents';
import styled from '@emotion/styled';
import Switch from 'react-switch';
import { navigate } from 'gatsby';
import queryString from 'query-string';

const OutsideBorder = styled.div`
  top-margin: 15px;
  padding: 7px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;

const AccordionList = styled.ul`
  margin: 10px;
  padding: 10px;
  background-color: #fff;
  max-width: 650px;
  overflow: scroll;
  border-top: 1px solid rgba(#000, 0.1);
`;

const ViewMode = styled.span`
  font-size: 18px;
  padding: 10px;
  margin-top: 3px;
`;

export const TopicsPage = ({ data, location }) => {
  let topics = flattenGatsbyGraphQL(data.allTopicRegistryJson.edges);
  const VIEW_MODES = { cardview: 'cards', listview: 'list' };
  const queryParam = queryString.parse(location.search);

  if (!Object.values(VIEW_MODES).includes(queryParam.v)) {
    //navigate back to default card view if user type in some wired url like /topics/?v=billy
    navigate(`${location.pathname}?v=${VIEW_MODES.cardview}`);
  }

  let [viewSwitch, setSwitch] = useState(
    queryParam.v === VIEW_MODES.cardview ||
      queryParam.v === undefined ||
      !Object.values(VIEW_MODES).includes(queryParam.v),
  );
  const viewToggle = () => {
    setSwitch(!viewSwitch);
    if (viewSwitch) {
      navigate(`${location.pathname}?v=${VIEW_MODES.listview}`);
    } else {
      navigate(`${location.pathname}?v=${VIEW_MODES.cardview}`);
    }
  };

  // resources are grouped by type, 'ungroup' them so we can find the first available
  // non external link to use as the entry page for the topic card
  return (
    <Layout>
      <Main>
        <Title
          title={TOPICS_PAGE.header.title.defaultMessage}
          subtitle={TOPICS_PAGE.header.subtitle.defaultMessage}
        />
        <div>
          <ViewMode>List View </ViewMode>
          <Switch
            onChange={() => viewToggle()}
            checked={viewSwitch}
            uncheckedIcon={false}
            checkedIcon={false}
            offColor={'#0f80cc'}
          />
          <ViewMode> Card View</ViewMode>
        </div>

        {((queryParam.v === undefined || queryParam.v === VIEW_MODES.cardview) && (
          <main>
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
          </main>
        )) || (
          <main>
            <AccordionList>
              {topics.map(topic => (
                <OutsideBorder key={topic.id}>
                  <TableofContents
                    key={topic.id}
                    title={topic.name}
                    contents={topic.connectsWith.map(item => {
                      item.fields.path = item.path;
                      return item.fields;
                    })}
                  />
                </OutsideBorder>
              ))}
            </AccordionList>
          </main>
        )}
      </Main>
    </Layout>
  );
};

export default withResourceQuery(TopicsPage)();
