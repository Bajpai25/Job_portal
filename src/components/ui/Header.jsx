import React,{useEffect, useState} from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './button'
import { SignedIn, SignedOut, SignInButton, UserButton,SignIn } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react'
import { useUser } from '@clerk/clerk-react' 


const Header = () => {
  const [show,setshow]=useState(false);
  const {user}=useUser();
  const handleoverclick=(e)=>{
    if(e.target===e.currentTarget){
      setshow(false);
      setsearch({});
    }
  }
  const [search , setsearch]=useSearchParams();
  useEffect(()=>{
    if(search.get('sign-in')){
      setshow(true);
    }
  },[search])
  return (
    <>
      <nav className='py-4 px-6 flex justify-between items-center'>
        <Link>
        <img src="/download.png" className='h-24'/>
        </Link>
        <div className='flex gap-8'>
         <SignedOut>
          <Button variant="outline" onClick={()=>setshow(true)}>
            Login
          </Button>
        </SignedOut>
        <SignedIn>
          {user?.unsafeMetadata.role==="recruiter" && (
              <Link to="/jobs/post-job">
              <Button variant="destructive">
                <PenBox size={20} className='mr-2'/>Post a Job</Button>
              </Link>
          )
          }
        
          <UserButton appearance={{
            elements:{
              avatarBox:"w-10 h-10",
            }
          }}>
           <UserButton.MenuItems>
            <UserButton.Link label="My Jobs"
            labelIcon={<BriefcaseBusiness size={15}/>}
            href="/my-jobs"
            />
             
            <UserButton.Link label="Saved Jobs" 
            labelIcon={<Heart size={15}/>}
            href="/jobs/saved-jobs"
            />
            </UserButton.MenuItems> 
          </UserButton>
        </SignedIn>
        </div>
      </nav>
      {show && <div className='flex fixed inset-0 items-center justify-center bg-black bg-opacity-50' onClick={handleoverclick}
      >
        <SignIn signUpForceRedirectUrl='./onboarding' fallbackRedirectUrl='./onboarding'/></div>}
      </>
  )
}


export default Header
