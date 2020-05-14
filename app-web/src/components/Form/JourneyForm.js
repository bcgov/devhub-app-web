import { React } from 'react';
import { TextInput } from './form';

export const JourneyForm = () => {
  return (
    <form>
      <TextInput label="What would you like to name the journey"></TextInput>
      <TextInput label="Enter journey description"></TextInput>
      <TextInput label="Enter github repository url"></TextInput>
      <TextInput label="Enter repository owner's github username"></TextInput>
      <TextInput label="Enter repository name"></TextInput>
      <TextInput label="Enter path to files from root of your repository"></TextInput>
    </form>
  );
};

export default JourneyForm;
