import React, { useMemo } from 'react';
import groupBy from 'lodash/groupBy';
import intersectionBy from 'lodash/intersectionBy';
import ResourcePreview from '../Home/ResourcePreview';

/**
 * returns a resource preview components
 * @param {Array} resources the list of siphon resources
 * @param {Array} results the list of searched resources
 * @param {Srting} title the title of currtion card section
 */
export const SearchResults = ({ resources, results = [], title }) => {
  let resourcesToShow = useMemo(() => intersectionBy(resources, results, 'id'), [
    resources,
    results,
  ]);
  let resourcesByType = useMemo(() => groupBy(resourcesToShow, 'fields.resourceType'), [
    resourcesToShow,
  ]);

  const resourceIconsWithCounter = Object.keys(resourcesByType)
    .map(resourceType => {
      return {
        name: resourceType,
        counter: resourcesByType[resourceType].length,
      };
    })
    .sort((a, b) => {
      return b.counter - a.counter;
    });

  return (
    <ResourcePreview
      title={title}
      resources={resourcesToShow}
      filters={resourceIconsWithCounter}
      amountToShow={18}
      seeMore={true}
    />
  );
};

export default React.memo(SearchResults);
