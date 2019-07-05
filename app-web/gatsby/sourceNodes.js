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
const { EVENT_BRITE_EVENT } = require('../__fixtures__/eventbrite');
//const { MEETUP_EVENT } = require('../__fixtures__/meetup');

module.exports = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  if (!process.env.EVENT_BRITE_API_KEY && process.env.NODE_ENV === 'development') {
    // if there is no event brite api key we stub in the event brite data to prevent page failures
    // this should be in development mode only
    const id = createNodeId('EVENT_BRITE_API_KEY');

    createNode({
      ...EVENT_BRITE_EVENT,
      id,
      internal: {
        ...EVENT_BRITE_EVENT.internal,
        contentDigest: createContentDigest(EVENT_BRITE_EVENT.internal.content),
      },
    });
  } else {
    // we  must create a node no matter what so create a placeholder node
    createNode({
      id: createNodeId('placeholder'),
      parent: null,
      children: [],
      internal: {
        type: `MyNodeType`,
        mediaType: `text/html`,
        content: 'foo',
        contentDigest: createContentDigest('foo'),
      },
    });
  }
  /*if(!process.env.MEETUP_API_KEY && process.env.NODE_ENV === 'development') {
    const id = createNodeId('MEETUP_API_KEY');

    createNode({
      ...MEETUP_EVENT,
      id,
      internal: {
        ...MEETUP_EVENT.internal,
        contentDigest: MEETUP_EVENT.internal.contentDigest,
      },
    });
  } else {
    createNode({
      id: createNodeId('placeholder'),
      parent: null,
      children: [],
      internal: {
        type: `MyNodeType`,
        mediaType: `text/html`,
        content: 'bar',
        contentDigest: createContentDigest('bar'),
      },
    });
  }*/
};
