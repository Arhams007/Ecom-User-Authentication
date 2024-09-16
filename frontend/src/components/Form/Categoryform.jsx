import React from 'react';

const Categoryform = ({ handleSubmit, value, setValue,setShowForm }) => {
  return (
    <div className='absolute p-4 gg shadow-xl rounded-xl left-1/4 top-1/4 w-96 h-96  flex justify-center items-center '>

        <div className='absolute top-1 cursor-pointer font-bold text-4xl right-10' onClick={() => setShowForm(false)}>X</div>
    <div className=''>
      <form onSubmit={handleSubmit}>
        <input className='border-2 rounded-lg p-2'
          type="text"
          placeholder="Enter new category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          />
        <button className='bg-blue-600 rounded-lg p-2 mx-2' type="submit">Submit</button>
      </form>
    </div>
          </div>
  );
};

export const EditForm = ({setVisibale,handleSubmit,setValue,value})=>{
return(
    <div className='absolute p-4 gg shadow-xl rounded-xl left-1/4 top-1/4 w-96 h-96  flex justify-center items-center '>

    <div className='absolute top-1 cursor-pointer font-bold text-4xl right-10' onClick={() => setVisibale(false)}>X</div>
<div className=''>
  <form 
  onSubmit={handleSubmit}
  >
    <input className='border-2 rounded-lg p-2'
      type="text"
      placeholder="Enter new category"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      />
    <button className='bg-blue-600 rounded-lg p-2 mx-2' type="submit">Submit</button>
  </form>
</div>
      </div>
)
}


export default Categoryform;
