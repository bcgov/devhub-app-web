/*
Copyright 2019 Province of British Columbia

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
import Store from '../utils/Store';

describe('Store Object', () => {
  let ns;

  beforeEach(() => {
    ns = new Store();
  });

  it('creates a store', () => {
    expect(ns instanceof Map).toBe(true);
  });

  it('can set a value in the store', () => {
    ns.set('foo', 'bar');
    expect(ns.get('foo')).toBe('bar');
  });

  it('can check for conflicts', () => {
    expect(ns.checkConflict('foo').set('foo', 'baz'));
  });

  it('can check for conflicts and warn if there is a conflict', () => {
    ns.set('foo', 'bar');
    global.console.warn = jest.fn();
    ns.checkConflict('foo');
    expect(global.console.warn).toHaveBeenCalled();
  });

  it('provides default options', () => {
    expect(ns.options).toBeDefined();
  });

  it('can throw if configured to do so on conflict', () => {
    const ns2 = new Store([], { throwOnConflict: true });
    ns2.set('foo', 'bar');

    expect(() => {
      ns2.checkConflict('foo');
    }).toThrow(ns2.options.conflictCb('foo'));
  });

  it('checkConlict is chainable', () => {
    let nextNs = ns.checkConflict('foo');
    expect(nextNs).toBe(ns);
  });
});
