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
import transformRelativePaths from '../index';
import { 
    isRelativePath,
} from '../utils/utils';

describe('gatsby-remark-path-transform', () => {
    describe('isRelativePath', () => {
        it('returns true if path is relative', () => {
            expect(isRelativePath('../something')).toBe(true);
            expect(isRelativePath('./something')).toBe(true);
        });
        
        it('returns false if path is absolute', () => {
            expect(isRelativePath('/something')).toBe(false);
        });
    });

    describe('transformRelativePaths', () => {
        it('throws if converter option doesn\'t exist or is not a function',  () => {
            expect(() => {
                transformRelativePaths({}, {converter: null});
            }).toThrow('gatsby-remark-path-transform option: \'converter\' must be passed in as a function!');
            expect(() => {
                transformRelativePaths({});
            }).toThrow('gatsby-remark-path-transform option: \'converter\' must be passed in as a function!');
        });
    });
});