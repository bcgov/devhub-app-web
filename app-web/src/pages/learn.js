import React, { Component } from 'react';
import NavigationalItems from '../components/Navigation/NavigationalItems/NavigationalItems';
// eslint-disable-next-line
class Learn extends Component {
  render() {
    const {
      data: { allSitePage: { edges } },
      location: { pathname },
    } = this.props;
    let path = pathname;
    path += pathname.charAt(pathname.length - 1) !== '/' ? '/' : '';
    // get only links relative to this page
    const links = edges
      .filter(e => {
        // filter out any paths that do not have currentpath in it as well as the
        // current path itself
        const nodePath = e.node.fields.path;
        return nodePath.indexOf(path) >= 0 && nodePath !== path;
      })
      .map(l => ({
        title: l.node.fields.linkName,
        link: l.node.fields.path,
        description: '',
        icon: 'coffee',
      }));
    return (
      <main role="main" className="main">
        <h1>Learn</h1>
        <NavigationalItems navItems={links} />
      </main>
    );
  }
}

export const LearnQuery = graphql`
  query LearnQuery {
    allSitePage(filter: { id: { ne: "SitePage /dev-404-page/" } }) {
      edges {
        node {
          id
          path
          fields {
            linkName
            path
          }
        }
      }
    }
  }
`;
export default Learn;
