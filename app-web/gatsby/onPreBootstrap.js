// used to verify some things about the devhub setup
const features = require('../static/features.json');

const checkIfDynamicSearchIsInUse = () => {
  const { github, documize, rocketchat } = features.dynamicSearch;
  const askingForDynamicSearch = github || documize || rocketchat;
  if (!process.env.GATSBY_SEARCHGATE_API_URL && askingForDynamicSearch) {
    // eslint-disable-next-line no-console
    console.error(`
    Error! You have set dynamic search to be enabled (features.json > dynamicSearch)
    but have not passed a valid value for the GATSBY_SEARCHGATE_API_URL. A test connection is not made to your search gate service, 
    ensure it is up running prior to running this app`);
    process.exit(1);
  }
};

module.exports = () => {
  checkIfDynamicSearchIsInUse();
};
