import React ,{useEffect} from 'react'
import { useUser } from '@clerk/clerk-react'
import {BarLoader} from "react-spinners"
import { Button } from '../ui/button'
import { useNavigate,Navigate } from 'react-router-dom'
const Onboarding = () => {
  const {user , isLoaded}=useUser()
  const navigate=useNavigate();
 
  // changing the role of the user in clerk db

  async function handlerole(role){
    console.log(role);
    await user.update({
      unsafeMetadata:{role}
    })
    .then(()=>{
      navigate(role==='recruiter' ? "/jobs/post-job" : "/jobs");
    })
    .catch((err)=>{
      console.log(err);
    }
  )
  }
   // once the user onboards the he/she cant access any other non authorized pages
   useEffect(()=>{
       if(user?.unsafeMetadata.role){
        navigate(
          user.unsafeMetadata.role==="recruiter" ? "/jobs/post-job" : "/jobs"
        );
       }
   },[user])


   if(!isLoaded){
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/> 
  }

  return (
    <div>
      <h2 className='py-28 text-center text-6xl font-sans font-bold text-white'>I am a ...</h2>
      <div className='flex justify-center itemse-center gap-8'>
        <Button onClick={()=>{handlerole('candidate')}} variant="primary" size="big" className="w-1/4 sm:text-xl" >Candidate</Button>
        <Button  onClick={()=>{handlerole('recruiter')}} variant="destructive" size="big" className="w-1/4 sm:text-xl">Recruiter</Button>
      </div>
    </div>
  )
}

export default Onboarding