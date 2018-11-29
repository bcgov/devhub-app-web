import React, {Component} from 'react';
// import YAML from 'js-yaml';
import shortid from 'shortid';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';
import {Flag} from 'flag';
import {groupBy} from '../utils/dataMassager';
import {GITHUB_ISSUES_ROUTE} from '../constants/routes';
// local components
import Layout from '../hoc/Layout';
import Cards from '../components/Cards/Cards';
import Button from '../components/UI/Button/Button'
import styles from './index.module.css';

export class Index extends Component {
    componentDidMount() {
        // flatted nodes from graphql
        const nodes = this.props.data.allDevhubSiphon.edges.map(n => n.node);
        this.props.loadSiphonNodes(nodes);
    }

    render() {
        const {nodes, location: {pathname}} = this.props;
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
            <Cards
                key={shortid.generate()}
                topic={ghData.sourceName}
                sourcePath={ghData.data[0].sourcePath}
                cards={ghData.data}
            />
        ));
        
        const personaAction =(personaName) => {
            console.log(personaName);
        };

        return (
            <Layout path={pathname}>
                <main role="main" className={styles.Main}>
                    <section className="jumbotron text-center">
                        <div className="container">
                            <h1 className="jumbotron-heading">Welcome.</h1>

                            <h2>We are here to help.</h2>

                            <p className="lead text-muted">This is the front door to the developer community of the BC
                                Government. We’re embarking on a journey to help developers learn new skills, discover
                                resources and create amazing applications for government.
                            </p>
                            <p>
                                To help you find your way around here, tell us who you are below and we'll tailor the set of resources to you.
                            </p>
                            <p>
                                <Button clicked={ personaAction("developer")} className="btn btn-outline-primary">I'm a Developer</Button>
                                <Button clicked={ personaAction("designer")} className="btn btn-outline-success">I'm a Designer.</Button>
                                <Button clicked={ personaAction("product_owner")} className="btn btn-outline-info">I'm a Product Owner.</Button>
                            </p>
                            <p>
                                Thanks for visiting!
                            </p>
                            <p>
                                -- The DevHub Team.
                            </p>

                            <p className="text-muted">
                                PS. If you’d like to comment, offer a suggestion or ask a question you can find us by
                                opening an issue in our <a href={GITHUB_ISSUES_ROUTE}>GitHub</a> repository.
                            </p>
                        </div>
                    </section>
                    <Flag name="features.githubResourceCards">{SiphonResources}</Flag>
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
          source {
            displayName
            sourcePath
            type
            name
          }
          resource {
            path
            type
          }
          unfurl {
            title
            description
            type
            image
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
