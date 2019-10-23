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
import rehypeReact from 'rehype-react';
import { graphql } from 'gatsby';
import Layout from '../hoc/Layout';
import { SubwayLine } from '../components/Journey';
import Actions from '../components/GithubTemplate/Actions/Actions';
import { MarkdownBody, Main } from '../components/GithubTemplate/common';
import ComponentPreview from '../components/ComponentPreview/ComponentPreview';
import withNode from '../hoc/withNode';
import Masthead from '../components/GithubTemplate/Masthead/Masthead';
import { reduceJourneyToSubwayLine } from '../utils/helpers';
import { JOURNEY } from '../constants/ui';

export const JourneyDetailPage = ({
  data: {
    journeyRegistryJson: { title, connectsWith },
    githubRaw,
  },
  location,
}) => {
  const previewWithNode = withNode(githubRaw)(ComponentPreview);

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: { 'component-preview': previewWithNode },
  }).Compiler;

  const [owner, repo] = githubRaw.html_url.replace('https://github.com/', '').split('/');

  const originalSource = githubRaw.html_url;
  const { href } = location;
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
            {renderAst(githubRaw.childMarkdownRemark.htmlAst)}
            <Actions
              repo={repo}
              owner={owner}
              pageTitle={title}
              originalSource={originalSource}
              devhubPath={href}
            />
          </MarkdownBody>
        </Main>
      </div>
    </Layout>
  );
};

export const journeyQuery = graphql`
  query devhubJourneyGithub($id: String!, $githubId: String!) {
    journeyRegistryJson(id: { eq: $id }) {
      title: name
      connectsWith {
        path
        fields {
          title
        }
      }
    }
    githubRaw(id: { eq: $githubId }) {
      name
      id
      html_url
      childMarkdownRemark {
        htmlAst
      }
      fields {
        title
        description
        pagePaths
      }
    }
  }
`;

export default JourneyDetailPage;
