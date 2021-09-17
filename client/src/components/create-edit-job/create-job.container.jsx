import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';

import { postJob } from '../../requests/jobsApi';
import JobForm from './job-form';

export default function CreateJobContainer() {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === '' || description.trim() === '') {
      return store.addNotification({
        title: 'Title and description are mandatory!',
        message: 'Please, use descriptive title and description!',
        type: 'warning',
        container: 'top-right',
        dismiss: { duration: 4000 },
      });
    }
    try {
      const response = await postJob({ title, description });
      if (response.status === 200) {
        history.push('/jobs/all');
      }
      store.addNotification({
        title: `${title} created!`,
        message: 'Successfully created new job opportunity.',
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
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  return (
    <div className='measure center'>
      <h3 className='f4 fw6 ph0 mh0'>Create Job</h3>
      <JobForm
        title={title}
        description={description}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
}
