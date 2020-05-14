export const RESOURCE_TYPES = {
  COMPONENTS: 'Components',
  DOCUMENTATION: 'Documentation',
  SELF_SERVICE_TOOLS: 'Self-Service Tools',
  REPOSITORIES: 'Repositories',
  PEOPLE: 'People',
  EVENTS: 'Events',
  TOPICS: 'Topics',
  JOURNEY: 'Journey',
};

export const SEARCH_RESOURCE_TYPES = {
  GITHUB_ISSUE: 'Github Issue',
  DOCUMIZE: 'Documize',
};

export const JOURNEY = 'Journey';
// not exactly a resource type but still an important identifier for a 'type' of devhub node
// this will change in devhub v3 when all nodes, resources/topics/and more are treated as
// equal
export const TOPICS = 'Topics';

export const RESOURCE_TYPES_LIST = Object.keys(RESOURCE_TYPES)
  .map(key => RESOURCE_TYPES[key])
  .concat(TOPICS)
  .concat(JOURNEY)
  .concat(SEARCH_RESOURCE_TYPES.GITHUB_ISSUE)
  .concat(SEARCH_RESOURCE_TYPES.DOCUMIZE);

export const PERSONAS_LIST = ['Developer', 'Designer', 'Product Owner'];

export const buttonTypes = ['primary', 'secondary', 'link'];

export const MAIN_NAVIGATION_BTN = 'dh-main-nav';
export const SEARCH_INPUT_ID = 'dh-search-input';
// for the card toggle component card limit prop

// react-scroll requires identifiers to scroll to individual elements
export const REACT_SCROLL = {
  CONFIG: {
    duration: 750,
    delay: 100,
    smooth: true,
  },
  ELEMENTS: {
    CARDS_CONTAINER: 'CARDS_CONTAINER',
  },
};

export const SEARCH = {
  INPUT: {
    maxLength: 40,
    id: SEARCH_INPUT_ID,
    name: `${SEARCH_INPUT_ID}.search`,
  },
};

// supported namespace for dynamically generating avatar images or icons
// this relates to the Avatar UI Component
export const AVATAR_NAMESPACES = {
  fontawesome: 'fontawesome',
  github: 'github',
};

export const EVENTS = {
  MAX_PAST_EVENTS: 9,
};

export const EVENT_TYPES = {
  eventbrite: 'eventbrite',
  meetup: 'meetup',
};

export const CARD_CAROUSEL = {
  mobile: {
    slidesPerPage: 1,
    slidesPerScroll: 1,
  },
  desktop: {
    slidesPerPage: 3,
    slidesPerScroll: 3,
  },
};

export const POPULAR_TOPIC_CONFIGURATION = {
  name: 'Popular',
  description: 'These resources have been getting some attention lately',
  maxNodes: 10, // this is calculated by measuring the 10 closest nodes relative the average page hit count
  minPageViews: 4,
};

export const DYNAMIC_TOPIC_PATHS = {
  popular: 'popular',
  featured: 'featured',
};

// featured content is identified by node.fields.title
// an expressed in order by this object
// this is a lookup table to easily identify which resources are considered featured
export const FEATURED_CONTENT = [
  'Exchange Lab Ops Learning Programs',
  'BCDevExchange Platform Status Page',
  'BC Developers Exchange',
  'Chat Channel Conventions',
  'Steps to join Pathfinder Rocket.Chat',
  '12 Factor Apps',
  'Contributing To The Devhub',
  'Progressive Web Apps',
  'Documize',
  'What is Pathfinder?',
];

export const FEATURE_TOPIC_CONFIGURATION = {
  name: 'Featured Resources',
  description: 'A selection of resources we think you will want to know about',
};

export const JOURNEY_TOPIC_VIEW_MODES = { card: 'cards', list: 'list' };
