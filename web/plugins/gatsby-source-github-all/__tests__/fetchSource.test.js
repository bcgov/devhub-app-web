/*
Copyright 2018 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
import { GITHUB_SOURCE } from '../__fixtures__/fixtures';
import { fetchFromSource, validateSourceRegistry } from '../utils/fetchSource';
import { fetchSourceGithub, validateSourceGithub } from '../utils/sources/github';

jest.mock('../utils/sources/github/index.js');

fetchSourceGithub.mockReturnValue([]);
validateSourceGithub.mockReturnValue(true);

describe('Fetch Source Routine', () => {
  const sourceOptions = {
    GITHUB_API_TOKEN: '123',
  };
  const invalidSource = { ...GITHUB_SOURCE, sourceType: 'INVALID' };

  test('fetch from source returns an empty array if source type is invalid', () => {
    expect(fetchFromSource(invalidSource.sourceType, invalidSource, sourceOptions)).toEqual([]);
  });

  test('fetch from source calls getFilesFromRepo if source type is github', () => {
    fetchFromSource(GITHUB_SOURCE.sourceType, GITHUB_SOURCE, sourceOptions);
    expect(fetchSourceGithub).toHaveBeenCalled();
  });

  test('validateSourceGithub calls validatesourceGithub if source type is github', () => {
    validateSourceRegistry(GITHUB_SOURCE);
    expect(validateSourceGithub).toHaveBeenCalled();
  });
});
