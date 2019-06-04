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
import React from 'react';
import { COLLECTIONS_PAGE } from '../messages';
import { flattenGatsbyGraphQL } from '../utils//dataHelpers';

import { Title } from '../components/Page';
import CollectionPreview from '../components/CollectionPreview/CollectionPreview';
import Main from '../components/Page/Main';
import withResourceQuery from '../hoc/withResourceQuery';
import Layout from '../hoc/Layout';
import { getFirstNonExternalResource } from '../utils/helpers';
import { selectCollectionsWithResourcesGroupedByType } from '../utils/selectors';

const collectionsSelector = selectCollectionsWithResourcesGroupedByType();
export const CollectionsPage = ({ data }) => {
  const collections = flattenGatsbyGraphQL(data.allDevhubCollection.edges);
  const collectionWithResources = collectionsSelector(collections);
  // resources are grouped by type, 'ungroup' them so we can find the first available
  // non external link to use as the entry page for the collection card
  return (
    <Layout>
      <Main>
        <Title
          title={COLLECTIONS_PAGE.header.title.defaultMessage}
          subtitle={COLLECTIONS_PAGE.header.subtitle.defaultMessage}
        />
        {collectionWithResources.map(collection => (
          <CollectionPreview
            key={collection.id}
            title={collection.name}
            description={collection.description}
            resources={collection.childrenDevhubSiphon}
            link={{
              to: getFirstNonExternalResource(
                collection.childrenDevhubSiphon.sort((a, b) => {
                  // sort to ensure first resource in collection is the entry poitn
                  const position1 = a._metadata.position;
                  const position2 = b._metadata.position;
                  return position1.localeCompare(position2);
                }),
              ),
              text: 'View',
            }}
          />
        ))}
      </Main>
    </Layout>
  );
};

export default withResourceQuery(CollectionsPage)();
