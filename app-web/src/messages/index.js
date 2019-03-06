/*
Copyright 2019 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/

// message objects are formatted to mesh with react-intl, a popular localization library
// https://github.com/yahoo/react-intl
import { RESOURCE_TYPES } from '../constants/ui';

export const HOME = {
  header: {
    title: {
      id: 'HOME.header.title',
      defaultMessage: 'Developers Hub',
    },
    subtitle: {
      id: 'HOME.header.subtitle',
      defaultMessage:
        'Find resources for digital product teams to learn new skills, discover tools and resources, and connect with the developer community',
    },
  },
};

export const COLLECTIONS_PAGE = {
  header: {
    title: {
      id: 'COLLECTIONS_PAGE.header.title',
      defaultMessage: 'Collections',
    },
    subtitle: {
      id: 'COLLECTIONS_PAGE.header.subtitle',
      defaultMessage:
        'Explore resources that have been specially curated to enhance context, detail and accessibility.',
    },
  },
};
export const RESOURCE_TYPE_PAGES = {
  [RESOURCE_TYPES.COMPONENTS]: {
    header: {
      title: {
        id: 'COMPONENTS.header.title',
        defaultMessage: 'Components',
      },
      subtitle: {
        id: 'COMPONENTS.header.subtitle',
        defaultMessage:
          'Components represent the reusable building blocks for systems. They are leveraged during design and development to reduce effort, improve consistency and maintain compliance.',
      },
    },
  },
  [RESOURCE_TYPES.REPOSITORIES]: {
    header: {
      title: {
        id: 'REPOSITORIES.header.title',
        defaultMessage: 'Github Repositories',
      },
      subtitle: {
        id: 'REPOSITORIES.header.subtitle',
        defaultMessage: 'Explore past projects for inspiration and trends.',
      },
    },
  },
  [RESOURCE_TYPES.SELF_SERVICE_TOOLS]: {
    header: {
      title: {
        id: 'SELF_SERVICE_TOOLS.header.title',
        defaultMessage: 'Tools',
      },
      subtitle: {
        id: 'SELF_SERVICE_TOOLS.header.subtitle',
        defaultMessage: 'Get started with these self-service tools',
      },
    },
  },
  [RESOURCE_TYPES.DOCUMENTATION]: {
    header: {
      title: {
        id: 'DOCUMENTATION.header.title',
        defaultMessage: 'Documentation',
      },
      subtitle: {
        id: 'DOCUMENTATION.header.subtitle',
        defaultMessage:
          'Explore documentation to common Government Entities, Protocols and Compliances',
      },
    },
  },
};

export const SEARCH = {
  button: {
    id: 'SEARCH.button',
    defaultMessage: 'Search',
  },
  results: {
    empty: {
      id: 'SEARCH.results.empty',
      defaultMessage: 'No resources found :( try search again.',
    },
  },
};

export const RESOURCES = {
  types: {
    [RESOURCE_TYPES.COMPONENTS]: {
      id: 'RESOURCE_TYPES.COMPONENTS',
      defaultMessage: 'Component',
    },
    [RESOURCE_TYPES.DOCUMENTATION]: {
      id: 'RESOURCE_TYPES.DOCUMENTATION',
      defaultMessage: 'Documentation',
    },
    [RESOURCE_TYPES.SELF_SERVICE_TOOLS]: {
      id: 'RESOURCE_TYPES.SELF_SERVICE_TOOLS',
      defaultMessage: 'Tool',
    },
    [RESOURCE_TYPES.PEOPLE]: {
      id: 'RESOURCE_TYPES.PEOPLE',
      defaultMessage: 'Contact',
    },
    [RESOURCE_TYPES.REPOSITORIES]: {
      id: 'RESOURCE_TYPES.REPOSITORIES',
      defaultMessage: 'Repository',
    },
    Collections: {
      id: 'RESOURCE_TYPES.COLLECTIONS',
      defaultMessage: 'Collection',
    },
  },
};
