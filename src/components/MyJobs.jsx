/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */


import React, { useState, useEffect } from 'react';
import {
  Box, DataTable, Button, Text,
} from 'grommet';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../utils/appUtils';
import userAuth from '../utils/userAuth';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);
  const history = useHistory();
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const resizeWindow = () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    const getJobs = async (email) => {
      const response = await axios.post(`${API_URL}jobs/getjobs`, { user: email });
      setJobs([...response.data.map((job) => (
        {
          company: job.company,
          position: job.position,
          date: job.applicationDate,
          skillsNeeded: job.skillsNeeded,
          interview: job.interview ? 'Yes' : 'No',
          update: `/updatejob/${job._id}`,
        }
      ))]);
    };
    const auth = async () => {
      const response = await userAuth();
      if (response) getJobs(response.data.authorizedData.UserInfo.email);
      else history.push('/');
    };
    auth();
  }, [history]);

  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  });

  const jobCards = jobs.map((job) => (
    <Box
      background="pink"
      pad="medium"
      round="xsmall"
      overflow="visible"
      responsive
      margin={{
        vertical: 'small',
        horizontal: 'small',
      }}
    >
      <Text>
        <strong>Company:</strong>
        {' '}
        {job.company}
      </Text>
      <Text>
        <strong>Position:</strong>
        {' '}
        {job.position}
      </Text>
      <Text>
        <strong>Date:</strong>
        {' '}
        {job.date}
      </Text>
      <Text>
        <strong>Skills Needed:</strong>
        {' '}
        {job.skillsNeeded}
      </Text>
      <Text>
        <strong>Interview Status:</strong>
        {' '}
        {job.interview}
      </Text>
      <Button
        margin={{
          top: 'small',
          bottom: 'small',
        }}
        color="rgb(29, 29, 29)"
        alignSelf="center"
        type="button"
        label="Update"
        href={job.update}
      />
    </Box>
  ));

  return (
    <Box
      margin={{
        horizontal: 'large',
        top: 'small',
      }}
      pad="small"
      alignSelf="center"
      responsive
    >
      {windowWidth >= 650
        ? (
          <DataTable
            responsive
            columns={[
              {
                property: 'company',
                header: <Text>Company</Text>,
                primary: true,
              },
              {
                property: 'position',
                header: <Text>Position</Text>,
              },
              {
                property: 'date',
                header: <Text>Date Applied</Text>,
              },
              {
                property: 'skillsNeeded',
                header: <Text>Skills Needed</Text>,
              },
              {
                property: 'interview',
                header: <Text>Interview</Text>,
              },
              {
                property: 'update',
                render: (update) => (
                  <Button
                    type="button"
                    label="Update"
                    href={update.update}
                  />
                ),
              },
            ]}
            data={jobs}
          />
        )
        : jobCards}
      <Button
        type="button"
        href="/newjob"
        label="New Job"
        alignSelf="center"
        margin={{
          top: 'large',
          bottom: 'medium',
        }}
      />
    </Box>
  );
};


export default MyJobs;
