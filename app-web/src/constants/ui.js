// all User Interface related constants
import { faComment, faEye, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
import {
  HOME_ROUTE,
  DOCUMENTS_ROUTE,
  REPOS_ROUTE,
  COMPONENTS_ROUTE,
  SELF_SERVICE_ROUTE,
} from './routes';

import {
  getGithubIssuesRoute,
  getGithubRepoRoute,
  getGithubForkRoute,
  getGithubWatchRoute,
} from '../utils/helpers';

import {
  ARIA_LABEL_TO_GITHUB_ISSUES,
  ARIA_LABEL_REPO,
  ARIA_LABEL_FORK_GITHUB_REPO,
  ARIA_LABEL_WATCH_GITHUB_REPO,
} from './ariaLabels';

export const RESOURCE_TYPES = {
  COMPONENTS: 'Components',
  DOCUMENTATION: 'Documentation',
  SELF_SERVICE_TOOLS: 'Self-Service Tools',
  RESPOSITORIES: 'Repositories',
};

export const CARD_ACTIONS = {
  REPOSITORY: {
    name: 'Repository',
    flag: 'features.card.repository',
    icon: faGithub,
    ariaLabel: ARIA_LABEL_REPO,
    getHref: getGithubRepoRoute,
  },
  ISSUES: {
    name: 'Issues',
    flag: 'features.card.issues',
    icon: faComment,
    ariaLabel: ARIA_LABEL_TO_GITHUB_ISSUES,
    getHref: getGithubIssuesRoute,
  },
  FORK: {
    name: 'Fork',
    flag: 'features.card.fork',
    icon: faCodeBranch,
    ariaLabel: ARIA_LABEL_FORK_GITHUB_REPO,
    getHref: getGithubForkRoute,
  },
  WATCH: {
    name: 'Watch',
    flag: 'features.card.watch',
    icon: faEye,
    ariaLabel: ARIA_LABEL_WATCH_GITHUB_REPO,
    getHref: getGithubWatchRoute,
  },
};

export const CARD_CONFIG = {
  maxDescriptionLines: 4, // max number of lines before text should be truncated
  maxTitleLines: 2, // similar.
  avatarIconSize: 200,
  avatarIconWidth: 45,
  avatarIconHeight: 45,
  actionsRibbon: {
    [RESOURCE_TYPES.RESPOSITORIES]: [
      CARD_ACTIONS.REPOSITORY,
      CARD_ACTIONS.ISSUES,
      CARD_ACTIONS.FORK,
      CARD_ACTIONS.WATCH,
    ],
    [RESOURCE_TYPES.DOCUMENTATION]: [CARD_ACTIONS.ISSUES],
    [RESOURCE_TYPES.COMPONENTS]: [CARD_ACTIONS.ISSUES],
  },
};

export const buttonTypes = ['primary', 'secondary', 'link'];
export const LOGIN_BTN_ID = 'dh-login';
export const LOGOUT_BTN_ID = 'dh-logout';
export const BANNER_ID = 'dh-banner';
export const MAIN_NAVIGATION_BTN = 'dh-main-nav';

// for the card toggle component card limit prop
export const LARGE_SCREEN_LIMIT = 4;
export const SMALL_SCREEN_LIMIT = 1;

export const RESOURCE_TYPES_CONFIG = {
  COMPONENTS: {
    DISPLAY_NAME: 'Components',
    VALUE: RESOURCE_TYPES.COMPONENTS,
    ROUTE: COMPONENTS_ROUTE,
  },
  DOCUMENTATION: {
    DISPLAY_NAME: 'Documentation',
    VALUE: RESOURCE_TYPES.DOCUMENTATION,
    ROUTE: DOCUMENTS_ROUTE,
  },
  SELF_SERVICE_TOOLS: {
    DISPLAY_NAME: 'Self-Service Tools',
    VALUE: RESOURCE_TYPES.SELF_SERVICE_TOOLS,
    ROUTE: SELF_SERVICE_ROUTE,
  },
  RESPOSITORIES: {
    DISPLAY_NAME: 'Repositories',
    VALUE: RESOURCE_TYPES.RESPOSITORIES,
    ROUTE: REPOS_ROUTE,
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
    ROUTE: RESOURCE_TYPES_CONFIG.COMPONENTS.ROUTE,
    DISPLAY_NAME: RESOURCE_TYPES_CONFIG.COMPONENTS.DISPLAY_NAME,
    SIPHON_PROP: SIPHON_RESOURCE_TYPE_PROP,
    VALUE: RESOURCE_TYPES_CONFIG.COMPONENTS.VALUE,
  },
  {
    ROUTE: RESOURCE_TYPES_CONFIG.DOCUMENTATION.ROUTE,
    DISPLAY_NAME: RESOURCE_TYPES_CONFIG.DOCUMENTATION.DISPLAY_NAME,
    SIPHON_PROP: SIPHON_RESOURCE_TYPE_PROP,
    VALUE: RESOURCE_TYPES_CONFIG.DOCUMENTATION.VALUE,
  },
  {
    ROUTE: RESOURCE_TYPES_CONFIG.SELF_SERVICE_TOOLS.ROUTE,
    DISPLAY_NAME: RESOURCE_TYPES_CONFIG.SELF_SERVICE_TOOLS.DISPLAY_NAME,
    SIPHON_PROP: SIPHON_RESOURCE_TYPE_PROP,
    VALUE: RESOURCE_TYPES_CONFIG.SELF_SERVICE_TOOLS.VALUE,
  },
  {
    ROUTE: RESOURCE_TYPES_CONFIG.RESPOSITORIES.ROUTE,
    DISPLAY_NAME: RESOURCE_TYPES_CONFIG.RESPOSITORIES.DISPLAY_NAME,
    SIPHON_PROP: SIPHON_RESOURCE_TYPE_PROP,
    VALUE: RESOURCE_TYPES_CONFIG.RESPOSITORIES.VALUE,
  },
];

export const FOOTER_NAVIGATION = [
  {
    to: HOME_ROUTE,
    text: 'home',
  },
];

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
