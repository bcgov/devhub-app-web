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
    position: [0, 0, 0],
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
    position: [0, 0, 1],
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

export const DESIGN_SYSTEM_NODE_3 = {
  id: '3',
  parent: {
    id: IDS.DESIGN_SYSTEM,
  },
  _metadata: {
    position: [0, 0, 2],
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
    position: [0, 0, 3],
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
    position: [1, 0, 0],
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
    position: [1, 0, 1],
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

export const DESIGN_SYSTEM_NODES = [
  DESIGN_SYSTEM_NODE_1,
  DESIGN_SYSTEM_NODE_2,
  DESIGN_SYSTEM_NODE_3,
  DESIGN_SYSTEM_NODE_4,
];

export const DEVHUB_NODES = [DEVHUB_NODE_1, DEVHUB_NODE_2];

// COLLECTIONS
export const DESIGN_SYSTEM_COLLECTION = {
  id: IDS.DESIGN_SYSTEM,
  type: 'default',
  title: 'Design System',
  description: 'baz',
  nodes: DESIGN_SYSTEM_NODES,
};

export const DEVHUB_COLLECTION = {
  id: IDS.DEVHUB,
  type: 'default',
  title: 'Devhub',
  description: 'baz',
  nodes: DEVHUB_NODES,
};

export const SIPHON_NODES = DESIGN_SYSTEM_NODES.concat(DEVHUB_NODES);

export const COLLECTIONS = [DESIGN_SYSTEM_COLLECTION, DEVHUB_COLLECTION];
