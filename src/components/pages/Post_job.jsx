import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useFetch } from '@/hooks/Usefetch';
import { useUser } from '@clerk/clerk-react';
import { addNewJob } from '@/api/Api_companies';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { State } from 'country-state-city';
import { fetchcompanies } from '@/api/Api_companies';
import { BarLoader } from 'react-spinners';
import { Navigate, useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '../ui/button';
import Add_company from './Add_company';

const schema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  company_id: z.string().min(1, { message: 'Select or add a new company' }),
  location: z.string().min(1, { message: 'Select a location' }),
  requirement: z.string().min(1, { message: 'Requirements are required' }),
});

const Post_job = () => {
  const { isLoaded, user } = useUser();

  const {
    fn: fetch_companies_data,
    data: company_data,
    loading: loadingCompanies,
  } = useFetch(fetchcompanies);

  const {
    fn: fetch_create_job,
    data: new_data,
    loading: loadingCreatejobs,
  } = useFetch(addNewJob);


  const onSubmit=(data)=>{
    console.log(data);
    fetch_create_job({
      ...data,
      recruiter_id:user.id,
      is_open:true,
    })
  }
  const navigate=useNavigate();

  useEffect(()=>{
    if(new_data?.length>0){
      navigate('/jobs');
    }
  },[loadingCreatejobs])

  // Moved the useForm hook outside of conditionals
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: '',
      company_id: '',
      requirement: '',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isLoaded) fetch_companies_data();
  }, [isLoaded]);

  // Conditional render outside of hook usage
  if (!isLoaded || loadingCompanies) {
    return <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />;
  }

  if (user?.unsafeMetadata?.role !== 'recruiter') {
    return <Navigate to='/jobs' />;
  }

  return (
    <div className="">
      <h1 className="sm:text-7xl text-center text-5xl font-bold font-sans pb-8">
        Post a Job
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-8 flex flex-col gap-4"
      >
        <Input placeholder="Job title" {...register("title")} />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-600">{errors.description.message}</p>
        )}
        <div className="flex flex-row items-center gap-4">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map((name) => (
                      <SelectItem value={name.name} key={name.name}>
                        {name.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          ></Controller>
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Company">
                    {field.value
                      ? company_data?.find(
                          (com) => com.id === Number(field.value)
                        )?.name_at
                      : "Companies"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {company_data?.length > 0 &&
                      company_data.map((company) => (
                        <SelectItem key={company} value={company.id}>
                          {company.name_at}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          ></Controller>
        </div>
        <div>
          <div>
            <Add_company fetch_companies_data={fetch_companies_data}/>
          </div>
        </div>
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500">{errors.company_id.message}</p>
        )}
        <Controller
          name="requirement" // Ensure the name matches the form schema
          control={control}
          render={({ field }) => (
            <MDEditor
              value={field.value || ""} // Ensure there's always a string (empty string initially)
              onChange={field.onChange}
            />
          )}
        />
        {errors.requirement && (
          <p className="text-red-500">{errors.requirement.message}</p>
        )}

        {loadingCreatejobs && (
          <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
        )}
        <Button
          variant="primary"
          className="h-14 w-auto rouned-md py-4 text-lg"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Post_job;
