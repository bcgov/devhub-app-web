import { createSelector } from 'reselect';
import { filterCollections } from '../reducers/siphon';

export const siphonSelector = state => state.siphon;
export const uiSelector = state => state.ui;

export const collectionsSelector = createSelector(
  siphonSelector,
  siphon => siphon.collections,
);

export const selectFilters = createSelector(
  siphonSelector,
  siphon => siphon.filters,
);

// returns all currently active filters
export const selectActiveFilters = createSelector(
  selectFilters,
  filters => filters.filter(f => f.active),
);

export const selectCollectionsLoaded = createSelector(
  siphonSelector,
  siphon => siphon.collectionsLoaded,
);

// returns collections where nodes are sorted lexographically by position
export const selectSortedCollections = createSelector(
  collectionsSelector,
  collections =>
    collections.map(collection => ({
      ...collection,
      nodes: collection.nodes
        .sort((a, b) => {
          // lexographic sort of position string
          if (a._metadata.position < b._metadata.position) return -1;
          if (a._metadata.position > b._metadata.position) return 1;
          return 0;
        })
        .map(node => ({
          title: node.unfurl.title,
          description: node.unfurl.description,
          image: node.unfurl.image,
          path: node.resource.path,
          type: node.resource.type,
        })),
    })),
);

// returns collections filtered
export const selectFilteredCollections = createSelector(
  [selectSortedCollections, selectActiveFilters],
  (collections, filters) =>
    filters.length > 0 ? filterCollections(collections, filters) : collections,
);

// search selectors
export const selectQuery = createSelector(
  siphonSelector,
  siphon => siphon.query,
);

// used to dictate a feedback message after conducting a search check <SearchFeedback /> for reference
export const selectSearchResultsLength = createSelector(
  siphonSelector,
  siphon => Object.keys(siphon.searchResults).length,
);

// similar as above
export const selectTotalResources = createSelector(
  siphonSelector,
  siphon => siphon.totalResources,
);

// similar as above
export const selectSearchWordLength = createSelector(
  siphonSelector,
  siphon => siphon.searchBarTerms.length,
);

export const selectSiphonReducerLoading = createSelector(
  siphonSelector,
  siphon => siphon.loading,
);
