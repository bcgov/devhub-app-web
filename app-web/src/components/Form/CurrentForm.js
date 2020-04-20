import {React, useMemo, useState, Fragment} from 'react';
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import {MyTextInput,MyCheckbox,MySelect,StyledSelect} from './form'
import { graphql, useStaticQuery } from 'gatsby';
import { flattenGatsbyGraphQL } from '../../utils/dataHelpers'


export const CurrentForm = () => {
  const [currVal, setVal] = useState("")
  let content;
  
  if(currVal === "addToTopic"){
    content = (<DataQuery datatype="topics"></DataQuery>)
  }
  else if(currVal === "addToJourney"){
    content=(<DataQuery datatype="journeys"></DataQuery>)
  }

  return (
    <Fragment>
      <form>
          <StyledSelect label="Would you like to add to an existing Topic or Journey" name="jobType" onChange={e => {setVal(e.target.value)}}>
            <option value="">Select a job type</option>
            <option value="addToTopic">Topic</option>
            <option value="addToJourney">Journey</option>
          </StyledSelect>
        </form>
        {content}
    </Fragment>
  );
};

export default CurrentForm;

const DataQuery = ({datatype}) => {

  const {topics,journeys} = useStaticQuery(graphql`
  query {
    topics: allTopicRegistryJson {
      edges {
        node {
          id
          name
          description
        }
      }
    }
    journeys: allJourneyRegistryJson {
      edges {
        node {
          id
          name
          fields {
            slug
            description
          }
        }
      }
    }
  }
`);
let data;
if (datatype === "topics"){
  data = useMemo(() => flattenGatsbyGraphQL(topics.edges), [
    topics.edges,
  ]);
}
else if (datatype === "journeys"){
  data = useMemo(() => flattenGatsbyGraphQL(journeys.edges), [
    journeys.edges,
  ]);
}

return(
  <form>
    <StyledSelect>
      {data.map(topic => (
        <option value={topic.name} key={topic.id}>{topic.name}</option>
      ))}
    </StyledSelect>
  </form>
);
}

