import React from 'react';
import YAML from 'js-yaml';
import shortid from 'shortid';
import { Flag } from 'flag';
import { groupBy, flattenAllSourceDevhubGithub } from '../utils/dataMassager';
import { GITHUB_ISSUES_ROUTE } from '../constants/routes';
// local components
import Layout from '../hoc/Layout';
import Cards from '../components/Cards/Cards';

const Index = ({ data: { pathfinder, allSourceDevhubGithub } }) => {
  const yamlData = YAML.safeLoad(pathfinder.data.organization.repository.resources.yaml);
  // map entries and set paramaters in entries that resource component expects
  const mappedEntries = yamlData.entries.map(entry => ({
    ...entry,
    title: entry.description,
    description: entry.details,
    sourceName: 'Pathfinder',
  }));

  const groupedPathFinderData = groupBy(mappedEntries, 'category');
  const pathfinderResources = groupedPathFinderData.map(gd => (
    <Cards
      key={shortid.generate()}
      topic={gd.category}
      sourcePath={gd.sourcePath}
      cards={gd.data}
    />
  ));
  // flatten out allSourceGithub edges from query
  const devhubGithubNodes = flattenAllSourceDevhubGithub(allSourceDevhubGithub.edges);
  // map out github nodes to have paramaters that are expected by Resource
  const mappedDevhubGithubNodes = devhubGithubNodes.map(dhnode => ({
    ...dhnode,
    title: dhnode.childMarkdownRemark.frontmatter.title,
    description: dhnode.childMarkdownRemark.frontmatter.description,
  }));

  const groupedGithubData = groupBy(mappedDevhubGithubNodes, 'sourceName');
  console.log(groupedGithubData);
  const devhubGithubResources = groupedGithubData.map(ghData => (
    <Cards
      key={shortid.generate()}
      topic={ghData.sourceName}
      sourcePath={ghData.sourcePath}
      cards={ghData.data}
    />
  ));

  return (
    <Layout>
      <main role="main" className="main">
        <h1>Welcome</h1>
        <h2>
          <em>We are here to help</em>
        </h2>
        <p className="para">
          This is the front door to the developer community of the BC Government. We’re embarking on
          a journey to help developers learn new skills, discover resources and create amazing
          applications for government.
        </p>
        <p className="para">
          This is our first release and we’re planning to have new material added to this site every
          sprint (2 weeks), so please visit often to check our progress.
        </p>
        <p className="para">
          {' '}
          If you’d like to comment, offer a suggestion or ask a question you can find us by opening
          an issue in our <a href={GITHUB_ISSUES_ROUTE}>github.com</a> repository.
        </p>
        <Flag name="features.githubResourceCards">{devhubGithubResources}</Flag>
        <Flag name="features.pathfinderResourceCards">{pathfinderResources}</Flag>
      </main>
    </Layout>
  );
};
// this query automagically gets passed in as a 'data' prop into
// the above component
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
          id
          title: name
          sourceName
          sourcePath
          resourcePath
          childMarkdownRemark {
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  }
`;

export default Index;
