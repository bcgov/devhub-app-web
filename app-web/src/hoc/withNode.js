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

Created by Shea Phillips
*/
import React from 'react';

/**
 * Binds a 'node' prop to a component. This is useful when the component is being rendered by a process
 * that disables the ability to attach props at that time of rendering
 * @param {any} node the value you want set as the node prop
 * @returns {Function} this fn takes in your component you want to bind the node prop too
 * usage
 * const componentWithNode = withNode('foo')(Component);
 * ...render
 * <componentWithNode /> node is bound to it**
 */
export default node => WrappedComponent => props => <WrappedComponent {...props} node={node} />;
