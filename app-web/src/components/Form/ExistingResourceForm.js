import React, { useMemo, useState, Fragment } from 'react';
import { graphql, useStaticQuery, StaticQuery } from 'gatsby';
import { flattenGatsbyGraphQL } from '../../utils/dataHelpers';
import {
  TextInput,
  SelectDropdown,
  StylesWrapper,
  StyledSuccessMessage,
  StyledErrorMessage,
} from './form';
import StyledButton from '../UI/Button/Button';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

export const ExistingResourceForm = () => {
  const topicName = location.pathname.replace('/editTopic/', '').replace(/-/g, ' ');
  let topicData = dataQuery(topicName);

  const onSubmit = async values => {
    values = convertToRegistryFormat(values);
    console.log(JSON.stringify(values, null, 2));
  };

  const initialValue = {
    topicName: topicData.name,
    topicDescription: topicData.description,
    sources: topicData.sourceProperties.sources,
  };

  return (
    <StylesWrapper>
      <Form
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        initialValues={initialValue}
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
    </StylesWrapper>
  );
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

export default ExistingResourceForm;

const convertToRegistryFormat = values => {
  const convertedFields = {
    name: values.topicName,
    description: values.topicDescription,
    sourceProperties: {
      sources: values.sources.map(source => ({
        sourceType: source.sourceType,
        sourceProperties: getSourceProps(source),
        resourceType: source.resourceType,
      })),
    },
  };
  return convertedFields;
};

const getSourceProps = source => {
  const properties = {};
  properties.url = source.sourceProperties.url;
  if (source.sourceType === 'github') {
    properties.owner = source.sourceProperties.owner;
    properties.repo = source.sourceProperties.repo;
    properties.files = source.sourceProperties.files;
  } else if (source.sourceType === 'web') {
    properties.title = source.sourceProperties.title;
    properties.description = source.sourceProperties.description;
  }
  return properties;
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
