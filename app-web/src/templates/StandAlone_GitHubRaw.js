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
import slugify from 'slugify';
import { Link } from '../components/UI/Link';

const ContentDiv = styled.div`
  padding-top: 10px;
`;

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
  font-size: 26px;
`;

export const StandAloneGitHubRawResource = ({ data: { githubRaw } }) => {
  const renderAst = new rehypeReact({
    createElement: React.createElement,
  }).Compiler;

  //create pill to show resource type and links out to the corresponding resource type page
  let resourceTypePill = (
    <PillLink href={`/${slugify(githubRaw.fields.resourceType).toLowerCase()}`} key={githubRaw.id}>
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
        <PillLink href={`/${topic.fields.slug}/${githubRaw.fields.slug}`} key={topic.id}>
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
    //this needs to link out to search results with the given persona
    personaPills = personas.map(persona => {
      return (
        <PillLink key={persona}>
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

  return (
    <Layout>
      <Header>
        <HeaderTitle>Resource Information</HeaderTitle>
        <PillDiv>{resourceTypePill}</PillDiv>
        <PillDiv>{topicPills}</PillDiv>
        <PillDiv>{personaPills}</PillDiv>
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
      id
      fields {
        slug
        personas
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
        frontmatter {
          labels
        }
      }
    }
  }
`;

export default StandAloneGitHubRawResource;
