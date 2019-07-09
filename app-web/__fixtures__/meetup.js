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

const MEETUP_GROUP = {
  internal: {
    content:
      '{"id":28512032,"name":"BC DevOps Commons","status":"active","link":"https://www.meetup.com/DevOps-Commons/","urlname":"DevOps-Commons","description":"<p>We are reviving the DevOps Commons!&nbsp;<span>This recurring Meetup is a cross government community group made up of government employees, broader public sector employees and contractors.&nbsp; We are committed to excellence in the continuous improvement of development teams, delivery processes and technology solutions. We are looking forward to learning and collaborating on all things DevOps with you.</span></p>","created":1526511874000,"city":"Victoria","untranslated_city":"Victoria","country":"CA","localized_country_name":"Canada","localized_location":"Victoria, BC","state":"BC","join_mode":"open","visibility":"public_limited","lat":48.43,"lon":-123.36,"members":211,"organizer":{"id":213475102,"name":"Luke Gonis","bio":""},"who":"Members","group_photo":{"id":471194841,"highres_link":"https://secure.meetupstatic.com/photos/event/3/9/f/9/highres_471194841.jpeg","photo_link":"https://secure.meetupstatic.com/photos/event/3/9/f/9/600_471194841.jpeg","thumb_link":"https://secure.meetupstatic.com/photos/event/3/9/f/9/thumb_471194841.jpeg","type":"event","base_url":"https://secure.meetupstatic.com"},"key_photo":{"id":471194847,"highres_link":"https://secure.meetupstatic.com/photos/event/3/9/f/f/highres_471194847.jpeg","photo_link":"https://secure.meetupstatic.com/photos/event/3/9/f/f/600_471194847.jpeg","thumb_link":"https://secure.meetupstatic.com/photos/event/3/9/f/f/thumb_471194847.jpeg","type":"event","base_url":"https://secure.meetupstatic.com"},"timezone":"Canada/Pacific","category":{"id":34,"name":"Tech","shortname":"tech","sort_name":"Tech"},"meta_category":{"id":292,"shortname":"tech","name":"Tech","sort_name":"Tech","photo":{"id":450131949,"highres_link":"https://secure.meetupstatic.com/photos/event/2/e/a/d/highres_450131949.jpeg","photo_link":"https://secure.meetupstatic.com/photos/event/2/e/a/d/600_450131949.jpeg","thumb_link":"https://secure.meetupstatic.com/photos/event/2/e/a/d/thumb_450131949.jpeg","type":"event","base_url":"https://secure.meetupstatic.com"},"category_ids":[34]}}',
    contentDigest: 'ac57dc5ab427bcf398a162753f4d0aaf',
    description: 'DEMO MEETUP DATA - DEVELOPER ONLY ',
    type: 'MeetupGroup',
  },
  name: 'BC DevOps Commons',
  status: 'active',
  link: 'https://www.meetup.com/DevOps-Commons/',
  urlname: 'DevOps-Commons',
  description: 'DEMO MEETUP DATA - DEVELOPER ONLY',
  created: 1526511874000,
  city: 'Victoria',
  untranslated_city: 'Victoria',
  country: 'CA',
  localized_country_name: 'Canada',
  localized_location: 'Victoria, BC',
  state: 'BC',
  join_mode: 'open',
  visibility: 'public_limited',
  lat: 48.43,
  lon: -123.36,
  members: 211,
  organizer: {
    id: 213475102,
    name: 'Luke Gonis',
    bio: '',
    photo: null,
  },
  who: 'Members',
  group_photo: {
    id: 471194841,
    highres_link: 'https://secure.meetupstatic.com/photos/event/3/9/f/9/highres_471194841.jpeg',
    photo_link: 'https://secure.meetupstatic.com/photos/event/3/9/f/9/600_471194841.jpeg',
    thumb_link: 'https://secure.meetupstatic.com/photos/event/3/9/f/9/thumb_471194841.jpeg',
    type: 'event',
    base_url: 'https://secure.meetupstatic.com',
  },
  key_photo: {
    id: 471194847,
    highres_link: 'https://secure.meetupstatic.com/photos/event/3/9/f/f/highres_471194847.jpeg',
    photo_link: 'https://secure.meetupstatic.com/photos/event/3/9/f/f/600_471194847.jpeg',
    thumb_link: 'https://secure.meetupstatic.com/photos/event/3/9/f/f/thumb_471194847.jpeg',
    type: 'event',
    base_url: 'https://secure.meetupstatic.com',
  },
  timezone: 'Canada/Pacific',
  category: {
    id: 34,
    name: 'Tech',
    shortname: 'tech',
    sort_name: 'Tech',
  },
  meta_category: {
    id: 292,
    shortname: 'tech',
    sort_name: 'Tech',
    category_ids: [34],
    photo: {
      id: 450131949,
      highres_link: 'https://secure.meetupstatic.com/photos/event/2/e/a/d/highres_450131949.jpeg',
      photo_link: 'https://secure.meetupstatic.com/photos/event/2/e/a/d/600_450131949.jpeg',
      thumb_link: 'https://secure.meetupstatic.com/photos/event/2/e/a/d/thumb_450131949.jpeg',
      type: 'event',
      base_url: 'https://secure.meetupstatic.com',
    },
  },
  pro_network: null,
  next_event: null,
  childrenMeetupEvent: [
    {
      id: 'a5293451-4f1d-5518-8099-e2f2bcb25891',
      internal: {
        content:
          '{"created":1561565461000,"duration":3600000,"id":"262643690","name":"Anything but Jenkins, long live Jenkins ","rsvp_limit":41,"date_in_series_pattern":false,"status":"past","time":1562097600000,"local_date":"2019-07-02","local_time":"13:00","updated":1562107379000,"utc_offset":-25200000,"waitlist_count":0,"yes_rsvp_count":31,"venue":{"id":25859211,"name":"BC Government Continuous Service Improvement Lab - Grand Central Station (3rd Floor Common Area)","lat":48.42424011230469,"lon":-123.36581420898438,"repinned":true,"address_1":"3rd Floor 1012 Douglas St.","city":"Victoria","country":"ca","localized_country_name":"Canada","zip":"V8W 2C3","state":"bc"},"group":{"created":1526511874000,"name":"BC DevOps Commons","id":28512032,"join_mode":"open","lat":48.43000030517578,"lon":-123.36000061035156,"urlname":"DevOps-Commons","who":"Members","localized_location":"Victoria, BC","state":"BC","country":"ca","region":"en_US","timezone":"Canada/Pacific"},"link":"https://www.meetup.com/DevOps-Commons/events/262643690/","description":"<p>We love Jenkins, but there’s got to be a better way... join pipeline experts as we demo and explore Continuous Integration and Continuous Delivery tools and processes.</p> <p>Click here to join remotely: <a href=\\"https://meet.google.com/cmd-fxui-myk\\" class=\\"linkified\\">https://meet.google.com/cmd-fxui-myk</a></p> ","visibility":"public_limited"}',
        contentDigest: 'bc323e4419c8a3eff7a41dea2cfaa4b2',
        description: 'DEMO MEETUP DATA - DEVELOPER ONLY ',
        owner: 'gatsby-source-meetup',
        type: 'MeetupEvent',
      },
      siphon: {
        unfurl: {
          title: 'DEMO MEETUP DATA - DEVELOPER ONLY',
          image: 'meetup',
          description: 'DEMO MEETUP DATA - DEVELOPER ONLY',
        },
        resource: {
          type: 'Events',
          path: 'https://www.meetup.com/DevOps-Commons/events/262643690/',
        },
        id: 'a5293451-4f1d-5518-8099-e2f2bcb25891',
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
        name: 'DEMO MEETUP DATA - DEVELOPER ONLY',
        description: 'DEMO MEETUP DATA - DEVELOPER ONLY',
        link: 'https://www.meetup.com/DevOps-Commons/events/262643690/',
        location: '3rd Floor 1012 Douglas St.',
      },
      how_to_find_us: null,
      pro_is_email_shared: null,
      rsvp_close_offset: null,
      fee: null,
      manual_attendance_count: null,
    },
  ],
};

module.exports = {
  MEETUP_GROUP,
};
