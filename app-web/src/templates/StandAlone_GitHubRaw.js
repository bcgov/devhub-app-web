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

Created by Derek Siemens
*/
/*
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../hoc/Layout';
import { Main } from '../components/Page';
import CardHeader from '../components/Cards/Card/CardHeader';
import rehypeReact from 'rehype-react';
import styled from '@emotion/styled';

const PageDiv = styled.div`
  padding-top: 20px;
`;
const ContentDiv = styled.div`
  padding-top: 10px;
`;

export const StandAloneGitHubRawResource = ({ data: { GitHubRawNode } }) => {
  const isExternal = false;
  const renderAst = new rehypeReact({
    createElement: React.createElement,
  }).Compiler;

  return (
    <Layout>
      <Main>
        <PageDiv>
          <CardHeader type={GithubRawNode.fields.resource.type} linksToExternal={isExternal} />
          <ContentDiv>{renderAst(GithubRawNode.childMarkdownRemark.htmlAst)}</ContentDiv>
        </PageDiv>
      </Main>
    </Layout>
  );
};

GRAPH QL QUERY FOR DATA HERE 
export const devhubGitHubRawData = graphql`
  query devhubGitHubRawQuery($id: String!) {
    GitHubRawNode(id: { eq: $id }) {
      edges {
        node {

        }
      }
    }
  }
`;

export default StandAloneGitHubRawResource;
*/
