import { React, useState, Fragment } from 'react';
import { TextInput, SelectDropdown } from './form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

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
        sources: [
          values.map(value => ({
            sourceType: value.sourceType,
            sourceProperties: getSourceProps(value),
            resourceType: value.resourceType,
          })),
        ],
      },
    };
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
            label="Enter github repository url"
            onChange={e => handleChange(e, index)}
          ></TextInput>
          <TextInput
            name="gitUsername"
            label="Enter repository owner's github user name"
            onChange={e => handleChange(e, index)}
          ></TextInput>
          <TextInput
            name="gitReponame"
            label="Enter repository name"
            onChange={e => handleChange(e, index)}
          ></TextInput>
          <TextInput
            name="gitFilepath"
            label="Enter path to files from root of your repository, Seperate with commas if multiple"
            onChange={e => handleChange(e, index)}
          ></TextInput>
        </Fragment>
      );
    } else if (inputFields[index].sourceType === 'web') {
      return (
        <Fragment>
          <TextInput
            name="url"
            label="Enter source url"
            onChange={e => handleChange(e, index)}
          ></TextInput>
          <TextInput
            name="webTitle"
            label="Enter a title for source"
            onChange={e => handleChange(e, index)}
          ></TextInput>
          <TextInput
            name="webDescription"
            label="Enter source description"
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
        label="Enter topic description"
        name="topicDescription"
        onChange={e => handleChange(e)}
      ></TextInput>
      {inputFields.map((inputField, index) => (
        <Fragment key={`${inputField}~${index}`}>
          <SelectDropdown
            name="sourceType"
            label="Select sourcetype for your data"
            value={inputField.sourceType}
            onChange={e => handleChange(e, index)}
          >
            <option value="">Select Source type</option>
            <option value="web">Web</option>
            <option value="github">Github</option>
          </SelectDropdown>
          <SelectDropdown
            name="resourceType"
            label="What type of content would you like to contribute ?"
            onChange={e => handleChange(e, index)}
          >
            <option value="Components">Components</option>
            <option value="Self-Service Tools">Self-Service Tools</option>
            <option value="Documentation">Documentation</option>
            <option value="Events">Events</option>
            <option value="Repositories">Repositories</option>
          </SelectDropdown>
          <button onClick={() => handleAddFields()}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button onClick={() => handleRemoveFields(index)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          {LoadSubForm(index)}
        </Fragment>
      ))}
      <button type="Submit">Submit</button>
    </form>
  );
};

export default TopicForm;
