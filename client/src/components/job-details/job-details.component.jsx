import React from 'react';

import Button from '../button';
import Dropdown from '../dropdown';
import { candidateFields } from '../../constants';
import Table from '../table';
import Candidate from '../candidates/candidate';

export default function JobDetails({
  job,
  candidates,
  handleDelete,
  handleAdd,
  handleDeleteCandidate,
}) {
  const reverseCandidates = [...job.candidates].reverse();
  const candidateComponent = (
    <Candidate
      isJob={true}
      jobId={job._id}
      handleDelete={handleDeleteCandidate}
    />
  );

  return (
    <div className='measure center'>
      <div>
        <h4 className='f4 tc'>{job.title}</h4>
        <hr className='mw3 bb bw1 b--black-10'></hr>
        <p className='ws-normal lh-copy measure center f6 black-70'>
          {job.description}
        </p>
      </div>
      <div>
        <a href={`/jobs/edit/${job._id}`}>
          <Button text='Edit' color='green' />
        </a>

        <a href={'/jobs'} onClick={handleDelete}>
          <Button text='Delete' color='red' />
        </a>
      </div>
      <Dropdown returnSelected={handleAdd} options={candidates} />
      {job.candidates.length > 0 ? (
        <>
          <h2 className='measure center'>Potential Candidates</h2>
          <Table
            elements={reverseCandidates}
            fields={candidateFields}
            component={candidateComponent}
          />
        </>
      ) : (
        <p className='ws-normal lh-copy measure center f6'>
          No selected candidates
        </p>
      )}
    </div>
  );
}
