import supabaseClient from "@/utils/supabase";

export async function fetch_job_data(token, { location, company_id, searchQuery }) {
    const supabase = await supabaseClient(token);

    // Build the query with filters step by step
    let query = supabase
        .from('jobs')
        .select('*, companies:companies(name_at, logo_url), saved:saved_jobs(id)');

    // Apply location filter if provided
    if (location) {
        query = query.eq('location', location);
    }

    // Apply company_id filter if provided
    if (company_id) {
        query = query.eq('company_id', company_id);
    }

    // Apply searchQuery filter if provided
    if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
        console.log('Search query applied');
    }

    // Execute the query after applying all filters
    const { data, error } = await query;

    if (error) {
        console.error('Error fetching data:', error);
        return null;
    }

    console.log(data);
    return data;
}


export async function saveJob(token , {alreadySaved} , Saved_data){
    const supabase=await supabaseClient(token);
    if(alreadySaved){
        const {data,error:deleteError}=await supabase.from('saved_jobs').delete().eq('job_id',Saved_data.job_id);
    if(deleteError){
        console.error('Error deleting saved jobs:',deleteError);
        return null;
    }
    return data;
}
    else{
        const {data , error:inserterror}=await supabase.from('saved_jobs').insert([Saved_data]).select().single();
        if(inserterror){
            console.error("Error in inserting the jobs_details",inserterror);
            return null;
        }
        return data;
    }
}

export async function getsinglejob(token , {job_id}){
    const supabase=await supabaseClient(token);
    const {data,error}=await supabase.from('jobs').select('*,companies(name_at,logo_url),applied_details(*)').eq("id",job_id).single();
    if(error){
        console.error('Error fetching data ', error);
        return null;
    }
    console.log(data);
    return data;
}



export async function updatesinglejob(token, { job_id }, is_open) {
    const supabase = await supabaseClient(token);
  
    // Correct update syntax, passing an object for the update
    const { data, error } = await supabase
      .from('jobs')
      .update({ is_open: is_open }) // Update the `is_open` field
      .eq('id', job_id) // Filter by the job ID
      .single();
  
    if (error) {
      console.error('Error updating data ', error);
      return null;
    }
  
    console.log('Updated job:', data);
    return data;
  }

  



  export async function updateApplications(token, { job_id }, status) {
    const supabase = await supabaseClient(token);
  
    const { data, error } = await supabase
      .from('applied_details')
      .update({ status: status })
      .eq('job_id', job_id)
      .single() 
  
    if (error) {
      console.error('Error updating application status: ', error);
      return null;
    }
  
    if (!data || data.length === 0) {
      console.error('No rows updated.');
      return null;
    }
  
    console.log(data); 
    return data;
  }



  export const getsaved_jobs=async(token)=>{
    const supabase=await supabaseClient(token);

    const {data ,error}=await supabase.from('saved_jobs').select('*,job:jobs(*,companies:companies(name_at , logo_url))');
    
    if(error){
        console.log('Error fetching saved_jobs',error);
        return null;
    }
    return data;

  }


  export async function getapplications(token, { user_id }) {
    const supabase = await supabaseClient(token);
 
    const { data, error } = await supabase
      .from('applied_details')
      .select(`
        *,
        job:jobs(
          title,
          companies:companies(name_at)
        )
      `)
      .eq('candidate_id', user_id); 
  
    if (error) {
      console.error('Error in getting candidate job data', error);
      return null;
    }
  
    console.log('Candidate job applications', data);
    return data;
  }


  export const getmy_jobs=async(token,{recruiter_id})=>{
    const supabase=await supabaseClient(token);

    const {data ,error}=await supabase.from('jobs').select(`*,companies:companies(name_at , logo_url))`).eq('recruiter_id',recruiter_id)
    
    if(error){
        console.log('Error fetching my_jobs',error);
        return null;
    }
    return data;

  }

  export const delete_jobs=async(token,{job_id})=>{
    const supabase=await supabaseClient(token);

    const {data ,error}=await supabase.from('jobs').delete().eq('id',job_id).select();
    
    if(error){
        console.log('Error deleting the jobs',error);
        return null;
    }
    return data;

  }
  



  
  
  