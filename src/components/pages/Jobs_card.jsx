import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CardHeader, CardTitle,Card, CardContent, CardFooter } from '../ui/card';
import { Heart, MapPinCheckIcon, Trash2Icon } from 'lucide-react';
import { Button } from '../ui/button';
import { useFetch } from '@/hooks/Usefetch';
import { saveJob } from '@/api/Api_functions';
import { getsaved_jobs } from '@/api/Api_functions'
import { BarLoader } from 'react-spinners';
import { delete_jobs } from '@/api/Api_functions';
import { fetch_job_data } from '@/api/Api_functions';

const Jobs_card = (
    job,
    savedInit=false,
    isMyJob=false,
    onJobSaved=()=>{}
    ) => {
    const {user}=useUser();
    const [saved,setsaved]=useState(savedInit);
    
    const {fn:deletejobs , data:delete_data ,loading:loading_delete_jobs}=useFetch(delete_jobs,{
        job_id:job.job.id
    });

    const handledeletejobs=async()=>{
        await deletejobs() 
        onJobSaved();
    }


    const {fn:fetch_saved_jobs , data:saved_jobs  , loading:loding_saved_jobs}=useFetch(saveJob,{
        alreadySaved:saved
    });

    const {fn:fnfetch_jobs , data:jobs_data , loading:loadingjobs}=useFetch(fetch_job_data)

    useEffect(()=>{
        if(loadingjobs){
            fnfetch_jobs();
        }
    },[loadingjobs])

    const handlesave_job=async()=>{

        const updatedSavedStatus = !saved;
        await fetch_saved_jobs({
            user_id:user.id,
            job_id:job.job.id
        });
        setsaved(updatedSavedStatus);
        onJobSaved();
    }

    useEffect(()=>{
        if(saved_jobs!==undefined){
            setsaved(saved_jobs?.length>0);
        }
    },[saved_jobs])
    
    

  return (
    <Card>
      <CardHeader>
        {loading_delete_jobs ||
          (loadingjobs && (
            <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
          ))}
        <CardTitle className="flex justify-between font-bold">
          {job.job.title}
          {user?.unsafeMetadata?.role === "recruiter" &&
              (
              <Trash2Icon
                fill="red"
                size={18}
                className="text-red-400 cursor-pointer"
                onClick={handledeletejobs}
              />
            )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          {job?.job?.companies && (
            <img src={job?.job?.companies?.logo_url} className="h-6" />
          )}
          <div className="flex flex-row gap-4 mt-4 mb-4">
            <MapPinCheckIcon></MapPinCheckIcon>
            {job.job.location}
          </div>
        </div>
        <hr />
        <div className="py-4">
          {job.job.description.substring(0, job.job.description.indexOf("."))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-1 gap-4 my-2 items-center justify-center w-full">
        <Link to={`/job/${job.job.id}`} className="w-full">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handlesave_job}
            disabled={loding_saved_jobs}
          >
            {saved ? (
              <Heart fill="red" stroke="red" size={20} />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default Jobs_card