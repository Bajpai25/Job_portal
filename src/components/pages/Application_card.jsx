import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Boxes, BriefcaseBusiness, Download, School } from 'lucide-react'
import { useFetch } from '@/hooks/Usefetch'
import { updateApplications } from '@/api/Api_functions'
import Jobs from './Jobs'
import { BarLoader } from 'react-spinners'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from 'react-router-dom'

const Application_card = ({application , isCandidate=false}) => {

  const {loading : update_loading , fn:fnupdateapplications }=useFetch(
    updateApplications,{
      job_id:application.job_id
    }
  )
  console.log(application)

  const handlestatus=(status)=>{
    fnupdateapplications(status)
    console.log(status);
  }
 


// here what we are doing is that when we will click on the downlpad button then an anchor tag will be created and the link will have the resume data in it now the link.target will take the user to the new page for downloading the user and then click on the dowload to download the resume 

  return (
    <Card className="my-4">
      {update_loading && <BarLoader width={"100%"} color="#36d7b7" />}
      <CardHeader>
        <CardTitle className="flex justify-between mx-4">
          {isCandidate ?   `${application?.job?.title} at ${application?.job?.companies?.name_at} ` : application?.name} 

         <Link to={application?.resume}><Download size={18} className='bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer'/></Link> 

        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 gap-4">
        <div className='sm:flex sm:flex-row sm:justify-between mx-2 flex flex-col items-start '>
        <div className='flex items-center gap-2'>
          <School size={15}/>
          Education : {application?.education}
        </div> 
        <div className='flex items-center gap-2'>
          <Boxes size={15}/>
         Skills : {application?.skills} 
        </div> 
        </div>
        <hr/>
        <CardFooter className="sm:flex sm:flex-row sm:justify-between flex flex-col items-start gap-2">
          <span className='font-bold capitalize'>{new Date(application?.created_at).toLocaleString()}</span>
          {isCandidate ?(
            <span>Status : {application?.status}</span>
          ) :
          (
            <Select onValueChange={handlestatus} defaultValue={application?.status}>
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Application Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied" >Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  )
}

export default Application_card
