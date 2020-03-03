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
import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import queryString from 'query-string';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { Title } from '../components/Page';
import Main from '../components/Page/Main';

import Layout from '../hoc/Layout';
import { reduceJourneyToSubwayLine, reduceNodeForTableOfContents } from '../utils/helpers';
import { JourneyMap } from '../components/Journey';
import { JOURNEY_TOPIC_VIEW_MODES as VIEW_MODES } from '../constants/ui';
import TableOfContents, {
  AccordionList,
  OutsideBorder,
  TableOfContentsToggle,
  viewToggle,
} from '../components/TableOfContents/TableOfContents';

export const TEST_IDS = {
  toggle: 'journey-page-view-toggle',
  cardView: 'journey-page-view-card',
  listView: 'journey-page-view-list',
};
export const JourneysPage = ({ data, location }) => {
  let journeys = flattenGatsbyGraphQL(data.allJourneyRegistryJson.edges);
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

  const currentView =
    viewMode === VIEW_MODES.card ? (
      <div data-testid={TEST_IDS.cardView}>
        {journeys.map(journey => (
          <JourneyMap
            key={journey.id}
            title={journey.name}
            color="green"
            link={{ to: journey.fields.slug, text: 'View' }}
            description={journey.fields.description}
            stops={reduceJourneyToSubwayLine(journey.connectsWith)}
          />
        ))}
      </div>
    ) : (
      <AccordionList style={{ padding: '20px' }} data-testid={TEST_IDS.listView}>
        {journeys.map(journey => (
          <OutsideBorder key={journey.id}>
            <TableOfContents
              key={journey.id}
              title={journey.name}
              data-testid={TEST_IDS.toggle}
              contents={journey.connectsWith.map(reduceNodeForTableOfContents)}
            />
          </OutsideBorder>
        ))}
      </AccordionList>
    );

  return (
    <Layout>
      <Main>
        <Title
          title="Journeys"
          subtitle="A set of well defined paths for anyone who is developing applications in government."
        />
        <TableOfContentsToggle
          onChange={() => viewToggle(location.pathname, viewMode)}
          viewMode={viewMode}
          data-testid={TEST_IDS.toggle}
        />
        {currentView}
      </Main>
    </Layout>
  );
};

export default JourneysPage;

export const JourneysQuery = graphql`
  query {
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
  }
`;
