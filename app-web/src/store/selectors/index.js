import { createSelector } from 'reselect';
import { filterCollections } from '../reducers/siphon';

const siphonSelector = state => state.siphon;
const uiSelector = state => state.ui;

const collectionsSelector = createSelector(
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
      nodes: collection.nodes.sort((a, b) => {
        // lexographic sort of position string
        if (a._metadata.position < b._metadata.position) return -1;
        if (a._metadata.position > b._metadata.position) return 1;
        return 0;
      }),
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
  siphon => siphon.searchResults.length,
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

export const selectShowWelcomePanel = createSelector(
  uiSelector,
  ui => !ui.selectWelcomePanelViewd,
);

export const selectSiphonReducerLoading = createSelector(
  siphonSelector,
  siphon => siphon.loading,
);
