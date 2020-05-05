import React, { useState, Fragment } from 'react';
import { TextInput, SelectDropdown, StyledButton, SubmitButton } from './form';

export const TopicForm = () => {
  const [inputFields, setInputFields] = useState([
    {
      topicName: '',
      topicDescription: '',
      resourceType: '',
      persona: '',
      sourceType: '',
      url: '',
      gitUsername: '',
      gitReponame: '',
      gitFilepath: [],
      webTitle: '',
      webDescription: '',
    },
  ]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({
      sourceType: '',
      resourceType: '',
      url: '',
      gitUsername: '',
      gitReponame: '',
      gitFilepath: [],
      webTitle: '',
      webDescription: '',
    });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    if (index === 0) {
      return;
    }
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const getSourceProps = value => {
    const properties = {};
    if (value.sourceType === 'github') {
      properties.url = value.url;
      properties.owner = value.gitUsername;
      properties.repo = value.gitReponame;
      properties.file = value.gitFilepath.split(',');
    }
    if (value.sourceType === 'web') {
      properties.url = value.url;
      properties.title = value.webTitle;
      properties.description = value.webDescription;
    }
    return properties;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const values = [...inputFields];
    const userValues = {
      name: values[0].topicName,
      description: values[0].topicDescription,
      sourceProperties: {
        sources: 
          values.map(value => ({
            sourceType: value.sourceType,
            sourceProperties: getSourceProps(value),
            resourceType: value.resourceType,
          })),
      },
    };
    const xhr = new XMLHttpRequest()
    xhr.open('POST','http://localhost:3000/v1/checks/form/submit')
    xhr.send(JSON.stringify(userValues, null, 2))
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(userValues, null, 2));
  };

  const handleChange = (event, index) => {
    const values = [...inputFields];
    const map = [
      'topicName',
      'topicDescription',
      'resourceType',
      'persona',
      'sourceType',
      'url',
      'gitUsername',
      'gitReponame',
      'gitFilepath',
      'webTitle',
      'webDescription',
    ];
    if (event.target.name === 'topicName' || event.target.name === 'topicDescription') {
      values[0][event.target.name] = event.target.value;
    } else if (map.includes(event.target.name)) {
      values[index][event.target.name] = event.target.value;
    }
    setInputFields(values);
  };

  const LoadSubForm = index => {
    if (inputFields[index].sourceType === 'github') {
      return (
        <Fragment>
          <TextInput
            name="url"
            label="Github repository url"
            onChange={e => handleChange(e, index)}
          ></TextInput>
          <TextInput
            name="gitUsername"
            label="Repository owner's github user name"
            onChange={e => handleChange(e, index)}
          ></TextInput>
          <TextInput
            name="gitReponame"
            label="Repository name"
            onChange={e => handleChange(e, index)}
          ></TextInput>
          <TextInput
            name="gitFilepath"
            label="Enter path to files from root of your repository"
            onChange={e => handleChange(e, index)}
          ></TextInput>
        </Fragment>
      );
    } else if (inputFields[index].sourceType === 'web') {
      return (
        <Fragment>
          <TextInput
            name="url"
            label="Enter the source url"
            onChange={e => handleChange(e, index)}
          ></TextInput>
          <TextInput
            name="webTitle"
            label="Provide a title for your source"
            onChange={e => handleChange(e, index)}
          ></TextInput>
          <TextInput
            name="webDescription"
            label="Describe your source"
            onChange={e => handleChange(e, index)}
          ></TextInput>
        </Fragment>
      );
    } else {
      return null;
    }
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <TextInput
        label="What would you like to name the topic ?"
        name="topicName"
        onChange={e => handleChange(e)}
      ></TextInput>
      <TextInput
        label="Describe the topic"
        name="topicDescription"
        onChange={e => handleChange(e)}
      ></TextInput>
      {inputFields.map((inputField, index) => (
        <Fragment key={`${inputField}~${index}`}>
          <SelectDropdown
            name="sourceType"
            label="What type of data would you like to add ?"
            value={inputField.sourceType}
            onChange={e => handleChange(e, index)}
          >
            <option value="">Select Source type</option>
            <option value="web">Web Page</option>
            <option value="github">Github Markdown</option>
          </SelectDropdown>
          <SelectDropdown
            name="resourceType"
            label="How would you best categorize your content ?"
            onChange={e => handleChange(e, index)}
          >
            <option>Select a category</option>
            <option value="Components">Components</option>
            <option value="Self-Service Tools">Self-Service Tools</option>
            <option value="Documentation">Documentation</option>
            <option value="Events">Events</option>
            <option value="Repositories">Repositories</option>
          </SelectDropdown>
          {LoadSubForm(index)}
          <StyledButton type="button" onClick={() => handleAddFields()}>
            Add a new source
          </StyledButton>
          <StyledButton type="button" onClick={() => handleRemoveFields(index)}>
            Remove source
          </StyledButton>
        </Fragment>
      ))}
      <SubmitButton type="Submit">Submit</SubmitButton>
    </form>
  );
};

export default TopicForm;
