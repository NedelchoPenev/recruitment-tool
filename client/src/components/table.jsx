import React from 'react';

export default function Table({ elements, component, fields }) {
  return (
    <div className='pv2'>
      <div className='overflow-auto'>
        <table className='f6 w-100 mw8 center' cellSpacing='0'>
          <thead>
            <tr>
              <th className='fw6 bb b--black-20 tl pa1 bg-white tc'>
                {fields.first}
              </th>
              <th className='fw6 bb b--black-20 tl pa1 bg-white tc'>
                {fields.second}
              </th>
              <th className='fw6 bb b--black-20 tl pa1 bg-white tc'>
                {fields.third}
              </th>
              <th className='fw6 bb b--black-20 tl pa1 bg-white tc'>Actions</th>
            </tr>
          </thead>
          <tbody className='lh-copy'>
            {elements.map((e) =>
              React.cloneElement(component, {
                key: e._id,
                element: e
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
