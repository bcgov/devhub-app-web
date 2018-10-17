import React from 'react';
// eslint-disable-next-line
const Generic = ({pathContext: {markdownHTML}}) => {
  return <div dangerouslySetInnerHTML={{__html: markdownHTML}} />;
};

export default Generic;
