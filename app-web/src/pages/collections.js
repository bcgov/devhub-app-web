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
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../store/actions';
import * as selectors from '../store/selectors';

import { COLLECTIONS_PAGE } from '../messages';
import { flattenGatsbyGraphQL } from '../utils//dataHelpers';

import Title from '../components/Page/Title';
import CollectionPreview from '../components/CollectionPreview/CollectionPreview';
import Main from '../components/Page/Main';
import withResourceQuery from '../hoc/withResourceQuery';
import Layout from '../hoc/Layout';

export class CollectionsPage extends Component {
  componentDidMount() {
    // flatted nodes from graphql
    if (!this.props.resourcesLoaded) {
      const collections = flattenGatsbyGraphQL(this.props.data.allDevhubSiphonCollection.edges);
      // note this.props.data is received from the withResourceQuery Component
      const resources = flattenGatsbyGraphQL(this.props.data.allDevhubSiphon.edges);
      this.props.loadResources(resources, collections);
    }
  }

  render() {
    const { collections } = this.props;

    return (
      <Layout>
        <Main>
          <Title
            title={COLLECTIONS_PAGE.header.title.defaultMessage}
            subtitle={COLLECTIONS_PAGE.header.subtitle.defaultMessage}
          />
          {collections.map(collection => (
            <CollectionPreview
              key={collection.id}
              title={collection.name}
              description={collection.description}
              resources={collection.resources}
              link={collection.resources[0] && collection.resources[0].resource.path}
            />
          ))}
        </Main>
      </Layout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  resourcesLoaded: selectors.selectResourcesLoaded,
  collections: selectors.selectCollectionsWithResources,
});

const mapDispatchToProps = dispatch => {
  return {
    loadResources: (resources, collections) =>
      dispatch(actions.loadResources(resources, collections)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withResourceQuery(CollectionsPage)());
