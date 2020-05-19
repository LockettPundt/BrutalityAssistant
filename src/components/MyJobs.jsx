import React, { useState, useEffect } from 'react';
import { Box } from 'grommet';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../utils/appUtils';


const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);
  const history = useHistory();

  useEffect(() => {
    const getJobs = async () => {
      const response = await axios.post(`${API_URL}jobs/getjobs`, { user: userEmail });
      // console.log('this is the response', response);
      setJobs([...response.data.map((job) => (
        <Box>
          {job.company}
        </Box>
      ))]);
    };

    if (userEmail) getJobs();
    else history.push('/');
  }, []);


  return (
    <Box
      margin={{
        horizontal: 'auto',
        top: 'xlarge',
      }}
      responsive
      width="medium"
      line-height="medium"
    >
      <h3>Hi there here are the jobs you have applied for.</h3>
      <Box
        direction="column"
      >
        {jobs}
      </Box>
    </Box>
  );
};


export default MyJobs;
