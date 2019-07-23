export const RESOURCE_TYPES = {
  COMPONENTS: 'Components',
  DOCUMENTATION: 'Documentation',
  SELF_SERVICE_TOOLS: 'Self-Service Tools',
  REPOSITORIES: 'Repositories',
  PEOPLE: 'People',
  EVENTS: 'Events',
};

// not exactly a resource type but still an important identifier for a 'type' of devhub node
// this will change in devhub v3 when all nodes, resources/topics/and more are treated as
// equal
export const TOPICS = 'Topics';

export const RESOURCE_TYPES_LIST = Object.keys(RESOURCE_TYPES)
  .map(key => RESOURCE_TYPES[key])
  .concat(TOPICS);

export const PERSONAS_LIST = ['Developer', 'Designer', 'Product Owner'];

export const buttonTypes = ['primary', 'secondary', 'link'];
export const LOGIN_BTN_ID = 'dh-login';
export const LOGOUT_BTN_ID = 'dh-logout';
export const BANNER_ID = 'dh-banner';
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
