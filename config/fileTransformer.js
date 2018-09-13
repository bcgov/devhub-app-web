// taken from creat-react-app ejected scripts
const path = require('path');

module.exports = {
  process(src, filename) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';'; // eslint-disable-line
  },
};
