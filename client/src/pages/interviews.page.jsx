import React, { useEffect, useState } from 'react';
import { store } from 'react-notifications-component';

import Interview from '../components/interviews/interview';
import Table from '../components/table';

import { interviewFields } from '../constants';
import { deleteCandidate, getAllCandidates } from '../requests/candidatesApi';
import { deleteInterview, getAllInterviews } from '../requests/interviewsApi';
import { deleteJob, getAllJobs } from '../requests/jobsApi';

export default function InterviewPage() {
  const [interviews, setInterviews] = useState(null);
  useEffect(() => {
    Promise.all([getAllInterviews(), getAllCandidates(), getAllJobs()])
      .then((result) => {
        const candidates = result[1].data;
        const jobs = result[2].data;
        const interviewsWithNames = result[0].data.map((i) => {
          const candidate = candidates.find((c) => c._id === i.candidateId);
          const job = jobs.find((f) => f._id === i.jobId);
          i.candidateName = candidate.firstName + ' ' + candidate.lastName;
          i.jobTitle = job.title;
          return i;
        });

        setInterviews(interviewsWithNames.sort((i1, i2) => i1.slot - i2.slot));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleReject = (interview) => {
    try {
      deleteInterview(interview._id);
      const withoutDeleted = interviews.filter((c) => c._id !== interview._id);
      setInterviews(withoutDeleted);
      store.addNotification({
        title: 'Ohh, no. Don\'t forget to send feedback!',
        message: `${interview.candidateName} has been rejected!`,
        type: 'success',
        container: 'top-right',
        dismiss: { duration: 4000 },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleApprove = (interview) => {
    const interviewsWithoutJob = interviews.filter(
      (i) => i.jobId !== interview.jobId
    );
    setInterviews(interviewsWithoutJob);
    interviews
      .filter((i) => i.jobId === interview.jobId)
      .forEach((i) => {
        deleteInterview(i._id);
      });
    deleteJob(interview.jobId);
    deleteCandidate(interview.candidateId);
    store.addNotification({
      title: 'Yey, you have a new colleague!',
      message: `${interview.candidateName} has been approved!`,
      type: 'success',
      container: 'top-right',
      dismiss: { duration: 4000 },
    });
  };

  const interviewComponent = (
    <Interview handleReject={handleReject} handleApprove={handleApprove} />
  );

  return (
    <div>
      <div className='mw7 center'>
        {interviews && interviews.length > 0 ? (
          <>
            <h3 className='flex justify-center f4 fw6'>Interviews</h3>
            <Table
              elements={interviews}
              fields={interviewFields}
              component={interviewComponent}
            />
          </>
        ) : (
          <div className='measure center ma3 tc'>No Interviews Yet</div>
        )}
      </div>
    </div>
  );
}
