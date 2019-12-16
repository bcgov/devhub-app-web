// eslint-disable-next-line no-unused-vars
const mockalgoliasearch = jest.requireActual('algoliasearch/lite');
function searchClient() {
  return {
    applicationID: 'MXGA324EDW',
    initIndex() {
      return {
        search() {
          return Promise.resolve({
            hits: [{ field: { title: 'foo' } }, { field: { title: 'apple' } }],
          });
        },
      };
    },
  };
}
module.exports = searchClient;
