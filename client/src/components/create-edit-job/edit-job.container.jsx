import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { store } from 'react-notifications-component';

import { updateJob, getJobById } from '../../requests/jobsApi';
import JobForm from './job-form';

export default function EditJobContainer() {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { id } = useParams();
  useEffect(() => {
    getJobById(id)
      .then((res) => {
        if (res.status === 200) {
          setTitle(res.data.title);
          setDescription(res.data.description);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

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
      const response = await updateJob(id, { title, description });
      if (response.status === 200) {
        history.push(`/job/details/${id}`);
      }
      store.addNotification({
        title: `${title} edited`,
        message: 'Successfully edited job opportunity.',
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
      <h3 className='f4 fw6 ph0 mh0'>Edit Job</h3>
      <JobForm
        title={title}
        description={description}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
}
