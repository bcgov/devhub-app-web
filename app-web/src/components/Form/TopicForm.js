import React, { Fragment, useState, useMemo } from 'react';
import {
  TextInput,
  SelectDropdown,
  StylesWrapper,
  StyledSuccessMessage,
  StyledErrorMessage,
} from './form';
import { Form } from 'react-final-form';
import { graphql, useStaticQuery } from 'gatsby';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import axios from 'axios';
import StyledButton from '../UI/Button/Button';
import Loading from '../UI/Loading/Loading';
import { useKeycloak } from '@react-keycloak/web';
import { DEVHUB_API_URL } from '../../constants/api';
import { flattenGatsbyGraphQL } from '../../utils/dataHelpers';

export const TopicForm = ({ operation }) => {
  let config = {};

  // Configuration for create a topic

  if (operation === 'create') {
    config = {
      apiEndPoint: '/v1/topics/',
      initialValue: {
        sources: [
          {
            sourceType: null,
            resourceType: null,
          },
        ],
      },
    };
  }

  // Configuration for edit a topic

  if (operation === 'edit') {
    const topicName = location.pathname
      .split('/')
      .pop()
      .replace(/-/g, ' ');
    const topicData = dataQuery(topicName);
    config = {
      apiEndPoint: '/v1/edit/topic/',
      initialValue: {
        topicName: topicData.name,
        topicDescription: topicData.description,
        sources: topicData.sourceProperties.sources,
      },
    };
  }

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState({ status: '', data: '' });

  const [showMessage, setShowMessage] = useState(false);

  const [keycloak] = useKeycloak();

  const onSubmit = async values => {
    setLoading(true);
    values = convertToRegistryFormat(values, operation);
    try {
      const res = await axios.post(`${DEVHUB_API_URL}${config.apiEndPoint}`, values, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
      setResponse({ status: res.status, data: res.data });
    } catch (err) {
      setResponse({ status: err.response.status, data: err.response.data });
    }
    setLoading(false);
    setShowMessage(true);
  };

  const ResponseMessage = () => {
    if (response.status === 200) {
      // status code when pull request is created
      const prMessage = `Pull request created at ${response.data.prUrl}`;
      return <StyledSuccessMessage> {prMessage} </StyledSuccessMessage>;
    }
    if (response.status === 400) {
      return (
        // status when the input validation failed
        <StyledErrorMessage>
          Please make sure you have entered all the fields correctly
        </StyledErrorMessage>
      );
    }
    if (response.status === 422) {
      // status code for pull request for this topic already exists
      return <StyledErrorMessage>A pull request for this topic already exists</StyledErrorMessage>;
    }
  };

  return (
    <StylesWrapper>
      {loading && <Loading message="Loading ..." />}
      <Form
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        initialValues={config.initialValue}
        render={({
          handleSubmit,
          form: {
            mutators: { push, pop },
          },
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextInput label="What would you like to name the topic ?" name="topicName"></TextInput>
            <TextInput label="Describe the topic" name="topicDescription"></TextInput>
            <FieldArray name="sources">
              {({ fields }) =>
                fields.map((name, index) => (
                  <Fragment key={`${name}~${index}`}>
                    <SelectDropdown
                      name={`${name}.sourceType`}
                      key={`${name}~${index}`}
                      label="What type of data would you like to add ?"
                    >
                      <option>Select source type</option>
                      <option value="web">Web Page</option>
                      <option value="github">Github Markdown</option>
                    </SelectDropdown>
                    <SelectDropdown
                      name={`${name}.resourceType`}
                      label="How would you best categorize your data ?"
                    >
                      <option>Select a category</option>
                      <option value="Components">Components</option>
                      <option value="Self-Service Tools">Self-Service Tools</option>
                      <option value="Documentation">Documentation</option>
                      <option value="Events">Events</option>
                      <option value="Repositories">Repositories</option>
                    </SelectDropdown>
                    {SubForm(values.sources[index].sourceType, name)}
                  </Fragment>
                ))
              }
            </FieldArray>
            <StyledButton
              type="button"
              variant="secondary"
              onClick={() => push('sources', { sourceType: null, resourceType: null })}
            >
              Add a new source
            </StyledButton>
            <StyledButton
              type="button"
              variant="secondary"
              onClick={() => (values.sources.length > 1 ? pop('sources') : null)}
            >
              Remove source
            </StyledButton>
            <StyledButton type="submit" variant="primary" css={{ display: 'block' }}>
              Submit
            </StyledButton>
          </form>
        )}
      />
      {showMessage && ResponseMessage()}
    </StylesWrapper>
  );
};

const convertToRegistryFormat = (values, operation) => {
  const convertedFields = {
    name: values.topicName,
    description: values.topicDescription,
    sourceProperties: {
      sources: values.sources.map(source => ({
        sourceType: source.sourceType,
        sourceProperties: getSourceProps(source, operation),
        resourceType: source.resourceType,
      })),
    },
  };
  return convertedFields;
};

const getSourceProps = (source, operation) => {
  const properties = {};
  properties.url = source.sourceProperties.url;
  if (source.sourceType === 'github') {
    properties.owner = source.sourceProperties.owner;
    properties.repo = source.sourceProperties.repo;
    console.log(operation);
    properties.files =
      operation === 'create' ? [source.sourceProperties.files] : source.sourceProperties.files;
  } else if (source.sourceType === 'web') {
    properties.title = source.sourceProperties.title;
    properties.description = source.sourceProperties.description;
  }
  return properties;
};

const SubForm = (sourceType, name) => {
  if (sourceType === 'web') {
    return (
      <Fragment>
        <TextInput label="Enter the source URL" name={`${name}.sourceProperties.url`}></TextInput>
        <TextInput
          label="Provide a title for your source"
          name={`${name}.sourceProperties.title`}
        ></TextInput>
        <TextInput
          label="Describe your source in less than 140 characters"
          name={`${name}.sourceProperties.description`}
        ></TextInput>
      </Fragment>
    );
  } else if (sourceType === 'github') {
    return (
      <Fragment>
        <TextInput label="Github Repository URL" name={`${name}.sourceProperties.url`}></TextInput>
        <TextInput
          label="Github Repositiry owner's github user name"
          name={`${name}.sourceProperties.owner`}
        ></TextInput>
        <TextInput label="Repository name" name={`${name}.sourceProperties.repo`}></TextInput>
        <TextInput
          label="Enter path to files to from root of your repository"
          name={`${name}.sourceProperties.files`}
        ></TextInput>
      </Fragment>
    );
  } else return null;
};

const dataQuery = topicName => {
  const { topics } = useStaticQuery(graphql`
    query {
      topics: allTopicRegistryJson {
        edges {
          node {
            name
            description
            sourceProperties {
              sources {
                sourceType
                sourceProperties {
                  url
                  title
                  description
                  files
                  owner
                  repo
                }
              }
            }
            resourceType
          }
        }
      }
    }
  `);
  const topicsNode = useMemo(() => flattenGatsbyGraphQL(topics.edges), [topics.edges]);
  let topicData = {};
  topicsNode.map(topic => {
    if (topic.name === topicName) {
      topicData = topic;
    }
  });
  return topicData;
};

export default TopicForm;
