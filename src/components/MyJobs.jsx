/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
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
      console.log('response in my jobs', response);
      if (response) getJobs(response.data.authorizedData.UserInfo.email);
      else history.push('/');
    };
    auth();
  }, [history]);


  return (
    <Box
      margin={{
        horizontal: 'auto',
        top: 'large',
      }}
      alignSelf="center"
      responsive
      width="large"
    >
      <DataTable
        responseive
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
      <Button
        type="button"
        href="/newjob"
        label="New Job"
        alignSelf="center"
        margin={{
          top: 'large',
        }}
      />
    </Box>
  );
};


export default MyJobs;
