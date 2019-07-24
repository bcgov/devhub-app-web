## How Nodes are Connected

All nodes leveraged in the Devhub maintain a standard set of fields ([see card spec](./devhubCardSpec.md)).

Nodes are connected to each other by a _resolver_ called ___connectsWith___. The resolution is of type
`ConnectedNode`. Take a look at `gatsby/createSchemaCustomizatiion.js` for more details. 

Right now the only nodes that maintain connections are Topic Nodes. This is based on two routines. 
One routine establishes connections based on the registry files. Any sources inside of a registry file
are maintained as connected via a few mechanisms found in the `gatsby/createNode.js` file (see `node.fields.topics`)

The second routine is one specifically for __Events__. Eventbrite and Meetup nodes are provided `node.fields.topics = ['Events Topic']`