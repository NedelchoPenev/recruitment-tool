import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../button';

export default function Candidate({ element, isJob, jobId, handleDelete }) {
  const history = useHistory();
  return (
    <tr>
      <td className='pa1 tc bb b--black-20'>{element.firstName}</td>
      <td className='pa1 tc bb b--black-20'>{element.lastName}</td>
      <td className='pa1 tc bb b--black-20'>{element.email}</td>
      <td className='pa1 tc bb b--black-20'>
        {isJob ? (
          <Button
            onClick={() =>
              history.push(`/interview/create/${jobId}/${element._id}`)
            }
            text='Book'
            color='blue'
          />
        ) : (
          <a href={`/candidates/edit/${element._id}`}>
            <Button text='Edit' color='blue' />
          </a>
        )}
        <Button
          onClick={() => handleDelete(element._id)}
          text='Delete'
          color='red'
        />
      </td>
    </tr>
  );
}
