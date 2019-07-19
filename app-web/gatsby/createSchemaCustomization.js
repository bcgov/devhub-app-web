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
      id: String! 
      position: String
      name: String
      path: String
      resourceType: String
    }
  `;

  createTypes(typeDefs);
};