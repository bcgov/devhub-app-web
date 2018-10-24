/*
Copyright 2018 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/

const path = require('path');
const jsdom = require('jsdom'); // eslint-disable-line

const { JSDOM } = jsdom;

/**
 * based on the files location within the repo
 * the relative asset path declared in the file
 * and the repo
 * this will return an absolute location of the asset
 * path
 * @param {String} filePath 
 * @param {String} repoURI 
 * @param {String} relativePath 
 * @returns {String} the absolute version of the relative asset path
 */
const assetRelativePathToAbsolute = (filePath, repoURI, relativePath) => {
    // get directory path from filePath
    try {
        const pathToFile = path.parse(filePath).dir;
        const absoluteAssetPath = repoURI + path.resolve(`${pathToFile}`, relativePath);
        return absoluteAssetPath;
    } catch(e) {
        return relativePath;  
    }
    
};

const isRelativePath = path => /^\.\.?\//.test(path);

/**
 * sifts over transformed markdown content (which should be html by now)
 * and replace any relative asset links in hrefs or src attributes with
 * absolute versions
 * @param {String} filePath 
 * @param {String} repoURI 
 * @param {String} content 
 */
const convertRelativePathsToAbsolute = (filePath, repoURI, content) => {
    // jsdomify content
    const dom = new JSDOM(content);
    const { window: { document } } = dom;
    const anchors = document.getElementsByTagName('a');
    const images = document.getElementsByTagName('img');
    const videos = document.getElementsByTagName('video');

    const assetTags = Array.from(anchors)
        .concat(Array.from(images))
        .concat(Array.from(videos));
    // loop over asset tags and relace hrefs or srcs if they are relative
    assetTags.forEach(assetTag => {
        const attributeType = assetTag.tagName.toLocaleLowerCase() === 'a' ? 'href' : 'src'; 
        // does assetTag have a src or href attribute?
        const assetPath = assetTag.getAttribute(attributeType);
        if(isRelativePath(assetPath)) {
            const absoluteAssetPath = assetRelativePathToAbsolute(filePath, repoURI, assetPath);
            assetTag.setAttribute(attributeType, absoluteAssetPath);
        }
    });
    return document.getElementsByTagName('body')[0].innerHTML;
};

module.exports = {
    assetRelativePathToAbsolute,
    isRelativePath,
    convertRelativePathsToAbsolute,
};