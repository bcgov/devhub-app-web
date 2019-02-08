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

const UriAvatar = props => {
  const { protocol, host, queryKey } = Parser.parse(props.uri);
  const idKey = SOURCE_TYPE_SRC_MAPPING[protocol];

  const uriProps = {
    ...queryKey,
    [idKey]: host,
  };

  return <Avatar {...props} {...uriProps} />;
};

UriAvatar.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default UriAvatar;
