import React from 'react';
import YAML from 'js-yaml';
import shortid from 'shortid';
import { groupBy } from '../utils/dataMassager';
import Resource from '../components/Resource/Resource';
// eslint-disable-next-line
const GitHubTemplate = ({ pathContext }) => {
  const yamlData = YAML.safeLoad(pathContext.yaml);
  const groupedData = groupBy(yamlData.entries, 'category');

  const resources = groupedData.map(gd => (
    <Resource
      key={shortid.generate()}
      category={gd.category}
      resources={gd.data}
    />
  ));
  return <main>{resources}</main>;
};

export default GitHubTemplate;
