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

Created by Derek Siemens
*/

// Meetup sample data

const MEETUP_EVENT = {
  id: 'a5293451-4f1d-5518-8099-e2f2bcb25891',
  internal: {
    content:
      '{"created":1561565461000,"duration":3600000,"id":"262643690","name":"Anything but Jenkins, long live Jenkins ","rsvp_limit":41,"date_in_series_pattern":false,"status":"past","time":1562097600000,"local_date":"2019-07-02","local_time":"13:00","updated":1562107379000,"utc_offset":-25200000,"waitlist_count":0,"yes_rsvp_count":31,"venue":{"id":25859211,"name":"BC Government Continuous Service Improvement Lab - Grand Central Station (3rd Floor Common Area)","lat":48.42424011230469,"lon":-123.36581420898438,"repinned":true,"address_1":"3rd Floor 1012 Douglas St.","city":"Victoria","country":"ca","localized_country_name":"Canada","zip":"V8W 2C3","state":"bc"},"group":{"created":1526511874000,"name":"BC DevOps Commons","id":28512032,"join_mode":"open","lat":48.43000030517578,"lon":-123.36000061035156,"urlname":"DevOps-Commons","who":"Members","localized_location":"Victoria, BC","state":"BC","country":"ca","region":"en_US","timezone":"Canada/Pacific"},"link":"https://www.meetup.com/DevOps-Commons/events/262643690/","description":"<p>We love Jenkins, but there’s got to be a better way... join pipeline experts as we demo and explore Continuous Integration and Continuous Delivery tools and processes.</p> <p>Click here to join remotely: <a href=\\"https://meet.google.com/cmd-fxui-myk\\" class=\\"linkified\\">https://meet.google.com/cmd-fxui-myk</a></p> ","visibility":"public_limited"}',
    contentDigest: 'bc323e4419c8a3eff7a41dea2cfaa4b2',
    description: 'DEMO MEETUP DATA - DEVELOPER ONLY ',
    ignoreType: null,
    mediaType: null,
    owner: 'gatsby-source-meetup',
    type: 'MeetupEvent',
  },
  created: 1561565461000,
  duration: 3600000,
  name: 'Anything but Jenkins, long live Jenkins ',
  rsvp_limit: 41,
  date_in_series_pattern: false,
  status: 'past',
  time: 1562097600000,
  local_date: '2019-07-02',
  local_time: '13:00',
  updated: 1562107379000,
  utc_offset: -25200000,
  waitlist_count: 0,
  yes_rsvp_count: 31,
  venue: {
    id: 25859211,
    name:
      'BC Government Continuous Service Improvement Lab - Grand Central Station (3rd Floor Common Area)',
    lat: 48.42424011230469,
    lon: -123.36581420898438,
    repinned: true,
    address_1: '3rd Floor 1012 Douglas St.',
    city: 'Victoria',
    country: 'ca',
    localized_country_name: 'Canada',
    zip: 'V8W 2C3',
    state: 'bc',
    address_2: null,
    phone: null,
  },
  group: {
    created: 1526511874000,
    name: 'BC DevOps Commons',
    id: 28512032,
    join_mode: 'open',
    lat: 48.43000030517578,
    lon: -123.36000061035156,
    urlname: 'DevOps-Commons',
    who: 'Members',
    localized_location: 'Victoria, BC',
    state: 'BC',
    country: 'ca',
    region: 'en_US',
    timezone: 'Canada/Pacific',
  },
  link: 'https://www.meetup.com/DevOps-Commons/events/262643690/',
  description: 'DEMO MEETUP',
  visibility: 'public_limited',
  fields: {
    name: 'DEMO MEETUP DATA - DEVELOPER ONLY ',
    description: 'DEMO MEETUP DATA - DEVELOPER ONLY ',
    link: 'https://www.meetup.com/DevOps-Commons/events/262643690/',
    location: '3rd Floor 1012 Douglas St.',
  },
  how_to_find_us: null,
  pro_is_email_shared: null,
  rsvp_close_offset: null,
  fee: null,
  manual_attendance_count: null,
};

module.exports = {
  MEETUP_EVENT,
};
