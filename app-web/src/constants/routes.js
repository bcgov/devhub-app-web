import { RESOURCE_TYPES } from './ui';
export const HOME_ROUTE = '/';
export const GITHUB_ISSUES_ROUTE = 'https://github.com/bcgov/devhub-app-web/issues';
export const DISCLAIMER_ROUTE = 'https://www2.gov.bc.ca/gov/content/home/disclaimer';
export const PRIVACY_ROUTE = 'https://www2.gov.bc.ca/gov/content/home/privacy';
export const ACCESSIBILITY_ROUTE = 'https://www2.gov.bc.ca/gov/content/home/accessibility';
export const COPYRIGHT_ROUTE = 'https://www2.gov.bc.ca/gov/content/home/copyright';

export const MAIN_NAV_ROUTES = {
  ALL: {
    to: '/',
    text: 'Home',
  },
  COLLECTIONS: {
    to: '/collections',
    text: 'Collections',
  },
  [RESOURCE_TYPES.SELF_SERVICE_TOOLS]: {
    to: '/self-service-tools',
    text: 'Tools',
  },
  [RESOURCE_TYPES.COMPONENTS]: {
    to: '/components',
    text: 'Components',
  },
  [RESOURCE_TYPES.REPOSITORIES]: {
    to: '/repositories',
    text: 'GitHub Repositories',
  },
  [RESOURCE_TYPES.DOCUMENTATION]: {
    to: '/documentation',
    text: 'Documentation',
  },
};

export const FOOTER_NAVIGATION = [
  {
    to: HOME_ROUTE,
    text: 'home',
  },
  {
    to: DISCLAIMER_ROUTE,
    text: 'disclaimer',
  },
  {
    to: PRIVACY_ROUTE,
    text: 'privacy',
  },
  {
    to: ACCESSIBILITY_ROUTE,
    text: 'accessibility',
  },
  {
    to: COPYRIGHT_ROUTE,
    text: 'copyright',
  },
  {
    to: GITHUB_ISSUES_ROUTE,
    text: 'contact us',
  },
];
