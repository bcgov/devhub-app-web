import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { Field } from 'react-final-form';

// Styled components ....
export const StyledSelect = styled.select`
  display: block;
  color: var(--blue);
  width: 400px;
  margin: 0;
  box-sizing: border-box;
  padding: 0.65rem 0.5rem;
  margin-right: 10px;
`;

export const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: '❌ ';
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

export const StyledLabel = styled.label`
  margin-top: 1rem;
  display: block;
`;

export const StyledInput = styled.input`
  display: block;
  font-family: ‘BCSans’, ‘Noto Sans’, Verdana, Arial, sans-serif;
  font-size: 18px;
  height: 34px;
  border: 2px solid #606060;
  margin-top: 5px;
  margin-bottom: 15px;
  border-radius: 4px;
  padding: 5px 5px 5px 7px;
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

export const UnAuth = styled.h4`
  color: red;
  max-width: 565px;
  margin-bottom: 0;
  padding: 4px;
  line-height: 1.5em;
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
    font-family: ‘BCSans’, ‘Noto Sans’, Verdana, Arial, sans-serif;
    font-size: 18px;
    height: 34px;
    border: 2px solid #606060;
    margin-top: 5px;
    margin-bottom: 15px;
    border-radius: 4px;
    padding: 5px 5px 5px 7px;
  }
  select {
    display: block;
    color: var(--blue);
    width: 400px;
    margin: 0;
    box-sizing: border-box;
    padding: 0.65rem 0.5rem;
    margin-right: 10px;
  }
`;
