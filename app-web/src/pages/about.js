import React from 'react';
import PropTypes from 'prop-types';
import 'github-markdown-css';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import Main from '../components/Page/Main';
import Layout from '../hoc/Layout';

const MarkdownCSS = css`
  blockquote {
    padding: 10px;
    background-color: #f0f0f0;
    font-size: 14px;
    font-style: oblique;
    border-left: 2px solid #38588a;
    margin-left: 5px;
  }
`;

const Header = styled.header`
  text-align: center;
  background-color: #fff;
  padding: 22px 0 0;
  border-bottom: 2px solid #003366;
  margin-bottom: 15px;
  max-width: 800px;
  margin: 15px auto;
  h4 {
    line-height: 1.5em;
    font-size: 16px;
    color: #444;
  }
`;

const About = ({
  data: {
    file: {
      childMarkdownRemark: { html, frontmatter },
    },
  },
}) => {
  return (
    <Layout>
      <Header>
        <h1>{frontmatter.title}</h1>
        <h4>{frontmatter.subtitle}</h4>
      </Header>
      <Main
        css={css`
          margin: 0 auto;
          ${MarkdownCSS};
        `}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Main>
    </Layout>
  );
};

export const AboutQuery = graphql`
  query AboutQuery {
    file(relativePath: { eq: "devhub.md" }) {
      childMarkdownRemark {
        html
        frontmatter {
          title
          subtitle
        }
      }
    }
  }
`;

export default About;
