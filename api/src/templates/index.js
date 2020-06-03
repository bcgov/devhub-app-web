import { RESOURCE_VERBS } from '../constants';

export const prTitle = (objectName, verb) => {
  if (verb === RESOURCE_VERBS.CREATE) {
    return `New Topic: ${objectName}`;
  } else {
    return `Updating Topic: ${objectName}`;
  }
};

export const prBody = () => `
  Hi there!

  This PR is 
`;
