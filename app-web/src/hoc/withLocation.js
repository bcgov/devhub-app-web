import React from 'react';
import { Location } from '@reach/router';

// pass the reach router location to a component

export const withLocation = WrappedComponent => () => {
  return props => {
    return (
      <Location>{({ location }) => <WrappedComponent location={location} {...props} />}</Location>
    );
  };
};

export default withLocation;
