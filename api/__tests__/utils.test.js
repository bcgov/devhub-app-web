import { randomId } from '../src/utils/strings';
import { originMatchesPattern } from '../src/utils/cors';

describe('String Utilities', () => {
  it('generates a random id of n length', () => {
    const str1 = randomId(5);
    expect(str1.length).toBe(5);

    const str2 = randomId(7);
    expect(str2.length).toBe(7);

    const str3 = randomId(8);
    expect(str3.length).toBe(8);

    expect(str1).not.toBe(str2);
  });
});

describe('Cors Utilities', () => {
  it(`matches the pattern https:\/\/devhub-static-dev-\\d\+-devhub-dev\.pathfinder\.gov\.bc\.ca 
      when https://devhub-static-dev-4343-devhub-dev.pathfinder.gov.bc.ca 
      is passed`, () => {
      
     expect(originMatchesPattern("https:\/\/devhub-static-dev-\\d\+-devhub-dev\.pathfinder\.gov\.bc\.ca", "https://devhub-static-dev-4343-devhub-dev.pathfinder.gov.bc.ca" )).toBe(true);
  });
});
