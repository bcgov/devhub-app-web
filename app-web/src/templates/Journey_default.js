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
import { graphql } from 'gatsby';
import { JourneyMap } from '../components/Journey';

const reduceJourneyToSubwayLine = connections =>
  connections.map((connection, index) => ({
    name: connection.fields.title,
    to: connection.path,
    variant: index % 2 === 0 ? 'up' : 'down',
  }));

export const JourneyPage = ({
  data: {
    journeyRegistryJson: { title, connectsWith },
  },
}) => {
  return (
    <div>
      <JourneyMap title={title} stops={reduceJourneyToSubwayLine(connectsWith)} />
    </div>
  );
};

export const journeyQuery = graphql`
  query devhubJourney($id: String!) {
    journeyRegistryJson(id: { eq: $id }) {
      title: name
      connectsWith {
        path
        fields {
          title
        }
      }
    }
  }
`;

export default JourneyPage;
