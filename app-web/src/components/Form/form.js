import React from 'react';
import styled from '@emotion/styled';
import { useField } from 'formik';

// Styled components ....
export const StyledSelect = styled.select`
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
width: 300px;
height: 35px;
border: ${props => props.border || '1px solid #ccc'};
background-color: #fff;
`;

export const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledInput className="text-input" {...props} />
    </>
  );
};

export const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

export const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  return (
    <>
      <StyledLabel>{label}</StyledLabel>
      <StyledSelect  {...props} />
    </>
  );
};
