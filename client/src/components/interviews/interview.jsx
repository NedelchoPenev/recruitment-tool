import React from 'react';

import Button from '../button';

export default function Interview({ element, handleReject, handleApprove }) {
  return (
    <tr>
      <td className='pa1 tc bb b--black-20'>{element.jobTitle}</td>
      <td className='pa1 tc bb b--black-20'>{element.candidateName}</td>
      <td className='pa1 tc bb b--black-20'>{element.slot}</td>
      <td className='pa1 tc bb b--black-20'>
        <Button
          onClick={() => handleApprove(element)}
          text='Approve'
          color='green'
        />
        <Button
          onClick={() => handleReject(element)}
          text='Reject'
          color='red'
        />
      </td>
    </tr>
  );
}
