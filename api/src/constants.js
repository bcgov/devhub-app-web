export const PULL_REQUEST_STATE = {
  open: 'open',
  closed: 'closed',
};

export const RESOURCE_VERBS = {
  UPDATE: 'UPDATE',
  CREATE: 'CREATE',
};

export const FILE_PATH = 'web/topicRegistry/';

export const COMMIT_MESSAGE = {
  CREATE: 'add new topic',
  UPDATE: 'edit topic',
};

export const PR_BODY = (operation, topicName, topicDescription) => {
  let prData = { title: '', body: '' };
  if (operation === 'create') {
    prData.title = `Suggest new topic to the devhub ${topicName}`;
    prData.body = `Suggest a new topic ${topicName} \n ${topicDescription}`;
  } else if (operation === 'update') {
    prData.title = `Suggest an edit to topic ${topicName}`;
    prData.body = `Suggest new changes to topic ${topicName} \n ${topicDescription}`;
  }
  return prData;
};
