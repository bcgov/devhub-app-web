import { arrayToMapByProp } from '../src/utils/dataHelpers';
import { RESOURCE_TYPES } from '../src/constants/ui';

const IDS = {
  DESIGN_SYSTEM: 'collection-1',
  DEVHUB: 'collection-2',
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
    path: '/design-system/Z1bGIqu',
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
    path: '/design-system/Z1bGIqu',
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
    path: '/design-system/Z1bGIqu',
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
    path: '/design-system/Z1bGIqu',
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
    path: '/design-system/Z1bGIqu',
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
    path: '/design-system/Z1bGIqu',
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
    path: '/design-system/Z1bGIqu',
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
  title: 'Design System',
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
  title: 'Devhub',
  description: 'baz',
  resources: DEVHUB_NODES.map(n => ({ id: n.id })),
  childrenDevhubSiphon: DEVHUB_NODES.map(n => ({
    id: n.id,
    _metadata: { ...n._metadata },
    resource: { ...n.resource },
    unfurl: { ...n.unfurl },
  })),
};

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
