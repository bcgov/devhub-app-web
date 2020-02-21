describe('Validating that slugs do not conflict', () => {
  it('Has no GithubRaw Nodes that Conflict', () => {
    cy.log('querying graphql api for nodes that conflict');
    cy.request('POST', '/___graphql', {
      query: `{allGithubRaw(filter: {_conflictsFound: {eq: true}}) {
          edges {
            node {
              id
              html_url
              fields {
                slug
              }
            }
          }
        }}`,
    })
      .then(request => {
        const { edges } = request.body.data.allGithubRaw;
        return edges;
      })
      .each(({ node }) => {
        cy.log(`GithubRaw Node Slug Conflict. 
        Slug: ${node.fields.slug}
        Path: ${node.html_url}
        `);
      })
      .should('have.length', 0);
  });
});
