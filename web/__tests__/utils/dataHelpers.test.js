import { arrayToMapByProp } from '../../src/utils/dataHelpers';

describe('Data Helpers', () => {
  describe('arrayToMapByProp', () => {
    it('converts an array to a map', () => {
      const array = [
        {
          id: 'foo1',
          props: {
            name: 'seana',
          },
        },
        {
          id: 'foo2',
          props: {
            name: 'marty',
          },
        },
        {
          id: 'foo3',
          props: {
            name: 'allison',
          },
        },
      ];

      const expected = {
        map: {
          foo1: {
            id: 'foo1',
            props: {
              name: 'seana',
            },
          },
          foo2: {
            id: 'foo2',
            props: {
              name: 'marty',
            },
          },
          foo3: {
            id: 'foo3',
            props: {
              name: 'allison',
            },
          },
        },
        all: ['foo1', 'foo2', 'foo3'],
      };

      expect(arrayToMapByProp(array, 'id')).toEqual(expected);
    });
  });
});
