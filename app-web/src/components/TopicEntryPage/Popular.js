import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { MarkdownBody } from '../GithubTemplate/common';

// component to render the popular topic markdown file
export const Popular = () => (
  <StaticQuery
    query={graphql`
      query {
        popular: file(relativePath: { eq: "popular.md" }) {
          childMarkdownRemark {
            html
          }
        }
      }
    `}
    render={data => (
      <MarkdownBody dangerouslySetInnerHTML={{ __html: data.popular.childMarkdownRemark.html }} />
    )}
  />
);

export default Popular;
