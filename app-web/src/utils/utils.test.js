import hexGridCalculator from './hexGridCalculator';
import { groupBy } from './dataMassager';

describe('Hex Grid Calculation', () => {
  test('it should return [3, 3, 3, 2, 2] when passed in 5 and [3, 2]', () => {
    const expected = [3, 3, 3, 2, 2];
    const arrayLength = 5;
    const pattern = [3, 2];
    expect(hexGridCalculator(arrayLength, pattern)).toEqual(expected);
  });

  test('it should return [3, 3, 3, 2, 2, 3, 3, 3, 2, 2] when passed in 10 and [3, 2]', () => {
    const expected = [3, 3, 3, 2, 2, 3, 3, 3, 2, 2];
    const arrayLength = 10;
    const pattern = [3, 2];
    expect(hexGridCalculator(arrayLength, pattern)).toEqual(expected);
  });

  test('it should throw if not passed a number as array length or if number is less than 0', () => {
    const arrayLength = false;
    const pattern = [3, 2];
    expect(() => hexGridCalculator(arrayLength, pattern)).toThrow();
    expect(() => hexGridCalculator(-1, pattern)).toThrow();
  });

  test('it should throw error if not passed in an array as a pattern or if array is not made of ints', () => {
    const arrayLength = 5;
    const pattern = null;
    expect(() => hexGridCalculator(arrayLength, pattern)).toThrow();
  });

  test('it should throw if integers passed to pattern are negative', () => {
    const arrayLength = 5;
    const pattern = [-1, 3];
    expect(() => hexGridCalculator(arrayLength, pattern)).toThrow();
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
