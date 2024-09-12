import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners';
import Create_applications from './Create_applications';
import Create_jobs from './Create_jobs';

const My_jobs = () => {

  const {user ,isLoaded}=useUser();

  if(!isLoaded){
    return <BarLoader className='mb-4' width={'100%'} color='#36d7b7'/>
  }
  return (
    <div>
      <h1 className="sm:text-7xl text-center text-5xl font-bold font-sans pb-8">
       {user?.unsafeMetadata?.role==='candidate' ? "My Application" : "My Jobs"} 
      </h1>
      {user?.unsafeMetadata?.role==='candidate' ? (
        <Create_applications/>
      ):
      (
        <Create_jobs/>
      )}
    </div>
  )
}

export default My_jobs