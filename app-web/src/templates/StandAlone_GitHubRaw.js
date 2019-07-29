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

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../hoc/Layout';
import { Main } from '../components/Page';
import rehypeReact from 'rehype-react';
import styled from '@emotion/styled';
import Pill from '../components/UI/Pill';
import { withPadding } from '../components/GithubTemplate/common';

const ContentDiv = styled.div`
  padding-top: 10px;
`;
const PillDiv = styled.div`
  padding: 5px 0px;
  width: 50%;
  display: flex;
  flex-direction: row;
  :p {
    margin: auto;
  }
`;

const TopicPill = styled(Pill)`
  margin-top: 0px;
  :hover {
    cursor: pointer;
  }
`;

const Header = styled.header`
  background-color: #f1f1f1;
  border-bottom: 1px solid #ccc;
  width: 100%;
  ${withPadding}
`;

export const StandAloneGitHubRawResource = ({ data: { githubRaw } }) => {
  const renderAst = new rehypeReact({
    createElement: React.createElement,
  }).Compiler;

  let topics = githubRaw.fields.topics;
  let topicPills = [];
  if (topics) {
    topicPills = topics.map(topic => {
      return (
        <a href={`/${topic.fields.slug}/${githubRaw.fields.slug}`} key={topic.id}>
          <TopicPill topic={true} label={topic.name} variant="filled" deletable={false} />
        </a>
      );
    });
  }

  return (
    <Layout>
      <Header>
        <TopicPill
          resourceType={githubRaw.fields.resourceType}
          label={githubRaw.fields.resourceType}
          variant="filled"
          deletable={false}
        />
        <PillDiv>{topicPills}</PillDiv>
      </Header>
      <Main>
        <ContentDiv>{renderAst(githubRaw.childMarkdownRemark.htmlAst)}</ContentDiv>
      </Main>
    </Layout>
  );
};

export const devhubGitHubRawData = graphql`
  query devhubGitHubRawQuery($id: String!) {
    githubRaw(id: { eq: $id }) {
      fields {
        slug
        resourceType
        topics {
          name
          id
          fields {
            slug
          }
        }
      }
      childMarkdownRemark {
        htmlAst
      }
    }
  }
`;

export default StandAloneGitHubRawResource;
