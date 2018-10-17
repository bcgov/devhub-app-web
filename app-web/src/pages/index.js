import React from 'react';
import YAML from 'js-yaml';
import shortid from 'shortid';
import { groupBy } from '../utils/dataMassager';
import { GITHUB_ISSUES_ROUTE } from '../constants/routes';
// local components
import Layout from '../hoc/Layout';
import Resource from '../components/Resource/Resource';

const Index = ({ data: { pathfinder, allSourceDevhubGithub }}) => {

  const yamlData = YAML.safeLoad(pathfinder.data.organization.repository.resources.yaml);
  const groupedData = groupBy(yamlData.entries, 'category');
  const pathfinderResources = groupedData.map(gd => (
    <Resource
      key={shortid.generate()}
      category={gd.category}
      resources={gd.data}
    />
  ))

  return (
    <Layout>

      <main role="main" className="main">
        <h1>Welcome</h1>
        <h2>
          <em>We are here to help</em>
        </h2>
        <p className="para">
          This is the front door to the developer community of the BC Government.
          We’re embarking on a journey to help developers learn new skills, discover
          resources and create amazing applications for government.
        </p>
        <p className="para">
          This is our first release and we’re planning to have new material added to
          this site every sprint (2 weeks), so please visit often to check our
          progress.
        </p>
        <p className="para">
          {' '}
          If you’d like to comment, offer a suggestion or ask a question you can
          find us by opening an issue in our{' '}
          <a href={GITHUB_ISSUES_ROUTE}>github.com</a> repository.
        </p>

        { pathfinderResources }
      </main>
    </Layout>
  );
}


export const resourceQuery = graphql`
  query resourceQuery {
    pathfinder: githubData {
      data {
        organization {
          repository {
            resources {
              yaml: text
            }
          }
        }
      }
    }
    allSourceDevhubGithub {
      edges {
          node {
              id,
              name,
              fileName,
              fileType,
              owner,
              path,
              source,
              sourceName,
              childMarkdownRemark {
                frontmatter {
                  title,
                },
              }
          }
      }
    }
  }
`;

export default Index;
