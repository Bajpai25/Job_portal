import React, { useEffect } from 'react'
import { useFetch } from '@/hooks/Usefetch'
import { useUser } from '@clerk/clerk-react'
import { getsaved_jobs } from '@/api/Api_functions'
import { BarLoader } from 'react-spinners'
import Jobs_card from './Jobs_card'

const Saved_job = () => {
  const {isLoaded}=useUser();

  const {
    loading:loadigsaved_jobs,
    error: error_saved_jobs,
    data:data_saved_jobs,
    fn:fnsavedjobs
  }=useFetch(getsaved_jobs);

  useEffect(()=>{
    if(isLoaded ) fnsavedjobs();
  },[isLoaded ])

if(!isLoaded || loadigsaved_jobs){
  return <BarLoader className='mb-4' width={'100%'} color='#36d7b7'/>
}


  
  return (
    <div>
     <h1 className="sm:text-7xl text-center text-5xl font-bold font-sans pb-8">
        Saved Jobs
      </h1>
      {loadigsaved_jobs===false  && (
      <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 my-6 mx-8 gap-6 w-auto' >
        {data_saved_jobs?.length ? (
          data_saved_jobs.map((saved)=>{
            return (
                <Jobs_card  job={saved?.job} key={saved?.id}   onJobSaved={fnsavedjobs} savedInit={true}/>
            )
          })
        ):

        (
          <div>
            No Saved jobs found 😭
          </div>
        )
        }
      </div>
    )}
    </div>
  )
}

export default Saved_job
