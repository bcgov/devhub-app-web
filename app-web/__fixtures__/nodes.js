import { arrayToMapByProp } from '../src/utils/dataHelpers';
import { RESOURCE_TYPES } from '../src/constants/ui';

const IDS = {
  DESIGN_SYSTEM: 'topic-1',
  DEVHUB: 'topic-2',
  EVENT: 'topics-3',
};

// SIPHON NODES
export const DESIGN_SYSTEM_SIPHON_NODE_1 = {
  id: '1',
  parent: {
    id: IDS.DESIGN_SYSTEM,
  },
  _metadata: {
    position: '000.000.000',
  },
  attributes: {
    personas: ['Designer'],
  },
  source: {
    displayName: 'Design System',
  },
  resource: {
    path: '/design-system/Z1bGIqu1',
    type: 'Components',
  },
  fields: {
    personas: ['Designer'],
    resourceType: 'Components',
    standAlonePath: '/Design-Node-1',
    pagePaths: ['/design-system/Z1bGIqu1'],
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  unfurl: {
    type: 'markdown',
    label1: '',
    data1: '',
    label2: '',
    data2: '',
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  childMarkdownRemark: {
    frontmatter: {
      pageOnly: false,
    },
  },
};

export const DESIGN_SYSTEM_SIPHON_NODE_2 = {
  id: '2',
  parent: {
    id: IDS.DESIGN_SYSTEM,
  },
  _metadata: {
    position: '000.000.001',
  },
  attributes: {
    personas: ['Developer', 'Designer'],
  },
  source: {
    displayName: 'Design System',
  },
  resource: {
    path: '/design-system/Z1bGIqu2',
    type: 'Components',
  },
  fields: {
    personas: ['Developer', 'Designer'],
    resourceType: 'Components',
    standAlonePath: '/Design-Node-2',
    pagePaths: ['/design-system/Z1bGIqu2'],
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  unfurl: {
    type: 'markdown',
    label1: '',
    data1: '',
    label2: '',
    data2: '',
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  childMarkdownRemark: {
    frontmatter: {
      pageOnly: false,
    },
  },
};

export const DESIGN_SYSTEM_SIPHON_NODE_3 = {
  id: '3',
  parent: {
    id: IDS.DESIGN_SYSTEM,
  },
  _metadata: {
    position: '000.000.002',
  },
  attributes: {
    personas: ['Designer'],
  },
  source: {
    displayName: 'Design System',
  },
  resource: {
    path: '/design-system/Z1bGIqu3',
    type: 'Components',
  },
  fields: {
    personas: ['Designer'],
    resourceType: 'Components',
    standAlonePath: '/Design-Node-3',
    pagePaths: ['/design-system/Z1bGIqu3'],
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  unfurl: {
    type: 'markdown',
    label1: '',
    data1: '',
    label2: '',
    data2: '',
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  childMarkdownRemark: {
    frontmatter: {
      pageOnly: false,
    },
  },
};

export const DESIGN_SYSTEM_SIPHON_NODE_4 = {
  id: '4',
  parent: {
    id: IDS.DESIGN_SYSTEM,
  },
  _metadata: {
    position: '000.000.003',
  },
  attributes: {
    personas: ['Developer'],
  },
  source: {
    displayName: 'Design System',
  },
  resource: {
    path: '/design-system/Z1bGIqu4',
    type: 'Components',
  },
  fields: {
    personas: ['Developer'],
    resourceType: 'Components',
    standAlonePath: '/Design-Node-4',
    pagePaths: ['/design-system/Z1bGIqu4'],
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  unfurl: {
    type: 'markdown',
    label1: '',
    data1: '',
    label2: '',
    data2: '',
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  childMarkdownRemark: {
    frontmatter: {
      pageOnly: false,
    },
  },
};

export const DEVHUB_SIPHON_NODE_1 = {
  id: '5',
  parent: {
    id: IDS.DEVHUB,
  },
  _metadata: {
    position: '001.000.000',
  },
  attributes: {
    personas: ['Developer'],
  },
  source: {
    displayName: 'Design System',
  },
  resource: {
    path: '/design-system/Z1bGIqu5',
    type: 'Documentation',
  },
  fields: {
    personas: ['Developer'],
    resourceType: 'Documentation',
    standAlonePath: '/DevHub-Node-1',
    pagePaths: ['/design-system/Z1bGIqu5'],
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  unfurl: {
    type: 'markdown',
    label1: '',
    data1: '',
    label2: '',
    data2: '',
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  childMarkdownRemark: {
    frontmatter: {
      pageOnly: false,
    },
  },
};

export const DEVHUB_SIPHON_NODE_2 = {
  id: '6',
  parent: {
    id: IDS.DEVHUB,
  },
  _metadata: {
    position: '001.000.001',
  },
  attributes: {
    personas: ['Designer', 'Developer'],
  },
  source: {
    displayName: 'Design System',
  },
  resource: {
    path: '/design-system/Z1bGIqu6',
    type: 'Documentation',
  },
  fields: {
    personas: ['Designer', 'Developer'],
    resourceType: 'Documentation',
    standAlonePath: '/DevHub-Node-2',
    pagePaths: ['/design-system/Z1bGIqu6'],
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  unfurl: {
    type: 'markdown',
    label1: '',
    data1: '',
    label2: '',
    data2: '',
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  childMarkdownRemark: {
    frontmatter: {
      pageOnly: false,
    },
  },
};

export const DEVHUB_SIPHON_NODE_3 = {
  id: '7',
  parent: {
    id: IDS.DEVHUB,
  },
  _metadata: {
    position: '001.000.001',
  },
  attributes: {
    personas: ['Product Owner'],
  },
  source: {
    displayName: 'Design System',
  },
  resource: {
    path: '/design-system/Z1bGIqu7',
    type: 'Documentation',
  },
  fields: {
    personas: ['Product Owner'],
    standAlonePath: '/DevHub-Node-3',
    resourceType: 'Documentation',
    pagePaths: ['/design-system/Z1bGIqu7'],
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  unfurl: {
    type: 'markdown',
    label1: '',
    data1: '',
    label2: '',
    data2: '',
    image: 'https://github.com/bcgov/design-system/blob/master/components/about/about.md?raw=true',
    title: 'About',
    description: 'What the Design System is and how it works.',
    author: 'ksingbeil',
  },
  childMarkdownRemark: {
    frontmatter: {
      pageOnly: false,
    },
  },
};

export const DESIGN_SYSTEM_SIPHON_NODES = [
  DESIGN_SYSTEM_SIPHON_NODE_3,
  DESIGN_SYSTEM_SIPHON_NODE_2,
  DESIGN_SYSTEM_SIPHON_NODE_1,
  DESIGN_SYSTEM_SIPHON_NODE_4,
];

export const DEVHUB_SIPHON_NODES = [
  DEVHUB_SIPHON_NODE_1,
  DEVHUB_SIPHON_NODE_2,
  DEVHUB_SIPHON_NODE_3,
];

export const GITHUB_RAW_1 = {
  id: '8257de0d-811b-58dd-9fae-661f13d5a11b',
  name: 'README.md',
  _xxboundProperties: {
    topicResourceType: 'Documentation',
    position: 1,
  },
  childMarkdownRemark: {
    id: 'd72fa440-51f6-52c7-ab03-140907fd46db',
  },
  fields: {
    position: 1,
    personas: ['Designer'],
    slug: 'Introduction-To-Github-and-Gov',
    resourceType: 'Documentation',
    standAlonePath: '/GitHub-Raw-1',
    title: 'Introduction To Github and Gov',
    description: 'Everything you need to know about working with Github in the BC Government.',
    image: '../images/octokat.png',
    author: 'patricksimonian',
    topics: [
      {
        id: IDS.DESIGN_SYSTEM,
      },
    ],
    pagePaths: ['/design-system/foo'],
  },
};

export const GITHUB_RAW_2 = {
  id: '8257de0d-811b-58dd-9fae-661f13d5a11b',
  name: 'README.md',
  _xxboundProperties: {
    topicResourceType: 'Documentation',
    position: 2,
  },
  childMarkdownRemark: {
    id: 'd72fa440-51f6-52c7-ab03-140907fd46db',
  },
  fields: {
    position: 1,
    personas: ['Designer'],
    slug: 'Introduction-To-Github-and-Gov',
    resourceType: 'Components',
    standAlonePath: '/GitHub-Raw-2',
    title: 'Introduction To Github and Gov',
    description: 'Everything you need to know about working with Github in the BC Government.',
    image: '../images/octokat.png',
    author: 'patricksimonian',
    topics: [
      {
        id: IDS.DEVHUB,
      },
    ],
    pagePaths: ['/design-system/bar'],
  },
};

// TOPICS
export const DESIGN_SYSTEM_TOPIC = {
  id: IDS.DESIGN_SYSTEM,
  type: 'default',
  name: 'Design System',
  description: 'baz',
  resources: DESIGN_SYSTEM_SIPHON_NODES.map(n => ({ id: n.id })),
  connectsWith: [
    { ...GITHUB_RAW_1, path: '/Design-System/foo' },
    { ...GITHUB_RAW_2, path: '/Design-System/bar' },
  ],
  fields: {
    githubRaw: [GITHUB_RAW_1, GITHUB_RAW_2],
  },
  childrenDevhubSiphon: DESIGN_SYSTEM_SIPHON_NODES.map(n => ({
    id: n.id,
    _metadata: { ...n._metadata },
    resource: { ...n.resource },
    unfurl: { ...n.unfurl },
  })),
};

export const DEVHUB_TOPIC = {
  id: IDS.DEVHUB,
  type: 'default',
  name: 'Devhub',
  description: 'baz',
  resources: DEVHUB_SIPHON_NODES.map(n => ({ id: n.id })),
  connectsWith: [
    { ...GITHUB_RAW_1, path: '/Devhub/foo' },
    { ...GITHUB_RAW_2, path: '/Devhub/bar' },
  ],
  fields: {
    githubRaw: [GITHUB_RAW_1, GITHUB_RAW_2],
  },
  childrenDevhubSiphon: DEVHUB_SIPHON_NODES.map(n => ({
    id: n.id,
    _metadata: { ...n._metadata },
    resource: { ...n.resource },
    unfurl: { ...n.unfurl },
  })),
};

export const POPULAR_TOPIC = {
  id: 'popular',
  type: 'default',
  name: 'Popular',
  description: 'popular',
  resources: [DEVHUB_SIPHON_NODES[0], DESIGN_SYSTEM_SIPHON_NODES[0]],
  connectsWith: [
    { ...GITHUB_RAW_1, path: '/popular/foo' },
    { ...GITHUB_RAW_2, path: '/popular/bar' },
  ],
  fields: {
    githubRaw: [GITHUB_RAW_1, GITHUB_RAW_2],
  },
  childrenDevhubSiphon: DEVHUB_SIPHON_NODES.map(n => ({
    id: n.id,
    _metadata: { ...n._metadata },
    resource: { ...n.resource },
    unfurl: { ...n.unfurl },
  })),
};
export const FEATURED_TOPIC = {
  id: 'featured',
  type: 'default',
  name: 'Featured',
  description: 'Featured',
  resources: [DEVHUB_SIPHON_NODES[0], DESIGN_SYSTEM_SIPHON_NODES[0]],
  connectsWith: [
    { ...GITHUB_RAW_1, path: '/featured/foo' },
    { ...GITHUB_RAW_2, path: '/featured/bar' },
  ],
  fields: {
    githubRaw: [GITHUB_RAW_1, GITHUB_RAW_2],
  },
  childrenDevhubSiphon: DEVHUB_SIPHON_NODES.map(n => ({
    id: n.id,
    _metadata: { ...n._metadata },
    resource: { ...n.resource },
    unfurl: { ...n.unfurl },
  })),
};

export const EVENT_1 = {
  siphon: {
    unfurl: {
      title: 'BC Gov CSI Lab - Open House Networking event ',
      image: 'eventbrite',
      description: 'This is a test',
    },
    resource: {
      type: 'Events',
      path:
        'https://www.eventbrite.ca/e/bc-gov-csi-lab-open-house-networking-event-tickets-45046198392',
    },
    id: '45046198392',
  },
  id: '45046198392',
  fields: {
    title: 'BC Gov CSI Lab - Open House Networking event ',
    resourceType: 'Events',
    standAlonePath:
      'https://www.eventbrite.ca/e/bc-gov-csi-lab-open-house-networking-event-tickets-45046198392',
    pagePaths: [
      'https://www.eventbrite.ca/e/bc-gov-csi-lab-open-house-networking-event-tickets-45046198392',
    ],
  },
  description: {
    html: '<p> This is a test </p>',
    text: 'This is a test',
  },
  logo: {
    original: {
      url:
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%…?auto=compress&s=4739975e8d70c9f8af0ee0957df1f5ae',
    },
  },
  name: {
    text: 'BC Gov CSI Lab - Open House Networking event ',
  },
  organization: 'CSI Lab',
  start: {
    day: '20',
    daysFromNow: '2',
    month: 'Apr',
    year: '2018',
  },
  url: 'https://www.eventbrite.ca/e/bc-gov-csi-lab-open-house-networking-event-tickets-45046198392',
  venue: {
    name: '1012 Douglas St',
  },
};
export const EVENT_2 = {
  siphon: {
    unfurl: {
      title: "Take a walk on the Agile side: Tour of BC Gov's CSI Lab",
      image: 'eventbrite',
      description: 'This is also a test',
    },
    resource: {
      type: 'Events',
      path:
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F41880838%2F228490647317%2F1%2Foriginal.jpg?auto=compress&s=c53f3ef4e5b52e00963afab920fca78e',
    },
    id: '61112980570',
  },
  id: '61112980570',
  fields: {
    title: "Take a walk on the Agile side: Tour of BC Gov's CSI Lab",
    resourceType: 'Events',
    standAlonePath:
      'https://www.eventbrite.ca/e/bc-gov-csi-lab-open-house-networking-event-tickets-45046198392',
    pagePaths: [
      'https://www.eventbrite.ca/e/bc-gov-csi-lab-open-house-networking-event-tickets-45046198392',
    ],
  },
  description: {
    html: '<p> This is also a test </p>',
    text: 'This is also a test',
  },
  logo: {
    original: {
      url:
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F41880838%2F228490647317%2F1%2Foriginal.jpg?auto=compress&s=c53f3ef4e5b52e00963afab920fca78e',
    },
  },
  name: {
    text: "Take a walk on the Agile side: Tour of BC Gov's CSI Lab",
  },
  organization: 'CSI Lab',
  start: {
    day: '26',
    daysFromNow: '-500',
    month: 'Jun',
    year: '2020',
  },
  url:
    'https://www.eventbrite.ca/e/take-a-walk-on-the-agile-side-tour-of-bc-govs-csi-lab-tickets-61112980570',
  venue: {
    name: '1012 Douglas St',
  },
};

export const MEETUP_1 = {
  childrenMeetupEvent: {
    day: '20',
    daysFromNow: '-2',
    description:
      "Join us for a Product Spotlight featuring ZenHub! With 3+ CSI Lab teams already using ZenHub, and other interested, we thought it would be a great idea to get the ZenHub team in the CSI Lab to provide a deep dive into their product. What is ZenHub?ZenHub is browser extension that adds robust project management features directly into GitHub's UI, making centralized collaboration on GitHub faster, more visual, and less cluttered. With ZenHub installed, your team stays lean and agile: you can plan sprints, create epics, and visualize your workflow without leaving GitHub. More details here: https://www.zenhub.com/ ",
    link: 'https://www.meetup.com/DevOps-Commons/events/262271511/',
    month: 'Jun',
    siphon: {
      id: 'dc8d7fd6-86c4-5967-836b-88754b4fa399',
      resource: {
        path: 'https://www.meetup.com/DevOps-Commons/events/262271511/',
        type: 'Events',
      },
      unfurl: {
        description:
          "Join us for a Product Spotlight featuring ZenHub! With 3+ CSI Lab teams already using ZenHub, and other interested, we thought it would be a great idea to get the ZenHub team in the CSI Lab to provide a deep dive into their product. What is ZenHub?ZenHub is browser extension that adds robust project management features directly into GitHub's UI, making centralized collaboration on GitHub faster, more visual, and less cluttered. With ZenHub installed, your team stays lean and agile: you can plan sprints, create epics, and visualize your workflow without leaving GitHub. More details here: https://www.zenhub.com/ ",
        image: 'meetup',
        title: 'Product Spotlight: ZenHub',
      },
    },
    start: {
      day: '20',
      daysFromNow: '-2',
      month: 'Jun',
      year: '2019',
    },
    status: 'upcoming',
    venue: {
      address_1: '3rd Floor 1012 Douglas St.',
      name: '',
    },
    fields: {
      location: '3rd Floor 1012 Douglas St.',
      description: 'test description',
      resourceType: 'Events',
      name: 'bar',
      pagePaths: ['https://www.meetup.com/DevOps-Commons/events/262271511/'],
      link: 'https://www.meetup.com/DevOps-Commons/events/262271511/',
      standAlonePath: 'https://www.meetup.com/DevOps-Commons/events/262271511/',
    },
    year: '2019',
  },
};

export const MEETUP_2 = {
  childrenMeetupEvent: {
    day: '30',
    daysFromNow: '20',
    description: 'test description',
    link: 'https://www.meetup.com/DevOps-Commons/events/262271511/',
    month: 'Jun',
    siphon: {
      id: 'dc8d7fd6-86c4-5967-836b-88754b4fa399',
      resource: {
        path: 'https://www.meetup.com/DevOps-Commons/events/262271511/',
        type: 'Events',
      },
      unfurl: {
        description: 'test description',
        image: 'meetup',
        title: 'Product Spotlight: ZenHub',
      },
    },
    start: {
      day: '30',
      daysFromNow: '20',
      month: 'May',
      year: '2019',
    },
    status: 'upcoming',
    venue: {
      address_1: '3rd Floor 1012 Douglas St.',
      name: '',
    },
    fields: {
      location: '3rd Floor 1012 Douglas St.',
      description: 'test description',
      resourceType: 'Events',
      name: 'foo',
      pagePaths: ['https://www.meetup.com/DevOps-Commons/events/262271511/'],
      link: 'https://www.meetup.com/DevOps-Commons/events/262271511/',
      standAlonePath: 'https://www.meetup.com/DevOps-Commons/events/262271511/',
    },
    year: '2019',
  },
};

export const JOURNEY_1 = {
  id: 'journey-1',
  name: 'foo',
  fields: {
    title: 'foo',
    slug: '/foo',
  },
  connectsWith: [{ ...GITHUB_RAW_1, path: '/foo/bar', id: '123', _type: 'github' }],
};

export const EVENTS = [EVENT_1, EVENT_2];
export const MEETUP_NODES = [MEETUP_1, MEETUP_2];

export const SIPHON_NODES = DESIGN_SYSTEM_SIPHON_NODES.concat(DEVHUB_SIPHON_NODES);

// stubbing in a set of nodes that pass the designer filter
export const FILTERED_NODES = SIPHON_NODES.filter(
  node => node.attributes.personas[0] === 'Designer',
);

export const TOPICS = [DESIGN_SYSTEM_TOPIC, DEVHUB_TOPIC];
export const JOURNEYS = [JOURNEY_1];
export const GITHUB_RAW_NODES = [GITHUB_RAW_1, GITHUB_RAW_2];
export const SIPHON_NODES_MAP = arrayToMapByProp(SIPHON_NODES, 'id');
export const TOPICS_MAP = arrayToMapByProp(TOPICS, 'id');

// some selectors found within /selectors/index.js provide selections of resources grouped by
// resources types they are combined wth the default grouping set so that all resources
// have a map of all resource types like so
/**
 *
 * {
 *  Components: [] no resources so it defaulted to empty,
 *  Documentation: [{}, {}],
 *  ...etc
 * }
 */
export const DEFAULT_GROUPINGS = Object.keys(RESOURCE_TYPES).reduce((grouping, type) => {
  grouping[RESOURCE_TYPES[type]] = [];
  return grouping;
}, {});
