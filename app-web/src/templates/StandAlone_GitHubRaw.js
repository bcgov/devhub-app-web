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
import Actions from '../components/GithubTemplate/Actions/Actions';
import { withPadding, MarkdownBody } from '../components/GithubTemplate/common';
import slugify from 'slugify';
import { Link } from '../components/UI/Link';
import { SEO } from '../components/SEO/SEO';

const PillDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  :p {
    margin: auto;
  }
`;

const IconPill = styled(Pill)`
  :hover {
    cursor: pointer;
  }
`;

const PillLink = styled(Link)`
  margin: 0;
  padding: 0;
  text-decoration: none;
  text-decoration-color: #1a5a96;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Header = styled.header`
  background-color: #f1f1f1;
  border-bottom: 1px solid #ccc;
  width: 100%;
  ${withPadding}
`;
const HeaderTitle = styled.div`
  bottom-margin: 10px;
  padding-left: 5px;
  font-size: 20px;
  @media only screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const StandAloneGitHubRawResource = ({ data: { githubRaw } }) => {
  const renderAst = new rehypeReact({
    createElement: React.createElement,
  }).Compiler;

  //create pill to show resource type and links out to the corresponding resource type page
  let resourceTypePill = (
    <PillLink to={`/${slugify(githubRaw.fields.resourceType).toLowerCase()}`} key={githubRaw.id}>
      <IconPill
        resourceType={githubRaw.fields.resourceType}
        label={githubRaw.fields.resourceType}
        variant="filled"
        deletable={false}
      />
    </PillLink>
  );

  //get the topics which this resource is a part of
  let topics = githubRaw.fields.topics;
  let topicPills = [];
  //if there are topics, create pills which link out to that topics page
  if (topics) {
    topicPills = topics.map(topic => {
      return (
        <PillLink to={`/${topic.fields.slug}/${githubRaw.fields.slug}`} key={topic.id}>
          <IconPill otherIcon={'topic'} label={topic.name} variant="filled" deletable={false} />
        </PillLink>
      );
    });
  }

  let personaPills = [];
  //get personas and filter out any blank strings
  let personas = githubRaw.fields.personas.filter(ifNotBlank => ifNotBlank);
  //if there are personas, create pills which link out to a search of resources with that persona
  if (personas) {
    personaPills = personas.map(persona => {
      //links to the homepage search, with a query showing only resources of the given persona type
      const linkString = `/?q=personas:${persona}`;
      return (
        <PillLink to={encodeURI(linkString)} key={persona}>
          <IconPill label={persona} otherIcon={'persona'} variant="filled" deletable={false} />
        </PillLink>
      );
    });
  }

  /* for later
  let labelPills = [];
  //get labels and slice array to only have 3 (could get a bit overrun)
  let labels = githubRaw.childMarkdownRemark.frontmatter.labels;
  //if there are labels, create pills which link out to a search of resources with that label
  if (labels) {
    labelPills = labels.slice(0, 3).map(label => {
      return (
        //this needs to link out to search results with the given tag
        <PillLink key={label}>
          <IconPill label={label} otherIcon={'label'} variant="filled" deletable={false} />
        </PillLink>
      );
    });
  }*/
  const {
    html_url,
    fields: { standAlonePath, title },
  } = githubRaw;
  const [owner, repo] = html_url.replace('https://github.com/', '').split('/');
  return (
    <Layout>
      <SEO title={title} />
      <Header>
        <HeaderTitle>Resource Information</HeaderTitle>
        <PillDiv>{resourceTypePill}</PillDiv>
        <PillDiv>{topicPills}</PillDiv>
        <PillDiv>{personaPills}</PillDiv>
      </Header>
      <Main>
        <MarkdownBody>
          {renderAst(githubRaw.childMarkdownRemark.htmlAst)}
          <Actions
            repo={repo}
            owner={owner}
            pageTitle={title}
            originalSource={html_url}
            devhubPath={standAlonePath}
          />
        </MarkdownBody>
      </Main>
    </Layout>
  );
};

export const devhubGitHubRawData = graphql`
  query devhubGitHubRawQuery($id: String!) {
    githubRaw(id: { eq: $id }) {
      id
      html_url
      fields {
        slug
        personas
        title
        resourceType
        standAlonePath
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
