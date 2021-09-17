export default function JobForm({title, description, handleSubmit, handleChange}) {
  return (
    <form className='measure center' onSubmit={handleSubmit}>
      <label className='f6 b db mb2'>Title:</label>
      <input
        className='pa2 input-reset ba bg-transparent w-100 measure'
        type='text'
        name='title'
        value={title}
        onChange={handleChange}
      />

      <label className='f6 b db mb2'>Description:</label>
      <textarea
        className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2'
        name='description'
        value={description}
        onChange={handleChange}
      />
      <input
        className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6'
        type='submit'
        value='Submit'
      />
    </form>
  );
}
