import { useFetch } from "@/hooks/Usefetch";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { getsinglejob ,updatesinglejob } from "@/api/Api_functions";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { BriefcaseBusinessIcon, DoorClosed, DoorClosedIcon, DoorOpenIcon, MapPinCheckIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Apply_jobs from "./Apply_jobs";
import Application_card from "./Application_card";




const Single_Job = () => {
  const { isLoaded, user } = useUser();
  console.log(user?.unsafeMetadata.role);
  const { id } = useParams();

  const {
    loading: loading_jobs,
    data: job_data,
    fn: Single_job_data,
  } = useFetch(getsinglejob,{
    job_id:id
  }) 
  const {
    fn: updateHiring_status,
    loading:hiringloading
  } = useFetch(updatesinglejob, {
    job_id: id,
  });

  const handlehiring=(value)=>{
    const isOpen=value==='open';
    updateHiring_status(isOpen).then(()=>Single_job_data())
  }
  useEffect(()=>{
    if(isLoaded){
        Single_job_data()
    }
  },[isLoaded])

  // Display the loader while data is being fetched
  if (loading_jobs || !job_data) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  

  return (
    <div className="px-8">
      {/* Render job data if it exists */}
      {job_data && (
        <div>
        <div className="md:flex md:flex-row md:justify-between  flex flex-col itemse-center gap-4 ">
          <h1 className="md:text-6xl text-3xl font-bold font-sans">{job_data.title}</h1>
          <div className="flex flex-col my-6">
            <img
              src={job_data?.companies?.logo_url}
              alt="company_image" className="sm:w-[160px] w-1/2 h-auto sm:h-12 "
            />
          </div>
        </div>
        {hiringloading &&<BarLoader className="mb-4" width={"100%"} color="#36d7b7" /> }
        {job_data?.recruiter_id===user?.id && (
            <Select onValueChange={handlehiring}>
                <SelectTrigger className={`w-full ${job_data?.is_open ? 'bg-green-700' : 'bg-red-700'}`}>
                  <SelectValue placeholder={'Hiring Status' + (job_data?.is_open ? '(Open)' : '(Closed)')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
        )}
        <div>
        <div className='md:flex md:flex-row gap-4 my-6 md:justify-between flex flex-col  '>
            <div className="flex flex-row gap-2"><MapPinCheckIcon></MapPinCheckIcon><h1>{job_data.location}</h1></div>
        <div className="flex flex-row gap-2">
        <BriefcaseBusinessIcon></BriefcaseBusinessIcon>
        {job_data.applied_details && (
          <h1>{job_data.applied_details.length} applicants</h1> 
        )}    
        </div>
        
            {job_data?.is_open ? (
                <div className="flex flex-row gap-2">
                <DoorOpenIcon></DoorOpenIcon>
                <h1>Open</h1>
                </div>
            )
        :
        (
            <div className="flex flex-row gap-2">
               <DoorClosedIcon></DoorClosedIcon>
                <h1>Closed</h1>
                </div>
        )}  
        </div>
        
        </div>
        <div className="my-12 sm:w-3/4 w-auto">
            <h1 className="sm:text-3xl text-xl font-bold font-sans text-white ">About the Job</h1>
            <div className="sm:text-xl text-lg font-sans font-normal py-4 "> 
            {job_data.requirement}
            </div>
        </div>
        <div className="my-12 sm:w-3/4 w-auto">
            <h1 className="sm:text-3xl text-xl font-bold font-sans text-white ">What we are looking for</h1>
            <div className="sm:text-xl text-lg font-sans font-normal py-4 "> 
           {job_data?.description}
            </div>
        </div>
        </div>
      )}
{/* 
      {render the applications} */}
      <div className="my-8 ">
      {user?.unsafeMetadata?.role==='candidate' && (
        <Apply_jobs job={job_data} user={user} fetchJob={Single_job_data} 
        applied={job_data?.applied_details.find((ap)=>ap.candidate_id==user.id)}/>
      )}
      </div>

       {/* render the applications  */}

       {job_data?.recruiter_id===user?.id && job_data?.applied_details.length>0 && (
        <div className="flex flex-col gap-2">
         <h2 className="sm:text-4xl text-2xl font-bold font-sans">Applications</h2>
         {job_data?.applied_details.map((application)=>{
          return (

              <Application_card application={application} key={application.id}>

              </Application_card>
            
          )
         })} 
        </div>
       )}

    </div>
  );
};

export default Single_Job;
