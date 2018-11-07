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
/**
 * returns an idempotent path based on a base path plus a digestable string that is hashed
 * @param {String} source the string name of the original source
 * @param  {Array} digestable 
 * @returns {String} ie (/mypath, file.md) => /mypath/123dsfakjhdf
 */
import { TypeCheck } from '@bcgov/common-web-utils';
import path from 'path';
import shorthash from 'shorthash';

export const createPathWithDigest = (base, digestable) => {
  if (!TypeCheck.isString(base)) {
    throw new Error('base must be a string');
  }
  if (!TypeCheck.isString(digestable)) {
    throw new Error('digestable must be a string');
  }
  const normalizedBase = base.replace(/^\//, '').replace(/\/$/, '');
  const digested = shorthash.unique(digestable);
  return path.join('/', normalizedBase, digested);
};
