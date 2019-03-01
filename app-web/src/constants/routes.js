import { RESOURCE_TYPES } from './ui';
export const HOME_ROUTE = '/';
export const GITHUB_ISSUES_ROUTE = 'https://github.com/bcgov/devhub-app-web/issues';
export const MAIN_NAV_ROUTES = {
  ALL: {
    to: '/',
    text: 'All',
  },
  [RESOURCE_TYPES.COMPONENTS]: {
    to: '/components',
    text: 'Components',
  },
  [RESOURCE_TYPES.DOCUMENTATION]: {
    to: '/documentation',
    text: 'Documentation',
  },
  [RESOURCE_TYPES.SELF_SERVICE_TOOLS]: {
    to: '/self-service-tools',
    text: 'Self-Service Tools',
  },
  [RESOURCE_TYPES.REPOSITORIES]: {
    to: '/repositories',
    text: 'Repositories',
  },
};

export const FOOTER_NAVIGATION = [
  {
    to: HOME_ROUTE,
    text: 'home',
  },
];
