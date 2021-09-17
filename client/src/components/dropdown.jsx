import React, { useState } from 'react';

function Dropdown({ options, returnSelected }) {
  const [selected, setSelected] = useState(null);
  function handleChange(e) {
    setSelected(e.target.value);
  }

  function returnSelectedHandler() {
    const selectedValue = options.find((c) => c._id === selected);
    returnSelected(selectedValue);
  }
  return (
    <>
      <select className='b pa1 ba b--black bg-transparent grow pointer f6' onChange={handleChange}>
        <option>Add to Potential Candidates</option>
        {options &&
          options.map((c) => (
            <option key={c._id} value={c._id}>
              {c.firstName} {c.lastName}
            </option>
          ))}
      </select>
      <button
        type='button'
        className='b ph3 pv1 input-reset ba b--black bg-transparent grow pointer f6 ma2'
        onClick={returnSelectedHandler}
      >
        Add
      </button>
    </>
  );
}
export default Dropdown;
