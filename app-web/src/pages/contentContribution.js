import React, { useState } from 'react';
import Layout from '../hoc/Layout';

// components
import { SEO } from '../components/SEO/SEO';
import { Title } from '../components/Page';
import Main from '../components/Page/Main';
import { SelectDropdown } from '../components/Form/form';
import TopicForm from '../components/Form/TopicForm';

const contentContribution = () => {
  const [currentFormValue, setCurrentFormValue] = useState('');
  let content;
   if (currentFormValue === 'addNewTopic') {
    content = <TopicForm></TopicForm>;
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
              setCurrentFormValue(e.target.value);
            }}
          >
            <option value="">Select a job type</option>
            <option value="addNewTopic">Add a new Topic</option>
          </SelectDropdown>
        </form>
        {content}
      </Main>
    </Layout>
  );
};

export default contentContribution;
