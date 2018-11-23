// all User Interface related constants
import { HOME_ROUTE } from './routes';
export const buttonTypes = ['primary', 'secondary', 'link'];
export const LOGIN_BTN_ID = 'dh-login';
export const LOGOUT_BTN_ID = 'dh-logout';
export const BANNER_ID = 'dh-banner';
export const MAIN_NAVIGATION_BTN = 'dh-main-nav';
export const LARGE_SCREEN_LIMIT = 4;
export const SMALL_SCREEN_LIMIT = 1;

export const RESOURCE_TYPES = {
  COMPONENTS: {
    DISPLAY_NAME: 'Components',
    VALUE: 'Components',
    ROUTE: '/resources/components',
  },
  DOCUMENTATION: {
    DISPLAY_NAME: 'Documentation',
    VALUE: 'Documentation',
    ROUTE: '/resources/documentation',
  },
  SELF_SERVICE_TOOLS: {
    DISPLAY_NAME: 'Self-Service Tools',
    VALUE: 'Self-Service Tools',
    ROUTE: '/resources/self-service-tools',
  },
  RESPOSITORIES: {
    DISPLAY_NAME: 'Repositories',
    VALUE: 'Repositories',
    ROUTE: '/resources/repositories',
  },
};

// the 'dot prop' to get the resource type from a siphon data node
export const SIPHON_RESOURCE_TYPE_PROP = 'resource.type';

export const MAIN_NAV_CONFIG = [
  {
    ROUTE: HOME_ROUTE,
    DISPLAY_NAME: 'All',
    SIPHON_PROP: SIPHON_RESOURCE_TYPE_PROP,
    VALUE: 'All',
  },
  {
    ROUTE: RESOURCE_TYPES.COMPONENTS.ROUTE,
    DISPLAY_NAME: RESOURCE_TYPES.COMPONENTS.DISPLAY_NAME,
    SIPHON_PROP: SIPHON_RESOURCE_TYPE_PROP,
    VALUE: RESOURCE_TYPES.COMPONENTS.VALUE,
  },
  {
    ROUTE: RESOURCE_TYPES.DOCUMENTATION.ROUTE,
    DISPLAY_NAME: RESOURCE_TYPES.DOCUMENTATION.DISPLAY_NAME,
    SIPHON_PROP: SIPHON_RESOURCE_TYPE_PROP,
    VALUE: RESOURCE_TYPES.DOCUMENTATION.VALUE,
  },
  {
    ROUTE: RESOURCE_TYPES.SELF_SERVICE_TOOLS.ROUTE,
    DISPLAY_NAME: RESOURCE_TYPES.SELF_SERVICE_TOOLS.DISPLAY_NAME,
    SIPHON_PROP: SIPHON_RESOURCE_TYPE_PROP,
    VALUE: RESOURCE_TYPES.SELF_SERVICE_TOOLS.VALUE,
  },
  {
    ROUTE: RESOURCE_TYPES.RESPOSITORIES.ROUTE,
    DISPLAY_NAME: RESOURCE_TYPES.RESPOSITORIES.DISPLAY_NAME,
    SIPHON_PROP: SIPHON_RESOURCE_TYPE_PROP,
    VALUE: RESOURCE_TYPES.RESPOSITORIES.VALUE,
  },
];

export const FOOTER_NAVIGATION = [
  {
    to: HOME_ROUTE,
    text: 'home',
  },
];
