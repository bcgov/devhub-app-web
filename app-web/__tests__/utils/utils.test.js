import { groupBy } from '../../src/utils/dataHelpers';
import { SIPHON_QL_NODE } from '../../__fixtures__/plugin-fixtures';
import { converter } from '../../src/utils/gatsbyRemark';

describe('Gatsby Remark Transformer Path Converter', () => {
  const getNode = jest.fn(() => ({
    _metadata: {
      sourceLocations: [],
    },
  }));

  test('it only transforms sourceDevHubGithub nodes', () => {
    const path = './something.png';
    const astType = 'image';
    const node = {
      internal: {
        type: 'notsourceDevhubGithub',
      },
    };
    expect(converter(astType, path, node, getNode)).toBe(path);
  });

  test('it returns path on sourceDevhubGithub nodes', () => {
    const path = './somthing.png';
    const astType = 'image';
    const newPath = converter(astType, path, SIPHON_QL_NODE, getNode);
    expect(typeof newPath).toBe('string');
    expect(newPath).not.toBe(path);
  });
});

describe('Data Massagers', () => {
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
});
