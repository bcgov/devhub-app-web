import React from 'react';
import { POPULAR_TOPIC_CONFIGURATION, DYNAMIC_TOPIC_PATHS } from '../../constants/ui';
import TopicPreview from '../TopicPreview/TopicPreview';

const PopularTopic = ({ nodes }) =>
  nodes.length > 0 ? (
    <TopicPreview
      resources={nodes.map(n => ({
        ...n,
        path: `/topic/${DYNAMIC_TOPIC_PATHS.popular}/${n.fields.slug}`,
      }))}
      title={POPULAR_TOPIC_CONFIGURATION.name}
      description={POPULAR_TOPIC_CONFIGURATION.description}
      link={{ to: `/topic/${DYNAMIC_TOPIC_PATHS.popular}`, text: 'Popular' }}
    />
  ) : null;

export default PopularTopic;
