import React, { Component } from 'react';
// import YAML from 'js-yaml';
import shortid from 'shortid';
import { connect } from 'react-redux';
import * as actions from '../store/actions/actions';
import { Flag } from 'flag';
import { groupBy } from '../utils/dataMassager';
import { GITHUB_ISSUES_ROUTE } from '../constants/routes';
// local components
import Layout from '../hoc/Layout';
import PrimaryFilter from '../components/PrimaryFilter/PrimaryFilter';
import Cards from '../components/Cards/Cards';
import styles from './index.module.css';
import CardFilterButton from '../components/CardFilterButton/CardFilterButton';

export class Index extends Component {
  componentDidMount() {
    // flatted nodes from graphql
    const nodes = this.props.data.allDevhubSiphon.edges.map(n => n.node);
    this.props.loadSiphonNodes(nodes);
  }

  render() {
    const { nodes, location: { pathname }, menuToggled, toggleMenu } = this.props;
    let mappedSiphonNodes = [];
    if (nodes && nodes.length) {
      mappedSiphonNodes = nodes
        .filter(node => node.childMarkdownRemark && !node.childMarkdownRemark.frontmatter.pageOnly)
        .map(node => ({
          ...node.unfurl,
          resourcePath: node.resource.path,
          sourceName: node.source.displayName,
          sourcePath: node.source.sourcePath,
          resourceType: node.resource.type,
          owner: node.owner,
          repository: node.source.name,
        }));
    }

    // const cards = mappedSiphonNodes.length > 0 ? <Cards cards={mappedSiphonNodes} topic='Everything'/> : <div>Loading</div>;
    // console.log(mappedSiphonNodes);
    //   .map(siphonNode => ({
    //     ...siphonNode,
    //     title: siphonNode.childMarkdownRemark.frontmatter.title,
    //     description: siphonNode.childMarkdownRemark.frontmatter.description,
    //   }));

    const groupedSiphonData = groupBy(mappedSiphonNodes, 'sourceName');
    const SiphonResources = groupedSiphonData.map(ghData => (
      <Cards key={shortid.generate()} topic={ghData.sourceName} cards={ghData.data} />
    ));

    return (
      <Layout showHamburger hamburgerClicked={toggleMenu}>
        <Flag name="features.sourceFiltering">
          <PrimaryFilter />
          {menuToggled ? <PrimaryFilter mobile /> : null}
        </Flag>

        <main role="main" className={[styles.Main, 'container'].join(' ')}>
          <section className="jumbotron text-center">
            <h1 className="jumbotron-heading">Welcome.</h1>

            <h3> We are here to help.</h3>

            <p className="lead">
              This is the front door to the developer community of the BC Government. The aim of the
              DevHub is to help developers and digital product teams learn new skills and discover
              resources to use on their journeys of creating amazing applications for government.
            </p>
            <p>
              In the future, we plan to offer a variety of cool and useful ways to organize and
              navigate DevHub resources. For now, you can tell us who you are below and we'll tailor
              the set of resources shown just for you.
            </p>
            <div className={'d-flex justify-content-center align-items-center'}>
              <CardFilterButton
                filterByProperty={'attributes.persona'}
                filterByValue={'Developer'}
                className={['btn btn-outline-primary', styles.PersonaButton].join(' ')}
              >
                I'm a Developer
              </CardFilterButton>
              <CardFilterButton
                filterByProperty={'attributes.persona'}
                filterByValue={'Designer'}
                className={['btn btn-outline-success', styles.PersonaButton].join(' ')}
              >
                I'm a Designer
              </CardFilterButton>
            </div>

            <blockquote className="blockquote">
              <p className="mb-0">Thanks for visiting!</p>
              <footer className="blockquote-footer">The DevHub Team.</footer>
            </blockquote>

            <p className="text-muted">
              PS. If you’d like to comment, offer a suggestion or ask a question you can find us by
              opening an issue in our <a href={GITHUB_ISSUES_ROUTE}>GitHub</a> repository.
            </p>
          </section>
          <div className={styles.CardContainer}>
            <Flag name="features.githubResourceCards">{SiphonResources}</Flag>
          </div>
          {/*<Flag name="features.pathfinderResourceCards">{pathfinderResources}</Flag>*/}
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
          attributes {
            persona
          }
          source {
            displayName
            sourcePath
            type
            name
          }
          owner
          resource {
            path
            type
          }
          unfurl {
            title
            description
            type
            image
            author
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
    menuToggled: state.ui.mainNavigationToggled,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSiphonNodes: nodes => dispatch(actions.loadSiphonNodes(nodes)),
    toggleMenu: () => dispatch(actions.toggleMainNavigation()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
