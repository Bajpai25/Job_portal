import { useFetch } from '@/hooks/Usefetch'
import React, { useEffect } from 'react'
import { getapplications } from '@/api/Api_functions'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'
import Application_card from './Application_card'

const Create_applications = () => {
    const {isLoaded , user}=useUser()
    const {loading:loading_applications,data:applications_data , fn:fnapplications , error:applications_error}=useFetch(getapplications,{
        user_id:user.id
    })

    useEffect(()=>{
        fnapplications();
    },[])

    if(loading_applications){
        return <BarLoader className='mb-4' width={'100%'} color='#36d7b7'/>
    }
  return (
    <div>
      {loading_applications && <BarLoader className='mb-4' width={'100%'} color='#36d7b7'/>}
      <div className='flex flex-col gap-4 mx-6 my-10'>
      {applications_data?.map((application)=>{
          return (

              <Application_card application={application} key={application.id} isCandidate="true">

              </Application_card>
            
          )
         })} 
      </div>
    </div>
  )
}

export default Create_applications
