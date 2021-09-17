export default function CandidateForm({
  firstName,
  lastName,
  email,
  handleSubmit,
  handleChange,
}) {
  return (
    <form className='measure center' onSubmit={handleSubmit}>
      <label className='f6 b db mb2'>First Name:</label>
      <input
        className='pa2 input-reset ba bg-transparent w-100 measure'
        type='text'
        name='firstName'
        value={firstName}
        onChange={handleChange}
      />
      <label className='f6 b db mb2'>Last Name:</label>
      <input
        className='pa2 input-reset ba bg-transparent w-100 measure'
        type='text'
        name='lastName'
        value={lastName}
        onChange={handleChange}
      />
      <label className='f6 b db mb2'>Email:</label>
      <input
        className='pa2 input-reset ba bg-transparent w-100 measure'
        type='text'
        name='email'
        value={email}
        onChange={handleChange}
      />
      <input
        className='b ph3 pv2 mv2 input-reset ba b--black bg-transparent grow pointer f6'
        type='submit'
        value='Submit'
      />
    </form>
  );
}
