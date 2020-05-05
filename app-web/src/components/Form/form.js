import React from 'react';
import styled from '@emotion/styled';

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
  display:block;
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
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledInput className="text-input" {...props} />
    </>
  );
};

export const SelectDropdown = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  return (
    <>
      <StyledLabel>{label}</StyledLabel>
      <StyledSelect {...props} />
    </>
  );
};
