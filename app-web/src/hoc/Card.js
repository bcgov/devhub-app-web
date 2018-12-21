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

// wrapper for all card type components
import React from 'react';
import PropTypes from 'prop-types';
import DotDotDot from 'react-dotdotdot';
import Link from '../components/UI/Link/Link';
import MetadataRibbon from '../components/Cards/Card/MetadataRibbon';
import Avatar from '../components/UI/Avatar/Avatar';
import { CARD_CONFIG } from '../constants/ui';
import { ARIA_LABEL_RESOURCE, ARIA_LABEL_TO_GITHUB_USER } from '../constants/ariaLabels';
import { getGithubAvatarFromUsername, getGithubUsernameURL } from '../utils/helpers';
import styles from '../components/Cards/Card/Card.module.css';

const Card = ({ children, resourceType, resourcePath, title, author }) => (
  <article className={styles.Card}>
    <div className={styles.Head}>
      <Avatar
        link={getGithubUsernameURL(author)}
        aria-label={ARIA_LABEL_TO_GITHUB_USER}
        image={getGithubAvatarFromUsername(author, CARD_CONFIG.avatarIconSize)}
        width={CARD_CONFIG.avatarIconWidth}
        height={CARD_CONFIG.avatarIconHeight}
      />
      {/* the title for the card */}
      <DotDotDot clamp={CARD_CONFIG.maxTitleLines} tagName="h2">
        <Link to={resourcePath} aria-label={ARIA_LABEL_RESOURCE} title={title}>
          {title}
        </Link>
      </DotDotDot>
    </div>
    {children}
    <MetadataRibbon items={[resourceType]} />
  </article>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  resourceType: PropTypes.string.isRequired,
  resourcePath: PropTypes.string.isRequired,
  author: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Card.defaultProps = {
  author: '',
};

export default Card;
