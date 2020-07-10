module.exports = ({ actions }) => {
  const { createTypes } = actions;
  // this definition is used by any createResolvers function that links one devhub resource to another
  // for now this type definition is the bare minimum needed to generate a order set of links in a navigation menu
  // id = id of the connected node
  // position = a arbitrary number used to sort the set of nodes
  // name = is the name of the link
  // path = the link href
  // resourceType = the resource type of the nodes
  const typeDefs = `
    type ConnectedNode {
      fields: ConnectedNodeFieldSet
      path: String
      id: String! 
    }
    type frontMatterLabelSet {
      app: String
      ministry: String
      team: String
    }

    type ConnectedNodeFieldSet {
      position: String
      title: String
      description: String
      labels: frontMatterLabelSet
      tags: [String]
      path: String
      resourceType: String
      standAlonePath: String
    }
    type ConnectedStopNode {
      fields: ConnectedNodeFieldSet
      path: String
      id: String!
      _type: String!
      connectsWith: [ConnectedNode]
    }
    type GithubRaw implements Node {
      _conflictsFound: Boolean
    }
    type DevhubSiphon implements Node {
      fields: ConnectedNodeFieldSet
    }
  `;

  createTypes(typeDefs);
};
