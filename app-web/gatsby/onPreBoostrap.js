/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// combine all registry files into one for easy querying

const { promisify } = require('util'); //requires node 8.X
const path = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

/**
 * collects all json registry files from a context dir and joins them together into a file
 * @param {Object} options
 * @param {String} options.contextDir the path to the directory of registry files relative to app-web
 */
const joinRegistryFiles = async options => {
  const { contextDir } = options;

  const directoryPath = `../${contextDir}`;
  const files = await readdir(path.resolve(__dirname, directoryPath));
  const filesContent = await Promise.all(
    files
      .filter(f => f !== directoryPath || f !== 'registry')
      .map(f => readFile(path.join(__dirname, directoryPath, f), 'utf-8')),
  );

  const joinedJson = filesContent.reduce((json, fileContent) => {
    // parse into json
    const jsonData = JSON.parse(fileContent);
    // should be a json array and so we can concat
    return json.concat(jsonData);
  }, []);

  // write file back into registry
  await writeFile(
    path.join(__dirname, directoryPath, 'registry.json'),
    JSON.stringify(
      {
        date: Date.now(),
        nodeEnv: process.env.NODE_ENV,
        totalSources: joinedJson.length,
        sources: joinedJson,
      },
      null,
      2,
    ),
  );
};

module.exports = async () => {
  // grab build time configuration for registry process
  const { registry } = JSON.parse(await readFile(path.join(__dirname, `../devhub.config.json`)));
  return await joinRegistryFiles(registry);
};
