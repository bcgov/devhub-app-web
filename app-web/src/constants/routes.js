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
    testId: 'nav.home',
  },
  TOPICS: {
    to: '/topics',
    text: 'Topics',
    testId: 'nav.topics',
  },
  [RESOURCE_TYPES.SELF_SERVICE_TOOLS]: {
    to: '/self-service-tools',
    text: 'Tools',
    testId: 'nav.tools',
  },
  [RESOURCE_TYPES.COMPONENTS]: {
    to: '/components',
    text: 'Components',
    testId: 'nav.components',
  },
  [RESOURCE_TYPES.REPOSITORIES]: {
    to: '/repositories',
    text: 'GitHub Repositories',
    testId: 'nav.github.repositories',
  },
  [RESOURCE_TYPES.DOCUMENTATION]: {
    to: '/documentation',
    text: 'Documentation',
    testId: 'nav.documentation',
  },
  [RESOURCE_TYPES.EVENTS]: {
    to: '/events',
    text: 'Events',
    testId: 'nav.events',
  },
};

export const FOOTER_NAVIGATION = [
  {
    to: HOME_ROUTE,
    text: 'home',
    testId: 'nav.home',
  },
  {
    to: DISCLAIMER_ROUTE,
    text: 'disclaimer',
    testId: 'nav.disclaimer',
  },
  {
    to: PRIVACY_ROUTE,
    text: 'privacy',
    testId: 'nav.privacy',
  },
  {
    to: ACCESSIBILITY_ROUTE,
    text: 'accessibility',
    testId: 'nav.accessibility',
  },
  {
    to: COPYRIGHT_ROUTE,
    text: 'copyright',
    testId: 'nav.copyright',
  },
  {
    to: GITHUB_ISSUES_ROUTE,
    text: 'contact us',
    testId: 'nav.contact.us',
  },
];
