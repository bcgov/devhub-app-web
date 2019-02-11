import { createSelector } from 'reselect';

const collectionsSelector = state => state._collections;

// returns collections where nodes are sorted lexographically by position
export const getSortedCollections = createSelector(
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
