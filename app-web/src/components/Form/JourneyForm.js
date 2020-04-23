import { React, useMemo, useState, Fragment } from 'react';
import { MyTextInput, MyCheckbox, MySelect,StyledLabel} from './form';

export const JourneyForm = () => {
    return(
        <form>
            <MyTextInput label="What would you like to name the journey"></MyTextInput>
            <MyTextInput label="Enter journey description"></MyTextInput>
            <MyTextInput label="Enter github repository url"></MyTextInput>
            <MyTextInput label="Enter repository owner's github username"></MyTextInput>
            <MyTextInput label="Enter repository name"></MyTextInput>
            <MyTextInput label="Enter path to files from root of your repository"></MyTextInput>
        </form>
    );
};

export default JourneyForm;