// custom hook which is required to build to fetch our data
import { useSession } from '@clerk/clerk-react'
import { useState } from 'react';

export const useFetch=(callback , options={})=>{
    const [data , setdata]=useState(undefined);
    const [loading ,setloading]=useState(null);
    const [error , seterror]=useState(null);
    
    const {session}=useSession();

    const fn=async (...args)=>{
        setloading(true);
        seterror(null);

        try{
            const supabaseaccessstoken=await session.getToken({
                template:'supabase'
              })
              const response=await callback(supabaseaccessstoken , options , ...args);
              setdata(response);
              seterror(null);
        }
        catch(err){
            console.error('Error in fetching data', err);
            seterror(err);
        }
        finally{
            setloading(false);
        }
    }
    return {fn , data , loading , error}
}