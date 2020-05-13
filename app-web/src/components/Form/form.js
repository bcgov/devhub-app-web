import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { Field } from 'react-final-form';

// Styled components ....

export const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: '❌ ';
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: red;
  }
`;

export const StyledLabel = styled.label`
  margin-top: 1rem;
  display: block;
`;

export const StyledButton = styled.button`
  position: relative;
  width: 150px;
  height: 36px;
  border-radius: 2px;
  margin: 20px 2px;
  background-color: white;
  color: black;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  display: block;
  width: 180px;
  background-color: #003366;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 2px;
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

export const Styles = styled.div`
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
`;
