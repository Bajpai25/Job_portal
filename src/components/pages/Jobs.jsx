import React,{useEffect, useState} from 'react'
import { useFetch } from '@/hooks/Usefetch'
import { fetch_job_data } from '@/api/Api_functions'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'
import Jobs_card from './Jobs_card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { fetchcompanies } from '@/api/Api_companies'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { State } from 'country-state-city'


const Jobs = () => {
  const {isLoaded}=useUser();

  const [searchQuery,setsearchquery]=useState('');
  const [location,setlocation]=useState('');
  const [company_id,setcompany_id]=useState('');

   const {
    fn:function_jobs ,
    data:data_jobs,
    loading:loading_jobs,
   }= useFetch(fetch_job_data , {
    location,company_id,searchQuery
   })

  useEffect(()=>{
    if(isLoaded)function_jobs();
  },[isLoaded,location,company_id,searchQuery])

  
  const {
    fn:fetch_companies_data,
    data:company_data,
  }=useFetch(fetchcompanies);

  useEffect(()=>{
    if(isLoaded) fetch_companies_data();
  },[isLoaded])

  if(!isLoaded){
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/> 
  }

  const handlequery=(e)=>{
      e.preventDefault();
      let formdata=new FormData(e.target);
      let query=formdata.get('search-query');
      if(query) setsearchquery(query);
  }
  const clearFilter=()=>{
    setcompany_id('');
    setlocation('');
    setsearchquery('');
  }

  return (
    <div >
    <h2 className='py-8 text-center text-6xl font-sans font-bold text-white'>Latest Jobs</h2>
    {/* // addfilters */}
    <form onSubmit={handlequery} className='flex flex-row gap-4 my-4 mx-8 '>
      <Input type="text" placeholder="Search for your job role" name="search-query" className="w-full h-14 rounded-md"/>
      <Button variant="primary" className="rounded-md h-14 px-8">Search</Button>
    </form>

    {/* // apply the varoius filters */}
    <div className='mx-8 my-3 sm:flex sm:flex-row flex flex-col  gap-4'>
    <Select value={location}  onValueChange={(value)=>{
      setlocation(value)
    }}>
      <SelectTrigger className="">
        <SelectValue placeholder="Filter by Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {State.getStatesOfCountry('IN').map((name)=>{
            return (
              <SelectItem value={name.name} key={name.name}>{name.name}</SelectItem>
            )
          })}
          </SelectGroup>
        
      </SelectContent>
    </Select>
    <Select value={company_id} onValueChange={(value)=>{
      setcompany_id(value) && console.log(value);
    }}>
      <SelectTrigger className="">
        <SelectValue placeholder="Filter by Company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {company_data?.length>0 &&(
            company_data.map((company)=>{
              return (
                <SelectItem key={company} value={company.id}>
                  {company.name_at}
                </SelectItem>
              )
            })
          )}
          </SelectGroup>
        
      </SelectContent>
    </Select>
    {/* // button to clear the filters */}
    <Button variant="destructive" onClick={clearFilter} className="sm:w-1/2">Clear filters</Button>
    </div>

    {loading_jobs && (
      <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/> 
    )}

    {loading_jobs===false  && (
      <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 my-6 mx-8 gap-6 w-auto' >
        {data_jobs?.length ? (
          data_jobs.map((job)=>{
            return (
                <Jobs_card  job={job} key={job.id} saved_data={job?.saved?.length>0}/>
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
    </div>
  )
}

export default Jobs