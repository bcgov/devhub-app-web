import { randomId } from "../src/utils/strings";


describe('String Utilities', () => {
  it('generates a random id of n length', () => {
    const str1 = randomId(5);
    expect(str1.length).toBe(5);

    const str2 = randomId(7);
    expect(str2.length).toBe(7);

    const str3 = randomId(8);
    expect(str3.length).toBe(8);

    expect(str1).not.toBe(str2);
  })
});