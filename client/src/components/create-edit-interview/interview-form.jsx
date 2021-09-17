import React from 'react';

export default function InterviewForm({
  jobTitle,
  candidateName,
  slot,
  handleSubmit,
  handleChange,
}) {
  return (
    <form className='measure center' onSubmit={handleSubmit}>
      <label className='f6 b db mb2'>Job:</label>
      <p className='pa2 ba bg-transparent w-100 measure'>{jobTitle}</p>
      <label className='f6 b db mb2'>Candidate:</label>
      <p className='pa2 ba bg-transparent w-100 measure'>{candidateName}</p>
      <label className='f6 b db mb2'>Slot:</label>
      <input
        className='pa2 input-reset ba bg-transparent w-100 measure'
        type='number'
        name='slot'
        value={slot}
        onChange={handleChange}
      />
      <input
        className='b ph3 pv2 mv2 input-reset ba b--black bg-transparent grow pointer f6'
        type='submit'
        value='Confirm'
      />
    </form>
  );
}
