import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  deleteJob,
  getJobById,
  addCandidateToJob,
  deleteCandidateFromJob,
} from '../../requests/jobsApi';
import { getAllCandidates } from '../../requests/candidatesApi';
import JobDetails from './job-details.component';
import { getAllInterviews } from '../../requests/interviewsApi';

export default function JobDetailsContainer() {
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    Promise.all([getJobById(id), getAllCandidates(), getAllInterviews()]).then(
      (response) => {
        setJob(response[0].data);
        const freeCandidates = response[1].data
          .filter(
            (c) => !response[0].data.candidates.find((c2) => c._id === c2._id)
          )
          .filter((c) => !response[2].data.find((c2) => c._id === c2.candidateId));
        setCandidates(freeCandidates);
      }
    );
  }, [id]);

  const handleDeleteJob = () => {
    try {
      deleteJob(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCandidate = (candidateId) => {
    try {
      deleteCandidateFromJob(id, candidateId);

      const candidate = job.candidates.find((pc) => pc._id === candidateId);
      const copyAvailableCandidates = [...candidates];
      copyAvailableCandidates.push(candidate);
      setCandidates(copyAvailableCandidates);

      const copyPotentialCandidates = job.candidates.filter(
        (pc) => pc._id !== candidateId
      );
      const copyJob = Object.assign({}, job);
      copyJob.candidates = copyPotentialCandidates;
      setJob(copyJob);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCandidate = (candidate) => {
    try {
      const copyAvailableCandidates = [...candidates];
      const potentialCandidate = copyAvailableCandidates.splice(
        copyAvailableCandidates.indexOf(candidate),
        1
      );
      setCandidates(copyAvailableCandidates);

      addCandidateToJob(id, { candidateId: candidate._id });
      const copyPotentialCandidates = [
        ...job.candidates,
        potentialCandidate[0],
      ];
      const copyJob = Object.assign({}, job);
      copyJob.candidates = copyPotentialCandidates;
      setJob(copyJob);
    } catch (err) {
      console.log(err);
    }
  };

  if (job && candidates) {
    return (
      <JobDetails
        job={job}
        candidates={candidates}
        handleDelete={handleDeleteJob}
        handleAdd={handleAddCandidate}
        handleDeleteCandidate={handleDeleteCandidate}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
}
