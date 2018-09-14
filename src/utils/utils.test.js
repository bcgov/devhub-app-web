import hexGridCalculator from './hexGridCalculator';
describe('Hex Grid Calculation', () => {
    test('it should return [3, 3, 3, 2, 2] when passed in 5 and [3, 2]', () => {
        const expected = [3, 3, 3, 2, 2];
        const arrayLength = 5;
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
});