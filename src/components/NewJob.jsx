/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Form, FormField, Button, TextInput, Select,
} from 'grommet';
import axios from 'axios';
import API_URL from '../utils/appUtils';

const NewJob = () => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [skillNeeded, setSkillsNeeded] = useState([]);
  const [interview, setInterview] = useState('Interviewed?');


  const postJob = async () => {
    const jobInfo = {
      company,
      position,
      applicationDate,
      skillNeeded,
      interview: interview === 'True',
    };
    const url = `${API_URL}jobs`;
    const jobToPost = axios.post(url, jobInfo);
    setInterview('');
    setPosition('');
    setSkillsNeeded('');
    setCompany('');
    setApplicationDate('');
  };


  return (
    <Form onSubmit={postJob}>
      <FormField>
        <TextInput
          value={company}
          placeholder="Company Name"
          required
          onChange={(e) => setCompany(e.target.value)}
        />
      </FormField>
      <FormField>
        <TextInput
          value={position}
          placeholder="Position Applied"
          required
          onChange={(e) => setPosition(e.target.value)}
        />
      </FormField>
      <FormField>
        <TextInput
          value={applicationDate}
          placeholder="MM/DD/YY or 'Today'"
          required
          onChange={(e) => setApplicationDate(e.target.value)}
        />
      </FormField>
      <FormField>
        <TextInput
          value={skillNeeded}
          placeholder="Skills Needed"
          required
          onChange={(e) => setSkillsNeeded(e.target.value)}
        />
      </FormField>
      <Select
        label="Interviewed"
        options={['True', 'False']}
        value={interview}
        required
        onChange={({ option }) => setInterview(option)}
      />
      <Button
        type="submit"
        label="Post Job"
      />
    </Form>
  );
};


export default NewJob;
