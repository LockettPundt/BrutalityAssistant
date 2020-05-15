/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Form, FormField, Button, TextInput, Select, Calendar, Box,
} from 'grommet';
import axios from 'axios';
import API_URL from '../utils/appUtils';

const NewJob = () => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [skillsNeeded, setSkillsNeeded] = useState([]);
  const [interview, setInterview] = useState('Interviewed?');


  const postJob = async () => {
    const jobInfo = {
      company,
      position,
      applicationDate: !applicationDate ? new Date() : applicationDate,
      skillsNeeded: skillsNeeded.split(','),
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
    <Box
      direction="column"
      margin={{
        horizontal: 'auto',
        top: 'xlarge',
      }}
      responsive
      width="medium"
    >
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
          <Calendar
            size="small"
          // alignSelf="center"
            margin="small"
            required
            onSelect={(e) => setApplicationDate(e)}
          />
        </FormField>
        <FormField>
          <TextInput
            value={skillsNeeded}
            placeholder="Skills Needed"
            required
            onChange={(e) => setSkillsNeeded(e.target.value)}
          />
        </FormField>
        <FormField>
          <Select
            placeholder="Interviewed?"
            options={['True', 'False']}
            value={interview}
            required
            onChange={({ option }) => setInterview(option)}
          />
        </FormField>
        <Button
          type="submit"
          label="Post Job"
        />
      </Form>
    </Box>
  );
};


export default NewJob;
