import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='bt bb tc mw7 center mt4'>
      <Link
        className='f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l'
        to='/jobs/all'
      >
        Jobs
      </Link>

      <Link
        className='f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l'
        to='/candidates/all'
      >
        Candidates
      </Link>
      <Link
        className='f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l'
        to='/interviews/all'
      >
        Interviews
      </Link>
    </nav>
  );
}
