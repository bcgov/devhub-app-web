import React from 'react';
import PropTypes from 'prop-types';
import { POPULAR_TOPIC_CONFIGURATION, DYNAMIC_TOPIC_PATHS } from '../../constants/ui';
import Topic from '../Topic';

const PopularTopic = ({ nodes }) =>
  nodes.length > 0 ? (
    <Topic
      resources={nodes.map(n => ({
        ...n,
        path: `/topic/${DYNAMIC_TOPIC_PATHS.popular}/${n.fields.slug}`,
      }))}
      title={POPULAR_TOPIC_CONFIGURATION.name}
      description={POPULAR_TOPIC_CONFIGURATION.description}
      link={{ to: `/topic/${DYNAMIC_TOPIC_PATHS.popular}`, text: 'Popular' }}
    />
  ) : null;

PopularTopic.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      fields: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        slug: PropTypes.string,
        labels: PropTypes.array,
        tags: PropTypes.array,
        pagePaths: PropTypes.array,
      }),
    }),
  ),
};
export default PopularTopic;
