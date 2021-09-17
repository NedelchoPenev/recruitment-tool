import React, { useEffect, useState } from 'react';

import { deleteCandidate, getAllCandidates } from '../requests/candidatesApi';
import Button from '../components/button';
import Candidate from '../components/candidates/candidate';
import Table from '../components/table';
import { candidateFields } from '../constants';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState(null);
  useEffect(() => {
    getAllCandidates().then((res) => {
      if (res.status === 200) {
        setCandidates(res.data.reverse());
      }
    });
  }, []);

  const handleDelete = (candidateId) => {
    try {
      deleteCandidate(candidateId)
      const withoutDeleted = candidates.filter(c => c._id !== candidateId)
      setCandidates(withoutDeleted)
    } catch (err) {
      console.log(err);
    }
  };

  const candidateComponent = <Candidate isJob={false} handleDelete={handleDelete} />

  return (
    <div>
      <div className='flex justify-center ma3'>
        <a href='/candidates/add'>
          <Button text='Add Candidate' color='green' />
        </a>
      </div>
      <div className='mw7 center'>
        {candidates && candidates.length > 0? (
          <Table elements={candidates} fields={candidateFields} component={candidateComponent}/>
        ) : (
          <div className='measure center ma3 tc'>No Candidates Yet</div>
        )}
      </div>
    </div>
  );
}
