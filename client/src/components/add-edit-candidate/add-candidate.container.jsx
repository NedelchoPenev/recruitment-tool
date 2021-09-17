import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';

import { addCandidate } from '../../requests/candidatesApi';
import CandidateForm from './candidate-form';

export default function AddCandidateContainer() {
  const history = useHistory();
  const [candidate, setCandidate] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      candidate.firstName.trim() === '' ||
      candidate.lastName.trim() === '' ||
      candidate.email.trim() === ''
    ) {
      return store.addNotification({
        title: 'All fields are mandatory!',
        message: 'Please, fill the required information!',
        type: 'warning',
        container: 'top-right',
        dismiss: { duration: 4000 },
      });
    }
    try {
      const response = await addCandidate({
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
      });
      if (response.status === 200) {
        history.push('/candidates/all');
      }
      store.addNotification({
        title: `${candidate.firstName + ' ' + candidate.lastName} added`,
        message: 'Successfully added new candidate!',
        type: 'success',
        container: 'top-right',
        dismiss: { duration: 4000 },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCandidate({ ...candidate, [name]: value });
  };

  return (
    <div className='measure center'>
      <h3 className='f4 fw6 ph0 mh0'>Add Candidate</h3>
      <CandidateForm
        firstName={candidate.firstName}
        lastName={candidate.lastName}
        email={candidate.email}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
}
