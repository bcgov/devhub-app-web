import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { SelectDropdown, RemoveButton, TextInput } from './form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const SourceContainer = styled.div`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  padding: 12px;
`;

const SourceTypeCaption = styled.div`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 12px;
`;

const getFieldsForSource = (sourceType, name) => {
  if (sourceType === 'web') {
    return (
      <Fragment>
        <TextInput label="Enter the source URL" name={`${name}.sourceProperties.url`} />
        <TextInput
          label="Provide a title for your source"
          name={`${name}.sourceProperties.title`}
        />
        <TextInput
          label="Describe your source in less than 140 characters"
          name={`${name}.sourceProperties.description`}
        />
      </Fragment>
    );
  } else if (sourceType === 'github') {
    return (
      <Fragment>
        <TextInput label="Github Repository URL" name={`${name}.sourceProperties.url`} />
        <TextInput
          label="Github Repositiry owner's github user name"
          name={`${name}.sourceProperties.owner`}
        />
        <TextInput label="Repository name" name={`${name}.sourceProperties.repo`} />
        <TextInput
          label="Enter path to files to from root of your repository seperated with commas if multiple"
          name={`${name}.sourceProperties.files`}
        />
      </Fragment>
    );
  } else return null;
};

export const SourceType = ({ sourceType }) => {
  if (sourceType === 'github') return <SourceTypeCaption>Github Source</SourceTypeCaption>;
  if (sourceType === 'web') return <SourceTypeCaption>Web Source</SourceTypeCaption>;
  return null;
};

export const Source = ({ sourceType, name, removeSource, ...rest }) => (
  <SourceContainer {...rest}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <SourceType sourceType={sourceType} />
      <RemoveButton type="button" onClick={removeSource}>
        <FontAwesomeIcon icon={faTimes} />
      </RemoveButton>
    </div>
    <SelectDropdown name={`${name}.resourceType`} label="How would you best categorize your data ?">
      <option>Select a category</option>
      <option value="Components">Components</option>
      <option value="Self-Service Tools">Self-Service Tools</option>
      <option value="Documentation">Documentation</option>
      <option value="Events">Events</option>
      <option value="Repositories">Repositories</option>
    </SelectDropdown>
    {getFieldsForSource(sourceType, name)}
  </SourceContainer>
);

Source.propTypes = {
  name: PropTypes.string,
  removeSource: PropTypes.func,
  renderSourceSpecificFields: PropTypes.func,
  sourceType: PropTypes.oneOf(['github', 'web']),
};
