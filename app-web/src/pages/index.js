import React, { Component } from 'react';
// import YAML from 'js-yaml';
import shortid from 'shortid';
import { connect } from 'react-redux';
import * as actions from '../store/actions/actions';
import { Flag } from 'flag';
import { groupBy, flattenAllSourceDevhubGithub } from '../utils/dataMassager';
import { GITHUB_ISSUES_ROUTE } from '../constants/routes';
// local components
import Layout from '../hoc/Layout';
import Cards from '../components/Cards/Cards';
import styles from './index.module.css';

export class Index extends Component {
  componentDidMount() {
    // flatted nodes from graphql
    const nodes = this.props.data.allDevhubSiphon.edges.map(n => n.node);
    this.props.loadSiphonNodes(nodes);
  }

  render() {
    const { nodes } = this.props;

    // const mappedSiphonNodes = siphonNodes
    //   .filter(siphonNode => !siphonNode.childMarkdownRemark.frontmatter.pageOnly)
    //   .map(siphonNode => ({
    //     ...siphonNode,
    //     title: siphonNode.childMarkdownRemark.frontmatter.title,
    //     description: siphonNode.childMarkdownRemark.frontmatter.description,
    //   }));

    // const groupedSiphonData = groupBy(mappedSiphonNodes, 'sourceName');
    // const SiphonResources = groupedSiphonData.map(ghData => (
    //   <Cards
    //     key={shortid.generate()}
    //     topic={ghData.sourceName}
    //     sourcePath={ghData.data[0].sourcePath}
    //     cards={ghData.data}
    //   />
    // ));

    return (
      <Layout>
        <main role="main" className={styles.Main}>
          <h1>Welcome</h1>
          <h2>
            <em>We are here to help</em>
          </h2>
          <p>
            This is the front door to the developer community of the BC Government. We’re embarking
            on a journey to help developers learn new skills, discover resources and create amazing
            applications for government.
          </p>
          <p>
            If you’d like to comment, offer a suggestion or ask a question you can find us by
            opening an issue in our <a href={GITHUB_ISSUES_ROUTE}>github.com</a> repository.
          </p>
          {/* <Flag name="features.githubResourceCards">{SiphonResources}</Flag> */}
          {/* <Flag name="features.pathfinderResourceCards">{pathfinderResources}</Flag> */}
        </main>
      </Layout>
    );
  }
}

// this query automagically gets passed in as a 'data' prop into
// the above component
/** query removed at this time
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
 */
export const resourceQuery = graphql`
  query resourceQuery {
    allDevhubSiphon(filter: { internal: { mediaType: { eq: "text/markdown" } } }) {
      edges {
        node {
          id
          title: name
          source {
            displayName
            sourcePath
            type
          }
          resourcePath
          unfurl {
            title
            description
            type
          }
          childMarkdownRemark {
            frontmatter {
              pageOnly
            }
          }
        }
      }
    }
  }
`;

const mapStateToProps = state => {
  return {
    nodes: state.siphon.filteredNodes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSiphonNodes: nodes => dispatch(actions.loadSiphonNodes(nodes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
