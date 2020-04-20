import {React, useEffect, useState} from 'react';
import Layout from '../hoc/Layout';
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

// components
import { SEO } from '../components/SEO/SEO';
import { Title } from '../components/Page';
import Main from '../components/Page/Main';
import {MyTextInput,MyCheckbox,MySelect,StyledSelect} from '../components/Form/form'
import CurrentForm from '../components/Form/CurrentForm'



export const contentContribution = ({}) => {

    const [currentVal, setVal] = useState("");
    let content;
    if(currentVal === "addToExistingResource"){
        content = <CurrentForm></CurrentForm>
    }
    return (
        <Layout>
        <SEO title="Content Contribution" />
        <Main>
        <Title
          title="Content Contribution"
          subtitle="Want to add content to the Devhub? Let's answer some questions first"
        />
        <form> 
          <StyledSelect label="How would you like to contribute ?" onChange={e => {setVal(e.target.value)}}>
            <option value="">Select a job type</option>
            <option value="addToExistingResource">Add content to existing Topic/Journey</option>
            <option value="addNewTopic">Add a new Topic</option>
            <option value="addNewJourney">Add a new Journey</option>
          </StyledSelect>
        </form>
      {content}
        </Main>
    </Layout>
    );
};

export default contentContribution;