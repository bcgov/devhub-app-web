const chalk = require('chalk');

const siphonMessages = (() => {
  const warning = chalk.yellow('\nWARNING from Siphon! ---');
  // eslint-disable-next-line no-unused-vars
  const error = chalk.red('\nERROR from Siphon! ---');
  const advisory = chalk.cyan('\nADVISORY from Siphon! ---');
  const registrationInstructions = chalk.green(
    'https://github.com/bcgov/devhub-app-web/blob/master/docs/registerRepo.md',
  );

  const unfurlLacksInfo = url => chalk`
    ${warning} the URL {green ${url}}
    Was unfurled and lacked metadata.
    In addition there was little configuration in the registry to provide the missing metadata. 
    Good Siphon Resources will have atleast a {cyan.bold title} and a {cyan.bold description} 
    (adding an image as well would be awesome too).
    You can add properties to overide unfurls.
    -- instructions are found here ${registrationInstructions}\n`;

  const resourceIgnored = resource => chalk`
    ${advisory} The resource {green.bold ${resource}} has been flagged as
    {green.bold 'ignore'} and will not have a Siphon Node created for it`;

  const collectionSlugConflict = slug => chalk`
    ${warning} The collection slug {yellow.bold ${slug}} has already been used.
    This is a warning message. In future versions we may remove your collection
    on conflicts such as this.`;

  const markdownSlugConflict = (slug, conflictingSummary, currentSummary) => chalk`
    ${warning} markdown file slug conflict {red.bold (slug: ${slug})} 
    the following markdown file ---
    {green ${conflictingSummary}}
    has a naming conflict in the slug that is being used to produce a gatsby page. 
    The slug is currently in use by this markdown file ---
    {green ${currentSummary}}
    {cyan.bold This may cause odd issues for links to the gatsby page if not rectified.}
    detailed stack below..`;

  return {
    unfurlLacksInfo,
    resourceIgnored,
    collectionSlugConflict,
    markdownSlugConflict,
  };
})();

module.exports = siphonMessages;
