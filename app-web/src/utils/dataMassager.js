// group array of objects by a key
// arr = [ {foo: "bar", fruit: "apple"}, {foo: "baer", fruit: "banana"}]
// groupBy(arr, "fruit") => [{fruit: "apple", data: {foo: "bar", fruit: "apple"}} ..etc]
import { TypeCheck } from '@bcgov/common-web-utils';
/**
 * @param {Array} collection
 * @param {String} key
 * @returns {Array}
 */
// eslint-disable-next-line
export const groupBy = (collection, key) => {
  if (!TypeCheck.isArray(collection)) {
    throw new Error('Collection must be type of Array');
  }

  if (!key || !TypeCheck.isString(key)) {
    throw new Error('Key must be type of String');
  }

  const grouping = {};
  collection.forEach(c => {
    if (!TypeCheck.isObject(c)) {
      throw new Error('Collection must only contain Objects');
    }
    if (c[key]) {
      if (!grouping[c[key]]) {
        grouping[c[key]] = [c];
      } else {
        grouping[c[key]].push(c);
      }
    }
  });

  return Object.keys(grouping).map(groupKey => ({
    [key]: groupKey,
    data: grouping[groupKey],
  }));
};

// the raw query return an array of objects that contains a node property
export const flattenAllSourceDevhubGithub = edges => edges.map(node => node.node);
