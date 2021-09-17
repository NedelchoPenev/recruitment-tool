import React from 'react';
import Button from './button';

export default function Job({ job: { _id, title, description } }) {
  return (
    <div className='fl w-30 pa1 ma1 mw5 bg-white br3 ba'>
      <div>
        <h4 className='f4 tc'>{title}</h4>
        <hr className='mw3 bb bw1 b--black-10'></hr>
        <p className='lh-copy measure center f6 black-70 pa2'>
          {description.length > 30
            ? description.substring(0, 30) + '...'
            : description}
        </p>
      </div>
      <div className='flex justify-center'>
        <a href={`/job/details/${_id}`}>
          <Button text='Details' />
        </a>
      </div>
    </div>
  );
}
