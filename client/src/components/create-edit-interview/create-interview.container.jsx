import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';

import { getCandidateById } from '../../requests/candidatesApi';
import { addInterview, getAllInterviews } from '../../requests/interviewsApi';
import { getJobById, deleteCandidateFromJob } from '../../requests/jobsApi';

import InterviewForm from './interview-form';

export default function CreateInterviewContainer() {
  const history = useHistory();
  const { jobId, candidateId } = useParams();
  const [job, setJob] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const [interview, setInterview] = useState({
    jobId,
    candidateId,
    slot: null,
  });
  const [slots, setSlots] = useState([]);
  const availableSlots = ['1', '2', '3', '4', '5'].filter(
    (n) => !slots.includes(n)
  );

  useEffect(() => {
    Promise.all([
      getJobById(jobId),
      getCandidateById(candidateId),
      getAllInterviews(),
    ]).then((res) => {
      setJob(res[0].data);
      setCandidate(res[1].data);
      setSlots(res[2].data.map((i) => i.slot));
    });
  }, [jobId, candidateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (slots.includes(interview.slot)) {
      return store.addNotification({
        title: `Slot ${interview.slot} already taken!`,
        message: 'Please, choose from the available slots.',
        type: 'warning',
        container: 'top-right',
        dismiss: { duration: 4000 },
      });
    }
    if (!interview.slot || interview.slot > 5 || interview.slot <= 0) {
      return store.addNotification({
        title: 'The slot is mandatory!',
        message: 'Please, choose from the available slots.',
        type: 'warning',
        container: 'top-right',
        dismiss: { duration: 4000 },
      });
    }
    try {
      const response = await addInterview(interview);

      if (response.status === 200) {
        await deleteCandidateFromJob(jobId, candidateId);

        history.push(`/job/details/${jobId}`);
        store.addNotification({
          title: 'New interview created!',
          message: `Successfully invited ${
            candidate.firstName + ' ' + candidate.lastName
          } for ${job.title} interview`,
          type: 'success',
          container: 'top-right',
          dismiss: { duration: 4000 },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInterview({ ...interview, [name]: value });
  };

  return (
    <div className='measure center'>
      <h3 className='f4 fw6 ph0 mh0'>Invite Candidate for Job Interview</h3>
      {job && candidate ? (
        <>
          <InterviewForm
            jobTitle={job.title}
            candidateName={candidate.firstName + ' ' + candidate.lastName}
            slot={interview.slot}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          {availableSlots.length > 0 ? (
            <div>Available Slots: {availableSlots.join(', ')}</div>
          ) : (
            <div>You cannot book interview. No free slots!</div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
