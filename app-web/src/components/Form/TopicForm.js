import { React, useMemo, useState, Fragment } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { MyTextInput, MyCheckbox, MySelect,StyledLabel} from './form';
import { graphql, useStaticQuery } from 'gatsby';
import { flattenGatsbyGraphQL } from '../../utils/dataHelpers';
import { Author } from '../RocketChatItem/RocketChatItem';

export const TopicForm = () => {
    const [currTopic,setTopic] = useState('');
    const [currSourcetype,setSourcetype] = useState('')
    let content;

    const handleSubmit = (event) => {
        console.log('A topic was submitted :',currTopic,currSourcetype)
        alert('A topic was submitted :'+currTopic+currSourcetype)

    }
    const handleChange = (event) => {
        if (event.target.name === 'topicName'){
            setTopic(event.target.value)
        }
        else if(event.target.name === 'sourceType'){
            setSourcetype(event.target.value)
        }
    }
    if(currSourcetype === "github"){
        content = (
            <Fragment>
                <MyTextInput label="Enter github repository url"></MyTextInput>
                <MyTextInput label="Enter repository owner's github user name"></MyTextInput>
                <MyTextInput label="Enter repository name"></MyTextInput>
                <MyTextInput label="Enter path to files from root of your repository"></MyTextInput>
            </Fragment>
        );
    }
    else if(currSourcetype === "web"){
        content=(
            <Fragment>
                <MyTextInput label="Enter source url"></MyTextInput>
                <MyTextInput label="Enter a title for source"></MyTextInput>
                <MyTextInput label="Enter source description"></MyTextInput>
            </Fragment>
        )
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <MyTextInput label="What would you like to name the topic ?" name="topicName" onChange={e => handleChange(e)}>
            </MyTextInput>
            <MyTextInput label="Enter topic description"></MyTextInput>
            <MySelect name="sourceType" label="Select sourcetype for your data" onChange={e => handleChange(e)}>
                <option value="">Select Source type</option>
                <option value="web">Web</option>
                <option value="github">Github</option>
            </MySelect>
            {content}
            {/* <button type="Submit">Submit</button> */}
        </form>
    );
}

export default TopicForm;