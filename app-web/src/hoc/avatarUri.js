/*
Copyright 2019 Province of British Columbia

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
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import Parser from 'uri-parser';

const SOURCE_TYPE_SRC_MAPPING = {
  facebook: 'facebookId',
  github: 'githubHandle',
  google: 'googleId',
  gravatar: 'email',
  skype: 'skypeId',
  icon: 'icon',
  src: 'src',
  instagram: 'instagramId',
  vkontakte: 'vkontakteId',
};

/**
 * this is a wrapper on react-avatar which allows passing in one 'argument' that maps correctly
 * to the many different variations of configurations for the react avatar component
 * @param {Object} props expects a prop uri which is a string in the shape of
 * namespace://value?avatarprop1=avatarprop1value
 * eg: const uri = github://patricksimonian?className=myClass
 * <UriAvatar uri={uri} allowURIProps />
 */
const UriAvatar = props => {
  const { protocol, host, queryKey } = Parser.parse(props.uri);
  const idKey = SOURCE_TYPE_SRC_MAPPING[protocol];
  let uriProps = {
    [idKey]: host,
  };

  // if allowing uri search strings to be passed down as props
  if (props.allowURIProps) {
    uriProps = {
      ...uriProps,
      ...queryKey,
    };
  }

  return <Avatar {...props} {...uriProps} />;
};

UriAvatar.propTypes = {
  uri: PropTypes.string.isRequired,
  allowURIProps: PropTypes.bool,
};

UriAvatar.defaultProps = {
  allowURIProps: false,
};

export default UriAvatar;
