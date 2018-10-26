//
// Dev Hub
//
// Copyright © 2018 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Patrick Simonian on 2018-10-12.
//
const GITHUB_API = {
  TREE: {
    sha: 'fd0a8ca2b638662d565a20ba2947678e4fd3acee',
    url:
      'https://api.github.com/repos/bcgov/range-web/git/trees/fd0a8ca2b638662d565a20ba2947678e4fd3acee',
    tree: [
      {
        path: '.eslintrc',
        mode: '100644',
        type: 'blob',
        sha: 'c18275f23c101c5bf62ab9a4a332b774db37dfd1',
        size: 857,
        url:
          'https://api.github.com/repos/bcgov/range-web/git/blobs/c18275f23c101c5bf62ab9a4a332b774db37dfd1',
      },
      {
        path: '.gitignore',
        mode: '100644',
        type: 'blob',
        sha: '23565d52b59af65bd5c315562473ad1503b80383',
        size: 374,
        url:
          'https://api.github.com/repos/bcgov/range-web/git/blobs/23565d52b59af65bd5c315562473ad1503b80383',
      },
      {
        path: '.s2i',
        mode: '040000',
        type: 'tree',
        sha: '9c3b4725dd226c2c1d842431676527735969364e',
        url:
          'https://api.github.com/repos/bcgov/range-web/git/trees/9c3b4725dd226c2c1d842431676527735969364e',
      },
      {
        path: '.s2i/bin',
        mode: '040000',
        type: 'tree',
        sha: '7c6076979af44eab33b12e04229aad2df3c6af29',
        url:
          'https://api.github.com/repos/bcgov/range-web/git/trees/7c6076979af44eab33b12e04229aad2df3c6af29',
      },
      {
        path: '.s2i/bin/assemble',
        mode: '100644',
        type: 'blob',
        sha: '8416cd99d38e00246edc8fea9d5c731d39984932',
        size: 164,
        url:
          'https://api.github.com/repos/bcgov/range-web/git/blobs/8416cd99d38e00246edc8fea9d5c731d39984932',
      },
      {
        path: 'Caddyfile',
        mode: '100644',
        type: 'blob',
        sha: '3d14e2f56345aac8dac9a3be28a810b65273af3c',
        size: 145,
        url:
          'https://api.github.com/repos/bcgov/range-web/git/blobs/3d14e2f56345aac8dac9a3be28a810b65273af3c',
      },
    ],
  },
  FILE: {
    name: 'manifest.json',
    path: 'public/manifest.json',
    sha: 'ef19ec243e739479802a5553d0b38a18ed845307',
    size: 317,
    url:
      'https://api.github.com/repos/bcgov/range-web/contents/public/manifest.json?ref=master',
    html_url:
      'https://github.com/bcgov/range-web/blob/master/public/manifest.json',
    git_url:
      'https://api.github.com/repos/bcgov/range-web/git/blobs/ef19ec243e739479802a5553d0b38a18ed845307',
    download_url:
      'https://raw.githubusercontent.com/bcgov/range-web/master/public/manifest.json',
    type: 'file',
    content:
      '{\n  "short_name": "React App",\n  "name": "Create React App Sample",\n  "icons": [\n    {\n      "src": "favicon.ico",\n      "sizes": "64x64 32x32 24x24 16x16",\n      "type": "image/x-icon"\n    }\n  ],\n  "start_url": "./index.html",\n"display": "standalone",\n  "theme_color": "#000000",\n  "background_color": "#ffffff"\n}\n',
    encoding: 'base64',
    _links: {
      self:
        'https://api.github.com/repos/bcgov/range-web/contents/public/manifest.json?ref=master',
      git:
        'https://api.github.com/repos/bcgov/range-web/git/blobs/ef19ec243e739479802a5553d0b38a18ed845307',
      html:
        'https://github.com/bcgov/range-web/blob/master/public/manifest.json',
    },
  },
  FAIL: { 
    message: 'Not Found',
    documentation_url: 'https://developer.github.com/v3',
  },
  IGNORE_FILE: {
    content: 'file1 file2 file3',
  },
};

const PROCESSED_FILE = {
  name: 'README.md',
  path: 'components/header/README.md',
  sha: '123asdlfjasdf123',
  size: 2562,
  url:
    'https://api.github.com/repos/bcgov/design-system/contents/components/header/README.md?ref=master',
  html_url:
    'https://github.com/bcgov/design-system/blob/master/components/header/README.md',
  git_url:
    'https://api.github.com/repos/bcgov/design-system/git/blobs/1b0260c9b456f68d0443d0194ea84ed76e3d3041',
  download_url:
    'https://raw.githubusercontent.com/bcgov/design-system/master/components/header/README.md',
  type: 'file',
  content:
    '---\nsomething: {\n a: true\n}\ndescription: Headers help users understand what the content of the page is about and provides a quick, organized way toreach the main sections of a website.\n---\n# Header\n\nHeaders help users understand what the content of the page is about and provide a quick, organized way to reach the main sections of a website. They appear at the top of a page, above the main body text.\n\n### Required\n\n## Visual\n\n![Screenshot][screenshot]\n\n## Use This For\n\nAll public facing online BC Government content and services.\n\n## Don\'t Use This For\n\nNon BC Government online content or services\n\nConsider using an extended header if you have more sections in your website or if you have complex sections that require the use of a mega menu.\n\n## Rationale\n\nThis header is the most up-to-date versionmeeting all government standards, branding, and accessibility requirements.\n\n## Behaviour\n\n1. Clicking on BC Government logo links back to homepage\n2. Site title reduces through three increments as browser window gets smaller\n3. After third increment site title disappears completely\n4. BC Gov logo does not change size or disappear as browser window gets smaller\n\n## Accessibility\n\nThis header has been built and successfully tested for the following\n\nColour Impairment\nGrayscale\nKeyboard Accessibility\nScreen Readers\nTab Navigation\n\n## Code\n\nFor fonts and a standard browser reset include the following links in the `<header>` of your page.\n\n```html\n<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap-reboot.min.css" rel="stylesheet">\n<link href="https://fonts.googleapis.com/css?family=PT Sans" rel="stylesheet">\n```\n\n### HTML\n\n```html\n<header>\n  <div class="banner">\n      <a href="https://gov.bc.ca" alt="British Columbia">\n        <img src="../assets/images/logo-banner.png" alt="logo" />\n      </a>\n      <h1>HelloBritish Columbia</h1>\n  </div>\n  <div class="other">\n    <!-- This place is for anything that needs to be right aligned beside the logo. -->\n    &nbsp;\n  </div>\n  </div>\n</header>\n```\n    \n### CSS\n\n```css\nheader {\n  background-color: #036;\n  border-bottom: 2px solid #fcba19;\n  padding: 0 65px 0 65px;\n  color: #fff;\n  display: flex;\n  height: 65px;\n}\n\nheader h1 {\n  font-family: \'PT Sans\';\n  font-weight: normal;  /* 400 */\n  margin: 5px 5px 0 18px;\n  visibility: hidden;\n}\n\nheader .banner {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  margin: 0 10px 0 0;\n}\n\nheader .other {\n  display: flex;\n  flex-grow: 1;\n}\n```\n\n_Last Updated: 2018-10-19_\n\n[screenshot]: images/header.png "Screenshot"\n',
  encoding: 'base64',
  _links: {
    self:
      'https://api.github.com/repos/bcgov/design-system/contents/components/header/README.md?ref=master',
    git:
      'https://api.github.com/repos/bcgov/design-system/git/blobs/1b0260c9b456f68d0443d0194ea84ed76e3d3041',
    html:
      'https://github.com/bcgov/design-system/blob/master/components/header/README.md',
  },
  metadata: {
    sourceName: 'Design System',
    source: 'design-system',
    owner: 'bcgov',
    name: 'README',
    fileType: 'Markdown',
    fileName: 'README.md',
    mediaType: 'text/markdown',
    extension: 'md',
  },
};
module.exports = {
  GITHUB_API,
  PROCESSED_FILE,
};
