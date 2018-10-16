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
};

module.exports = {
  GITHUB_API,
};
