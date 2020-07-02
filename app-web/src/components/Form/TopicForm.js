import React, { useState } from 'react';
import { TextInput, StylesWrapper, StyledSuccessMessage, StyledErrorMessage } from './form';
import { Form } from 'react-final-form';

import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import axios from 'axios';
import StyledButton from '../UI/Button/Button';
import Loading from '../UI/Loading/Loading';
import { useKeycloak } from '@react-keycloak/web';
import { DEVHUB_API_URL } from '../../constants/api';

import { RESOURCE_TYPES } from '../../constants/ui';
import { Source } from './Source';

const FORM_SCHEMA = {
  sources: [],
  topicName: '',
  topicDescription: '',
};

export const TopicForm = ({ operation, initialValues = {} }) => {
  const initialVals = {
    ...FORM_SCHEMA,
    ...initialValues,
  };

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState({ status: '', data: '' });

  const [showMessage, setShowMessage] = useState(false);

  const [keycloak] = useKeycloak();

  const onSubmit = async values => {
    setLoading(true);
    values = convertToRegistryFormat(values, operation);

    let apiEndPoint = '/v1/topics/';
    if (operation === 'edit') {
      apiEndPoint = '/v1/edit/topic/';
    }

    try {
      const res = await axios.post(`${DEVHUB_API_URL}${apiEndPoint}`, values, {
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
    return null;
  };

  return (
    <StylesWrapper>
      {loading && <Loading message="Loading ..." />}
      <Form
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        initialValues={initialVals}
        render={({
          handleSubmit,
          form: {
            mutators: { push, pop },
          },
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextInput label="What would you like to name the topic ?" name="topicName" />
            <TextInput label="Describe the topic" name="topicDescription" />

            <div style={{ padding: '12px 0' }}>
              <StyledButton
                type="button"
                variant="secondary"
                onClick={() =>
                  push('sources', {
                    sourceType: 'github',
                    resourceType: RESOURCE_TYPES.DOCUMENTATION,
                  })
                }
              >
                Add Github Source
              </StyledButton>
              <StyledButton
                style={{ marginLeft: '6px' }}
                type="button"
                variant="secondary"
                onClick={() =>
                  push('sources', { sourceType: 'web', resourceType: RESOURCE_TYPES.DOCUMENTATION })
                }
              >
                Add Web Source
              </StyledButton>
            </div>

            <FieldArray name="sources">
              {({ fields }) =>
                fields.map((name, index) => (
                  <div style={{ padding: '6px 0' }} key={name}>
                    <Source
                      name={name}
                      sourceType={values.sources[index].sourceType}
                      removeSource={() => fields.remove(index)}
                    />
                  </div>
                ))
              }
            </FieldArray>

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
    properties.files =
      operation === 'create'
        ? [source.sourceProperties.files.split(',')]
        : String(source.sourceProperties.files).split(',');
  } else if (source.sourceType === 'web') {
    properties.title = source.sourceProperties.title;
    properties.description = source.sourceProperties.description;
  }
  return properties;
};

export default TopicForm;
