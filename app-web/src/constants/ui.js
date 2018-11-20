// all User Interface related constants

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
  },
  DOCUMENTATION: {
    DISPLAY_NAME: 'Documentation',
    VALUE: 'Documentation',
  },
  SELF_SERVICE_TOOLS: {
    DISPLAY_NAME: 'Self-Service Tools',
    VALUE: 'Self-Service Tools',
  },
};

export const SIPHON_RESOURCE_TYPE_PROP = 'resource.type';

export const MAIN_NAV_CONFIG = [
  {
    DISPLAY_NAME: 'All',
    SIPHON_PROP: SIPHON_RESOURCE_TYPE_PROP,
    VALUE: 'All',
  },
  {
    DISPLAY_NAME: RESOURCE_TYPES.COMPONENTS.DISPLAY_NAME,
    SIPHON_PROP: SIPHON_RESOURCE_TYPE_PROP,
    VALUE: RESOURCE_TYPES.COMPONENTS.VALUE,
  },
  {
    DISPLAY_NAME: RESOURCE_TYPES.DOCUMENTATION.DISPLAY_NAME,
    SIPHON_PROP: SIPHON_RESOURCE_TYPE_PROP,
    VALUE: RESOURCE_TYPES.DOCUMENTATION.VALUE,
  },
  {
    DISPLAY_NAME: RESOURCE_TYPES.SELF_SERVICE_TOOLS.DISPLAY_NAME,
    SIPHON_PROP: SIPHON_RESOURCE_TYPE_PROP,
    VALUE: RESOURCE_TYPES.SELF_SERVICE_TOOLS.VALUE,
  },
];
