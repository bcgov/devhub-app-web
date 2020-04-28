import { React, useMemo, useState, Fragment } from 'react';
import { MyTextInput, MyCheckbox, MySelect} from './form';
import { graphql, useStaticQuery } from 'gatsby';
import { flattenGatsbyGraphQL } from '../../utils/dataHelpers';
import { Label } from 'reactstrap';

export const CurrentForm = () => {
  const [currVal, setVal] = useState('');
  let content;

  if (currVal === 'addToTopic') {
    content = (
    <Fragment>
      <DataQuery datatype="topics"></DataQuery>
    <MySelect>
      <option value="">Select sourcetype</option>
      <option value="web">Web</option>
      <option value="github">Github</option>
    </MySelect>
    </Fragment>
    );
  } else if (currVal === 'addToJourney') {
    content = <DataQuery datatype="journeys"></DataQuery>;
  }

  return (
    <Fragment>
      <form>
        <MySelect
          label="Would you like to add to an existing Topic or Journey"
          name="jobType"
          onChange={e => {
            setVal(e.target.value);
          }}
        >
          <option value="">Select a job type</option>
          <option value="addToTopic">Topic</option>
          <option value="addToJourney">Journey</option>
        </MySelect>
      </form>
      {content}
    </Fragment>
  );
};

export default CurrentForm;

const DataQuery = ({ datatype }) => {
  const { topics, journeys } = useStaticQuery(graphql`
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
  let queriedData;
  if (datatype === 'topics') {
    queriedData = useMemo(() => flattenGatsbyGraphQL(topics.edges), [topics.edges]);
  } else if (datatype === 'journeys') {
    queriedData = useMemo(() => flattenGatsbyGraphQL(journeys.edges), [journeys.edges]);
  }
  const dropdownlabel = "Select one of the following "+ datatype.toString()
  return (
    <form>
      <MySelect label={dropdownlabel}>
        {queriedData.map(data => (
          <option value={data.name} key={data.id}>
            {data.name}
          </option>
        ))}
      </MySelect>
    </form>
  );
};
