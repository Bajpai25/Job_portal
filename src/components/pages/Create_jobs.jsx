import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useFetch } from '@/hooks/Usefetch'
import { getmy_jobs } from '@/api/Api_functions';
import { BarLoader } from 'react-spinners';
import Jobs_card from './Jobs_card';

const Create_jobs = () => {
    const {user , isLoaded}=useUser();
    const {loading:loading_my_jobs , data:my_jobs, error:myjobserror , fn:fngetmyjobs}=useFetch(getmy_jobs,{
        recruiter_id:user.id
    })

    useEffect(()=>{
        if(!loading_my_jobs){
            fngetmyjobs();
        }
    },[isLoaded])

    console.log(my_jobs);


    
  return (
    <div>
      {loading_my_jobs && <BarLoader className='mb-4' width={'100%'} color='#36d7b7'/>}
      {user?.unsafeMetadata?.role==='recruiter'  && <div className='flex flex-col gap-4 mx-6 my-10'>
      {loading_my_jobs===false  && (
      <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 my-6 mx-8 gap-6 w-auto' >
        {my_jobs?.length ? (
          my_jobs?.map((job)=>{
            return (
                <Jobs_card  job={job} onJobSaved={fngetmyjobs} key={job.id} isMyjob/>
            )
          })
        ):

        (
          <div>
            No jobs found 😭
          </div>
        )
        }
      </div>
    )}
      </div> }
      
    </div>
  )
}

export default Create_jobs
