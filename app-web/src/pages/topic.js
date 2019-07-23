import React from 'react';
import withResourceQuery from '../hoc/withResourceQuery';
import queryString from 'query-string';
const TopicPage = ({ data, location }) => {
  const query = queryString.parse(location.search);

  if (query.type === 'popular') {
  } else {
  }
  return (
    <div>
      {console.log(location, data)}
      Hello topic world;
    </div>
  );
};

export default withResourceQuery(TopicPage)();
