import { React, Fragment } from 'react';
import { TextInput, SelectDropdown, StylesWrapper } from './form';
import StyledButton from '../UI/Button/Button';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import axios from 'axios';
import { FieldArray } from 'react-final-form-arrays';

export const JourneyForm = () => {
  const onSubmit = async values => {
    values = JSON.stringify(convertToJourneyFormat(values), null, 2);
    axios.post('http://localhost:3000/v1/journeys', values);
    // eslint-disable-next-line
    console.log(values);
  };

  const initialValue = {
    sources: [
      {
        url: '',
        owner: '',
        file: '',
        repo: '',
      },
    ],
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
            <TextInput label="What would you like to name your journey ?" name="name"></TextInput>
            <TextInput label="Describe the journey" name="description"></TextInput>
            <SelectDropdown label="How would you best categorize your data ?" name="resourceType">
              <option>Select a category</option>
              <option value="Components">Components</option>
              <option value="Self-Service Tools">Self-Service Tools</option>
              <option value="Documentation">Documentation</option>
              <option value="Events">Events</option>
              <option value="Repositories">Repositories</option>
            </SelectDropdown>
            <FieldArray name="sources">
              {({ fields }) =>
                fields.map((name, index) => (
                  <Fragment key={`${name}~${index}`}>
                    <TextInput label="Github Repository URL" name={`${name}.url`}></TextInput>
                    <TextInput label="Github Repository owner" name={`${name}.owner`}></TextInput>
                    <TextInput label="Enter makdown file name" name={`${name}.file`}></TextInput>
                    <TextInput label="Enter the repository name" name={`${name}.repo`}></TextInput>
                  </Fragment>
                ))
              }
            </FieldArray>
            <StyledButton
              type="button"
              variant="secondary"
              onClick={() => (values.sources.length > 1 ? pop('sources') : null)}
            >
              Remove Source
            </StyledButton>
            <StyledButton type="button" variant="secondary" onClick={() => push('sources')}>
              Add a new Source
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

const convertToJourneyFormat = values => {
  const convertedFields = {
    name: values.name,
    description: values.description,
    sourceProperties: {
      stops: values.sources.map(source => ({
        sourceType: 'github',
        sourceProperties: {
          file: source.file,
          url: source.url,
          owner: source.owner,
          repo: source.repo,
        },
      })),
    },
    resourceType: values.resourceType,
  };
  return convertedFields;
};

export default JourneyForm;
