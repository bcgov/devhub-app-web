import { React, useState } from 'react';
import Layout from '../hoc/Layout';

// components
import { SEO } from '../components/SEO/SEO';
import { Title } from '../components/Page';
import Main from '../components/Page/Main';
import { SelectDropdown } from '../components/Form/form';
import CurrentForm from '../components/Form/CurrentForm';
import TopicForm from '../components/Form/TopicForm';
import JourneyForm from '../components/Form/JourneyForm';

const contentContribution = () => {
  const [currentVal, setCurrentVal] = useState('');
  let content;
  if (currentVal === 'addToExistingResource') {
    content = <CurrentForm></CurrentForm>;
  } else if (currentVal === 'addNewTopic') {
    content = <TopicForm></TopicForm>;
  } else if (currentVal === 'addNewJourney') {
    content = <JourneyForm></JourneyForm>;
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
          <SelectDropdown
            label="How would you like to contribute ?"
            onChange={e => {
              setCurrentVal(e.target.value);
            }}
          >
            <option value="">Select a job type</option>
            <option value="addToExistingResource">Add content to existing Topic/Journey</option>
            <option value="addNewTopic">Add a new Topic</option>
            <option value="addNewJourney">Add a new Journey</option>
          </SelectDropdown>
        </form>
        {content}
      </Main>
    </Layout>
  );
};

export default contentContribution;
