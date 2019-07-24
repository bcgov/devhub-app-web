module.exports = ({ actions }) => {
  const { createTypes } = actions;
  // this definition is used by any createResolvers function that links one devhub resource to another
  // for now this type definition is the bare minimum needed to generate a order set of links in a navigation menu
  // id = id of the connected node
  // position = a arbitery number used to sort the set of nodes
  // name = is the name of the link
  // path = the link href
  // resourceType = the resource type of the nodes
  const typeDefs = `
    type ConnectedNode {
      fields: ConnectedNodeFieldSet
      path: String
      id: String! 
    }
    type ConnectedNodeFieldSet {
      position: String
      title: String
      description: String
      image: String
      labels: [String]
      tags: [String]
      path: String
      resourceType: String
    }
  `;

  createTypes(typeDefs);
};
