/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Form, FormField, Button, TextInput, Select, Calendar, Box,
} from 'grommet';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../utils/appUtils';
import userAuth from '../utils/userAuth';


const NewJob = () => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [skillsNeeded, setSkillsNeeded] = useState('');
  const [interview, setInterview] = useState('Interviewed?');
  const [user, setUser] = useState(localStorage.getItem('userEmail') || null);
  const history = useHistory();

  useEffect(() => {
    const auth = async () => {
      const authResponse = await userAuth();
      if (!authResponse) history.push('/');
    };
    auth();
  }, [history]);

  const postJob = async () => {
    const authResponse = await userAuth();
    if (authResponse) {
      const jobInfo = {
        company,
        position,
        applicationDate: !applicationDate ? new Date() : applicationDate,
        skillsNeeded: skillsNeeded.split(','),
        interview: interview === 'True',
        user,
      };
      const url = `${API_URL}jobs`;
      const jobToPost = axios.post(url, jobInfo);
      setInterview('');
      setPosition('');
      setSkillsNeeded('');
      setCompany('');
      setApplicationDate('');
      history.push('/myjobs');
    } else {
      history.push('/');
    }
  };


  return (
    <Box
      direction="column"
      margin={{
        horizontal: 'auto',
        top: 'small',
      }}
      responsive
      align="center"
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
            onChange={({ option }) => setInterview(option)}
          />
        </FormField>
        <Box
          direction="row"
          justify="center"
        >
          <Button
            type="button"
            label="Cancel"
            href="/myjobs"
            margin="small"
          />
          <Button
            type="submit"
            label="Post Job"
            margin="small"
          />
        </Box>

      </Form>
    </Box>
  );
};


export default NewJob;
