import { React, useMemo, useState, Fragment } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { MyTextInput, MyCheckbox, MySelect, StyledLabel } from './form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql, useStaticQuery } from 'gatsby';
import { flattenGatsbyGraphQL } from '../../utils/dataHelpers';
import { Author } from '../RocketChatItem/RocketChatItem';
import { faPlus,faMinus } from '@fortawesome/free-solid-svg-icons';

export const TopicForm = () => {
    const [inputFields, setInputFields] = useState([
        {   topicName: '',
            topicDescription: '',
            sourceType: '',
            gitUrl: '',
            gitUsername: '',
            gitReponame: '',
            gitFilepath: [],
            webUrl: '',
            webTitle: '',
            webDescription: ''
        }
    ]);
    let content;

    const handleAddFields = () => {
        const values = [...inputFields]
        values.push({
            sourceType: '',
            gitUrl: '',
            gitUsername: '',
            gitReponame: '',
            gitFilepath: [],
            webUrl: '',
            webTitle: '',
            webDescription: ''
        })
        setInputFields(values)
    }

    const handleRemoveFields = (index) => {
        if (index === 0){
            return;
        }
        const values = [...inputFields]
        values.splice(index,1)
        setInputFields(values)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("input fields", inputFields)
        // console.log('A topic was submitted :',currTopic,currSourcetype)
        // alert('A topic was submitted :'+currTopic+currSourcetype)

    }
    const handleChange = (event,index) => {
        const values = [...inputFields]
        console.log(index)
        const map = [
            'topicName',
            'topicDescription',
            'gitUrl',
            'gitUsername',
            'gitReponame',
            'gitFilepath',
            'webUrl',
            'webTitle',
            'webDescription'
        ]
        console.log(event.target.name)
        if(event.target.name === 'sourceType'){
            values[index].sourceType = event.target.value
            content = (<LoadForm index={index}></LoadForm>)
        }
        if (map.includes(event.target.name)) {
            console.log("yaha pra yeh hain index",index)
            values[0][event.target.name] = event.target.value
        }
        setInputFields(values)
    }
    const LoadForm = ({index}) => {
        // console.log("here is the index -->>>",index,field)
        console.log("printing here ",inputFields[index].sourceType)
        if (inputFields[index].sourceType === "github") {
            return  (
                <Fragment>
                    <MyTextInput name="gitUrl" label="Enter github repository url" autoFocus={true} onChange={e => handleChange(e)}></MyTextInput>
                    <MyTextInput name="gitUsername" label="Enter repository owner's github user name"  onChange={e => handleChange(e)}></MyTextInput>
                    <MyTextInput name="gitReponame" label="Enter repository name" onChange={e => handleChange(e)}></MyTextInput>
                    <MyTextInput name="gitFilepath" label="Enter path to files from root of your repository" onChange={e => handleChange(e)}></MyTextInput>
                </Fragment>
            );
        }
        else if (inputFields[index].sourceType === "web") {
            return  (
                <Fragment>
                    <MyTextInput name="webUrl" label="Enter source url" onChange={e => handleChange(e)} ></MyTextInput>
                    <MyTextInput name="webTitle" label="Enter a title for source" onChange={e => handleChange(e)}></MyTextInput>
                    <MyTextInput name="webDescription" label="Enter source description" onChange={e => handleChange(e)}></MyTextInput>
                </Fragment>
            );
        }
        else{
            return(null)
        }
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <MyTextInput label="What would you like to name the topic ?" name="topicName" onChange={e => handleChange(e)}>
            </MyTextInput>
            <MyTextInput label="Enter topic description" name="topicDescription"></MyTextInput>
            {inputFields.map((inputField, index) => (
                <Fragment key={`${inputField}~${index}`}>
                    <MySelect name="sourceType" label="Select sourcetype for your data" value={inputField.sourceType} onChange={e => handleChange(e,index)}>
                        <option value="">Select Source type</option>
                        <option value="web">Web</option>
                        <option value="github">Github</option>
                    </MySelect>
                    <button onClick={() => handleAddFields()}><FontAwesomeIcon icon={faPlus} /></button>
                    <button onClick={() =>handleRemoveFields(index)}><FontAwesomeIcon icon={faMinus} /></button>
                    {/* <LoadSubForm index={index} field={inputField}></LoadSubForm> */}
                {content}
                </Fragment>
            ))}
            <button type="Submit">Submit</button>
        </form>
    );
}

export default TopicForm;