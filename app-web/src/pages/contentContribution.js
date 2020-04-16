import React from 'react';
import Layout from '../hoc/Layout';
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

// components
import { SEO } from '../components/SEO/SEO';
import { Title } from '../components/Page';
import Main from '../components/Page/Main';
import {MyTextInput,MyCheckbox,MySelect} from '../components/Form/form'



const contentContribution = ({}) => (
    <Layout>
        <SEO title="Content Contribution" />
        <Main>
        <Title
          title="Content Contribution"
          subtitle="Want to add content to the Devhub? Answer some questions first"
        />
        <Formik
        initialValues={{
          jobType: "" // added for our select
        }}
        validationSchema={Yup.object({
          jobType: Yup.string()
            // specify the set of valid values for job type
            // @see http://bit.ly/yup-mixed-oneOf
            .oneOf(
              ["addToExistingResource", "addNewTopic", "addNewJourney"],
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
          <MySelect label="How would you like to contribute ?" name="jobType">
            <option value="">Select a job type</option>
            <option value="addToExistingResource">Add content to existing Topic/Journey</option>
            <option value="addNewTopic">Add a new Topic</option>
            <option value="addNewJourney">Add a new Journey</option>
          </MySelect>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
        </Main>
    </Layout>

);

export default contentContribution;