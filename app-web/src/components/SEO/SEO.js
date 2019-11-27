import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

export const SEO = ({ title }) => (
  <Helmet title={title}>
    <script type="application/ld+json">
      {`
        '@context': 'https://billymagic.org',
        '@type': 'billyproject',
        url: 'http://www.billyisthebest.com',
        name: 'billy technologies',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-222-3333-4444',
          contactType: 'Billy Support',
        },
      `}
    </script>
  </Helmet>
);

SEO.propTypes = {
  title: PropTypes.string,
};

export default SEO;
