import { groupBy, arrayToMapByProp } from '../../src/utils/dataHelpers';

describe('Data Helpers', () => {
  test('it groups data correctly when passed in the right arguments', () => {
    const data = [
      {
        foo: 'bar',
        name: 'banana',
        fruit: 'something',
        category: 'fruit',
      },
      {
        foo: 'bar',
        name: 'apple',
        fruit: 'something',
        category: 'fruit',
      },
      {
        foo: 'bar',
        name: 'hammer',
        category: 'tools',
      },
      {
        foo: 'bar',
        name: 'wrench',
        fruit: 'something',
        category: 'tools',
      },
    ];

    const expected = [
      {
        category: 'fruit',
        data: [
          {
            foo: 'bar',
            name: 'banana',
            fruit: 'something',
            category: 'fruit',
          },
          {
            foo: 'bar',
            name: 'apple',
            fruit: 'something',
            category: 'fruit',
          },
        ],
      },
      {
        category: 'tools',
        data: [
          {
            foo: 'bar',
            name: 'hammer',
            category: 'tools',
          },
          {
            foo: 'bar',
            name: 'wrench',
            fruit: 'something',
            category: 'tools',
          },
        ],
      },
    ];
    expect(groupBy(data, 'category')).toEqual(expected);
  });

  test('Throws error if key is not passed into func', () => {
    expect(() => {
      groupBy([{ a: true }]);
    }).toThrow('Key must be type of String');
  });

  test('Throws if collection passed is not an array', () => {
    expect(() => {
      groupBy(123);
    }).toThrow('Collection must be type of Array');
  });

  test('Throws if collection is not array of objects', () => {
    expect(() => {
      groupBy([1, 2, 5], 'key');
    }).toThrow('Collection must only contain Objects');
  });

  test("If grouping doesn't exist in object it is not returned", () => {
    const data = [
      {
        foo: 'bar',
        name: 'banana',
        fruit: 'something',
        category: 'fruit',
      },
      {
        foo: 'bar',
        name: 'apple',
        fruit: 'something',
        category: 'fruit',
      },
      {
        foo: 'bar',
        name: 'hammer',
        category: 'tools',
      },
      {
        foo: 'bar',
        name: 'wrench',
        fruit: 'something',
      },
    ];

    const expected = [
      {
        category: 'fruit',
        data: [
          {
            foo: 'bar',
            name: 'banana',
            fruit: 'something',
            category: 'fruit',
          },
          {
            foo: 'bar',
            name: 'apple',
            fruit: 'something',
            category: 'fruit',
          },
        ],
      },
      {
        category: 'tools',
        data: [
          {
            foo: 'bar',
            name: 'hammer',
            category: 'tools',
          },
        ],
      },
    ];

    expect(groupBy(data, 'category')).toEqual(expected);
  });

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
      };

      expect(arrayToMapByProp(array, 'id')).toEqual(expected);
    });
  });
});
