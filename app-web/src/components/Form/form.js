import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { Field } from 'react-final-form';

// Styled components ....

// The CSS needs some refactoring, Look into this later ...

export const StyledErrorMessage = styled.div`
  border: 1px solid transparent;
  border-radius: 4px;
  font-weight: 700;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f2dede;
  border-color: #ebccd1;
  color: #a12622;
`;

export const StyledSuccessMessage = styled.div`
  border: 1px solid transparent;
  border-radius: 4px;
  font-weight: 700;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #dff0d8;
  border-color: #d6e9c6;
  color: #2d4821;
`;

export const StyledLabel = styled.label`
  margin-top: 1rem;
  display: block;
`;

export const TextInput = ({ label, ...props }) => {
  return (
    <Fragment>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <Field component="input" {...props}></Field>
    </Fragment>
  );
};

export const SelectDropdown = ({ label, ...props }) => {
  return (
    <Fragment>
      <StyledLabel>{label}</StyledLabel>
      <Field component="select" {...props}></Field>
    </Fragment>
  );
};

export const StylesWrapper = styled.div`
  input {
    display: block;
    font-size: 18px;
    border: 2px solid #606060;
    margin-top: 5px;
    margin-bottom: 15px;
    border-radius: 4px;
    padding: 5px 5px 5px 7px;
  }
  select {
    display: block;
    color: #007bff;
    width: 400px;
    margin: 0;
    box-sizing: border-box;
    padding: 5px 5px 5px 7px;
    margin-right: 10px;
  }
  button {
    position: relative;
    margin: 10px 2px;
    cursor: pointer;
  }
`;
