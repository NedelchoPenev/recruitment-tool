import React, { useEffect, useState } from 'react';
import Button from '../components/button';
import JobCard from '../components/job-card';
import { getAllJobs } from '../requests/jobsApi';

export default function JobsPage() {
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    getAllJobs().then((res) => {
      if (res.status === 200) {
        setJobs(res.data.reverse());
      }
    });
  }, []);

  return (
    <div>
      <div className='flex justify-center ma3'>
        <a href='/jobs/create'>
          <Button text='Create Job' color='green' />
        </a>
      </div>
      <div className='mw7 center'>
        {jobs && jobs.length > 0 ? (
          jobs.map((j) => <JobCard key={j._id} job={j} />)
        ) : (
          <div className='measure center ma3 tc'>No Jobs Yet</div>
        )}
      </div>
    </div>
  );
}
