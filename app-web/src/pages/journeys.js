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
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { Title } from '../components/Page';
import Main from '../components/Page/Main';
import withResourceQuery from '../hoc/withResourceQuery';
import Layout from '../hoc/Layout';
import { reduceJourneyToSubwayLine } from '../utils/helpers';
import { JourneyMap } from '../components/Journey';

export const JourneysPage = ({ data }) => {
  let journeys = flattenGatsbyGraphQL(data.allJourneyRegistryJson.edges);

  return (
    <Layout>
      <Main>
        <Title
          title="Journeys"
          subtitle="A set of well defined paths for anyone who is developing applications in government."
        />

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
      </Main>
    </Layout>
  );
};

export default withResourceQuery(JourneysPage)();
