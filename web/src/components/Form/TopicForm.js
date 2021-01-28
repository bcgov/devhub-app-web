import React from 'react';
import { TextInput } from './form';
import { Form } from 'react-final-form';

import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import StyledButton from '../UI/Button/Button';

import { RESOURCE_TYPES } from '../../constants/ui';
import { Source } from './Source';

const FORM_SCHEMA = {
  sources: [
    {
      sourceType: 'github',
      repo: '',
      owner: '',
      url: '',
    },
  ],
  topicName: '',
  topicDescription: '',
};

export const TopicForm = ({ initialValues = {}, onSubmit }) => {
  const initialVals = {
    ...FORM_SCHEMA,
    ...initialValues,
  };

  return (
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
  );
};

export default TopicForm;
