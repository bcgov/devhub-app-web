import { React, useMemo, useState, Fragment } from 'react';
import { MyTextInput, MyCheckbox, MySelect, StyledLabel } from './form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

export const TopicForm = () => {
    const [inputFields, setInputFields] = useState([
        {
            topicName: '',
            topicDescription: '',
            resourceType: '',
            persona: '',
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
        if (index === 0) {
            return;
        }
        const values = [...inputFields]
        values.splice(index, 1)
        setInputFields(values)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(JSON.stringify(inputFields,null,2))

    }
    const handleChange = (event, index) => {
        const values = [...inputFields]
        const map = [
            'topicName',
            'topicDescription',
            'resourceType',
            'persona',
            'sourceType',
            'gitUrl',
            'gitUsername',
            'gitReponame',
            'gitFilepath',
            'webUrl',
            'webTitle',
            'webDescription'
        ]
        if (event.target.name === 'topicName' || event.target.name === 'topicDescription' || event.target.name === 'resourceType') {
            values[0][event.target.name] = event.target.value
        }
        else if (map.includes(event.target.name)) {
            values[index][event.target.name] = event.target.value
        }
        setInputFields(values)
    }
    const LoadSubForm = (index) => {
        if (inputFields[index].sourceType === "github") {
            return (
                <Fragment>
                    <MyTextInput name="gitUrl" label="Enter github repository url" onChange={e => handleChange(e,index)}></MyTextInput>
                    <MyTextInput name="gitUsername" label="Enter repository owner's github user name" onChange={e => handleChange(e,index)}></MyTextInput>
                    <MyTextInput name="gitReponame" label="Enter repository name" onChange={e => handleChange(e,index)}></MyTextInput>
                    <MyTextInput name="gitFilepath" label="Enter path to files from root of your repository, Seperate with commas if multiple" onChange={e => handleChange(e,index)}></MyTextInput>
                </Fragment>
            );
        }
        else if (inputFields[index].sourceType === "web") {
            return (
                <Fragment>
                    <MyTextInput name="webUrl" label="Enter source url" onChange={e => handleChange(e,index)} ></MyTextInput>
                    <MyTextInput name="webTitle" label="Enter a title for source" onChange={e => handleChange(e,index)}></MyTextInput>
                    <MyTextInput name="webDescription" label="Enter source description" onChange={e => handleChange(e,index)}></MyTextInput>
                </Fragment>
            );
        }
        else {
            return null;
        }
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <MyTextInput label="What would you like to name the topic ?" name="topicName" onChange={e => handleChange(e)}>
            </MyTextInput>
            <MyTextInput label="Enter topic description" name="topicDescription" onChange={e => handleChange(e)} ></MyTextInput>
            <MySelect name="resourceType" label="What type of content would you like to contribute ?" onChange={e => handleChange(e)}>
                <option value="Components">Components</option>
                <option value="Self-Service Tools">Self-Service Tools</option>
                <option value="Documentation">Documentation</option>
                <option value="Events">Events</option>
                <option value="Repositories">Repositories</option>
            </MySelect>
            {inputFields.map((inputField, index) => (
                <Fragment key={`${inputField}~${index}`}>
                    <MySelect name="sourceType" label="Select sourcetype for your data" value={inputField.sourceType} onChange={e => handleChange(e, index)}>
                        <option value="">Select Source type</option>
                        <option value="web">Web</option>
                        <option value="github">Github</option>
                    </MySelect>
                    <button onClick={() => handleAddFields()}><FontAwesomeIcon icon={faPlus} /></button>
                    <button onClick={() =>handleRemoveFields(index)}><FontAwesomeIcon icon={faMinus} /></button>
                    {LoadSubForm(index)}
                </Fragment>
            ))}
            <button type="Submit">Submit</button>
        </form>
    );
}

export default TopicForm;