/*
Copyright 2018 Province of British Columbia

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
import React from 'react';
import { graphql } from 'gatsby';
import { groupBy } from 'lodash';
import { RESOURCE_TYPES } from '../../../constants/ui';
import NavGroup from './NavGroup';

// navigation for dynamically created page components
const Navigation = ({ items }) => {
  const navItems = items.map(item => ({
    to: item.resource.path,
    text: item.unfurl.title,
    type: item.resource.type,
  }));
  // group resources by type
  const groupedResources = groupBy(navItems, 'type');

  const groups = [];

  if (groupedResources[RESOURCE_TYPES.DOCUMENTATION]) {
    groups.push(
      <NavGroup
        type={RESOURCE_TYPES.DOCUMENTATION}
        key={RESOURCE_TYPES.DOCUMENTATION}
        items={groupedResources[RESOURCE_TYPES.DOCUMENTATION]}
      />,
    );
  }

  if (groupedResources[RESOURCE_TYPES.COMPONENTS]) {
    groups.push(
      <NavGroup
        type={RESOURCE_TYPES.COMPONENTS}
        key={RESOURCE_TYPES.COMPONENTS}
        items={groupedResources[RESOURCE_TYPES.COMPONENTS]}
      />,
    );
  }

  if (groupedResources[RESOURCE_TYPES.SELF_SERVICE_TOOLS]) {
    groups.push(
      <NavGroup
        type={RESOURCE_TYPES.SELF_SERVICE_TOOLS}
        key={RESOURCE_TYPES.SELF_SERVICE_TOOLS}
        items={groupedResources[RESOURCE_TYPES.SELF_SERVICE_TOOLS]}
      />,
    );
  }

  if (groupedResources[RESOURCE_TYPES.REPOSITORIES]) {
    groups.push(
      <NavGroup
        type={RESOURCE_TYPES.REPOSITORIES}
        key={RESOURCE_TYPES.REPOSITORIES}
        items={groupedResources[RESOURCE_TYPES.REPOSITORIES]}
      />,
    );
  }

  return <div>{groups}</div>;
};

export const query = graphql`
  fragment NavigationFragment on DevhubSiphon {
    unfurl {
      title
    }
    resource {
      path
      type
    }
    source {
      type
    }
    _metadata {
      position
    }
  }
`;

export default Navigation;
