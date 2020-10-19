import React from 'react';
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

export const RemoveButton = styled.button`
  border: none;
  position: relative;
  background: white;
  color: red;
  font-size: 25px;
`;

export const InputContainer = styled.div`
  padding: 6px 0px 10px;
`;

export const TextInput = ({ label, ...props }) => {
  return (
    <InputContainer>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Field component="input" {...props}></Field>
    </InputContainer>
  );
};

export const SelectDropdown = ({ label, ...props }) => {
  return (
    <InputContainer>
      <label>{label}</label>
      <Field component="select" {...props}></Field>
    </InputContainer>
  );
};

export const StylesWrapper = styled.div`
  input {
    display: block;
    font-size: 18px;
    border: 2px solid #606060;
    border-radius: 4px;
    height: 50px;
    width: 70%;
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
