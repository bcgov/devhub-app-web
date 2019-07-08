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
import { COLLECTIONS_PAGE } from '../messages';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';

import { Title } from '../components/Page';
import CollectionPreview from '../components/CollectionPreview/CollectionPreview';
import Main from '../components/Page/Main';
import withResourceQuery from '../hoc/withResourceQuery';
import Layout from '../hoc/Layout';
import { getFirstNonExternalResource } from '../utils/helpers';
import uniqBy from 'lodash/uniqBy';
import { TOPICS } from '../constants/topics';

//Generates a new metadata postion string, similar to the ones used on the other nodes
const createMetaPosition = (maxPadding, index1, index2) => {
  const posLength1 = maxPadding - (index1 + '').length;
  const posLength2 = maxPadding - (index2 + '').length;
  const paddedPosition1 = '0'.repeat(posLength1) + index1;
  const paddedPosition2 = '0'.repeat(posLength2) + index2;
  return paddedPosition1 + '.' + paddedPosition2 + '.000000000.';
};

//Takes in the collections and events then add the events to the desired collection
export const addCurrentEventsToCollection = (collections, events, collectionName) => {
  //find the index of the given topic for the first digit of the metadata position
  const collectionIndex = collections.map(e => e.name).indexOf(collectionName);
  //find the number of items in the collection for the second digit of the metadata position
  let eventIndex = collections
    .filter(e => e.name === collectionName)
    .flatMap(e => e.childrenDevhubSiphon).length;
  // filter out any events that are passed today
  const currentEvents = events
    .filter(e => e.start.daysFromNow <= 0)
    .map(event => {
      event = {
        unfurl: event.siphon.unfurl,
        resource: event.siphon.resource,
        start: event.start,
        venue: event.venue.name,
        id: event.siphon.id,
        _metadata: {
          position: createMetaPosition(10, collectionIndex, eventIndex),
        },
      };
      //increase the eventIndex as we have just added a new item to the collection
      eventIndex++;
      return event;
    });

  const collectionsAndEvents = collections.map(collection => {
    if (collection.name === collectionName) {
      //Add in our EventBriteEvents
      collection.childrenDevhubSiphon = collection.childrenDevhubSiphon.concat(currentEvents);
      //Remove any duplicates, to fix the card duplication isuue
      collection.childrenDevhubSiphon = uniqBy(collection.childrenDevhubSiphon, 'id');
    }
    return collection;
  });

  return collectionsAndEvents;
};

export const CollectionsPage = ({ data }) => {
  let collections = flattenGatsbyGraphQL(data.allDevhubCollection.edges);
  const events = flattenGatsbyGraphQL(data.allEventbriteEvents.edges);
  const meetUps = flattenGatsbyGraphQL(data.allMeetupGroup.edges)
    .flatMap(meetups => {
      return meetups.childrenMeetupEvent;
    })
    .map(meetup => {
      return {
        ...meetup,
        start: {
          day: meetup.day,
          month: meetup.month,
          year: meetup.year,
          daysFromNow: meetup.daysFromNow,
        },
        venue: {
          name: meetup.fields.location,
        },
      };
    });
  //sort events so they show up soonest to farthest away
  const eventsAndMeetupsSorted = events
    .concat(meetUps)
    .sort((a, b) => b.start.daysFromNow - a.start.daysFromNow);
  const collectionsWithEvents = addCurrentEventsToCollection(
    collections,
    eventsAndMeetupsSorted,
    TOPICS.COMMUNITY_AND_EVENTS,
  );
  // resources are grouped by type, 'ungroup' them so we can find the first available
  // non external link to use as the entry page for the collection card
  return (
    <Layout>
      <Main>
        <Title
          title={COLLECTIONS_PAGE.header.title.defaultMessage}
          subtitle={COLLECTIONS_PAGE.header.subtitle.defaultMessage}
        />
        {collectionsWithEvents.map(collection => (
          <CollectionPreview
            key={collection.id}
            title={collection.name}
            description={collection.description}
            resources={collection.childrenDevhubSiphon}
            link={{
              to: getFirstNonExternalResource(
                collection.childrenDevhubSiphon.sort((a, b) => {
                  // sort to ensure first resource in collection is the entry poitn
                  const position1 = a._metadata.position;
                  const position2 = b._metadata.position;
                  return position1.localeCompare(position2);
                }),
              ),
              text: 'View',
            }}
          />
        ))}
      </Main>
    </Layout>
  );
};

export default withResourceQuery(CollectionsPage)();
