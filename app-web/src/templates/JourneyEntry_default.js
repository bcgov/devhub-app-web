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
import { graphql } from 'gatsby';
import rehypeReact from 'rehype-react';
import Layout from '../hoc/Layout';
import { SubwayLine } from '../components/Journey';
import Masthead from '../components/GithubTemplate/Masthead/Masthead';
import { reduceJourneyToSubwayLine } from '../utils/helpers';
import { MarkdownBody, Main } from '../components/GithubTemplate/common';
import { JOURNEY } from '../constants/ui';

export const JourneyPage = ({
  data: {
    journeyRegistryJson: { title, connectsWith },
    markdownRemark,
  },
}) => {
  const renderAst = new rehypeReact({
    createElement: React.createElement,
  }).Compiler;
  return (
    <Layout>
      <div>
        <Masthead
          type="Journey"
          title={title}
          render={() => (
            <SubwayLine
              color={JOURNEY}
              stops={reduceJourneyToSubwayLine(connectsWith)}
              style={{ maxWidth: '1000px', paddingTop: '80px', paddingBottom: '80px' }}
            />
          )}
        />
        <Main style={{ flexDirection: 'column' }}>
          <MarkdownBody>
            {/* 
              if there is a tag in the markdown <component-preview> 
              the renderAst will drop in the rehype component
              otherwise if not tag exists it is biz as usual
            */}
            {renderAst(markdownRemark.htmlAst)}
          </MarkdownBody>
        </Main>
      </div>
    </Layout>
  );
};

export const journeyQuery = graphql`
  query devhubJourney($id: String!, $name: String!) {
    journeyRegistryJson(id: { eq: $id }) {
      title: name
      connectsWith {
        path
        fields {
          title
        }
      }
    }
    markdownRemark(frontmatter: { id: { eq: $name } }) {
      htmlAst
    }
  }
`;

export default JourneyPage;
