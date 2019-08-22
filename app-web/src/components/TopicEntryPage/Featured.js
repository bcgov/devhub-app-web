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
import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { MarkdownBody } from '../GithubTemplate/common';

// component to render the popular topic markdown file
export const Featured = () => (
  <StaticQuery
    query={graphql`
      query {
        featured: file(relativePath: { eq: "featured.md" }) {
          childMarkdownRemark {
            html
          }
        }
      }
    `}
    render={data => (
      <MarkdownBody dangerouslySetInnerHTML={{ __html: data.featured.childMarkdownRemark.html }} />
    )}
  />
);

export default Featured;
