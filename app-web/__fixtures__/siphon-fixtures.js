import { arrayToMapByProp } from '../src/utils/dataHelpers';
import { RESOURCE_TYPES } from '../src/constants/ui';

const IDS = {
  DESIGN_SYSTEM: 'collection-1',
  DEVHUB: 'collection-2',
  EVENT: 'collections-3',
};

// SIPHON NODES
export const DESIGN_SYSTEM_NODE_1 = {
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

export const DESIGN_SYSTEM_NODE_2 = {
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

export const DESIGN_SYSTEM_NODE_3 = {
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

export const DESIGN_SYSTEM_NODE_4 = {
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

export const DEVHUB_NODE_1 = {
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

export const DEVHUB_NODE_2 = {
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

export const DEVHUB_NODE_3 = {
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

export const DESIGN_SYSTEM_NODES = [
  DESIGN_SYSTEM_NODE_3,
  DESIGN_SYSTEM_NODE_2,
  DESIGN_SYSTEM_NODE_1,
  DESIGN_SYSTEM_NODE_4,
];

export const DEVHUB_NODES = [DEVHUB_NODE_1, DEVHUB_NODE_2, DEVHUB_NODE_3];

// COLLECTIONS
export const DESIGN_SYSTEM_COLLECTION = {
  id: IDS.DESIGN_SYSTEM,
  type: 'default',
  name: 'Design System',
  description: 'baz',
  resources: DESIGN_SYSTEM_NODES.map(n => ({ id: n.id })),
  childrenDevhubSiphon: DESIGN_SYSTEM_NODES.map(n => ({
    id: n.id,
    _metadata: { ...n._metadata },
    resource: { ...n.resource },
    unfurl: { ...n.unfurl },
  })),
};

export const DEVHUB_COLLECTION = {
  id: IDS.DEVHUB,
  type: 'default',
  name: 'Devhub',
  description: 'baz',
  resources: DEVHUB_NODES.map(n => ({ id: n.id })),
  childrenDevhubSiphon: DEVHUB_NODES.map(n => ({
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
  description: {
    html: '<p> This is a test </p>',
    text: 'This is a test',
  },
  id: '45046198392',
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
  description: {
    html: '<p> This is also a test </p>',
    text: 'This is also a test',
  },
  id: '61112980570',
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

export const EVENTS = [EVENT_1, EVENT_2];

export const SIPHON_NODES = DESIGN_SYSTEM_NODES.concat(DEVHUB_NODES);

// stubbing in a set of nodes that pass the designer filter
export const FILTERED_NODES = SIPHON_NODES.filter(
  node => node.attributes.personas[0] === 'Designer',
);

export const COLLECTIONS = [DESIGN_SYSTEM_COLLECTION, DEVHUB_COLLECTION];

export const SIPHON_NODES_MAP = arrayToMapByProp(SIPHON_NODES, 'id');

export const COLLECTIONS_MAP = arrayToMapByProp(COLLECTIONS, 'id');

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
