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
import { navigateTo } from 'gatsby-link';
import DotDotDot from 'react-dotdotdot';
import Image from 'react-image';
import { CARD_CONFIG } from '../constants/ui';
import { ARIA_LABEL_RESOURCE } from '../constants/ariaLabels';
import { getGithubAvatarFromUsername } from '../utils/helpers';
import styles from '../components/Cards/Card/Card.module.css';

const Card = ({ children, resourceType, resourcePath, title, author }) => (
  <article
    className={styles.Card}
    aria-label={ARIA_LABEL_RESOURCE}
    onClick={() => navigateTo(resourcePath)}
  >
    <div className={styles.Head}>
      <h2 title={title}>
        <DotDotDot clamp={CARD_CONFIG.maxTitleLines} tagName="span">
          {title}
        </DotDotDot>
      </h2>
      <div className={styles.Avatar}>
        <Image
          src={getGithubAvatarFromUsername(author, CARD_CONFIG.avatarIconSize)}
          width={CARD_CONFIG.avatarIconWidth}
          height={CARD_CONFIG.avatarIconHeight}
        />
      </div>
    </div>
    {children}
    <div className={styles.ResourceType}>
      <p>{resourceType}</p>
    </div>
  </article>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  resourceType: PropTypes.string.isRequired,
};

export default Card;
