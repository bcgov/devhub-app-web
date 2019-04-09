//
// Dev Hub
//
// Copyright © 2019 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import React from 'react';

import Layout from '../hoc/Layout';

const TemplatePlaceholder = ({ location: { pathname } }) => (
  <Layout>
    <h1>This page has been replaced by a temporary placeholder.</h1>
    <p>
      For development purposes the page found at {pathname} was not loaded. This message, ofcourse
      should only be visible in development mode. If you are seeing this message under the URL
      https://developer.gov.bc.ca then there is a problem that needs attention!
    </p>
    <hr />
    <p>
      If you are in development mode and are expecting to see a page at {pathname} then this means
      something in the gatsby config is not set up correctly. Most likely you are missing or have an
      invalid api key to one of the many gatsby source plugins the Devhub utilizes
    </p>
  </Layout>
);

export default TemplatePlaceholder;
