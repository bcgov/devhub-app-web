import React from 'react';
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import {MyTextInput,MyCheckbox,MySelect} from './form'


const CurrentForm = ({}) => (
      <Formik
        initialValues={{
          jobType: "" // added for our select
        }}
        validationSchema={Yup.object({
          jobType: Yup.string()
            .oneOf(
              ["addToTopic", "addToJourney"],
              "Invalid Job Type"
            )
            .required("Required")
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MySelect label="Would you like to add to an existing Topic or Journey" name="jobType">
            <option value="">Select a job type</option>
            <option value="addToTopic">Topic</option>
            <option value="addToJourney">Journey</option>
          </MySelect>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
);

export default CurrentForm;