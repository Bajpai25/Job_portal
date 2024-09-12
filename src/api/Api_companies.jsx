import supabaseClient ,{supabaseUrl} from "@/utils/supabase"

export const fetchcompanies=async(token)=>{
    const supabase=await supabaseClient(token)
    let query=supabase.from('companies').select('*');
    const {data , error}=await query;
    if(error){
        console.error('Error in fetching companies data',error);
    }
    return data;
}

export const addNewJob =async (token , _ , job_data)=>{
    const supabase=await supabaseClient(token);
    console.log(job_data);
    
    const {data , error}=await supabase.from('jobs').insert([job_data]).select();

    if(error){
        console.log('Error in adding the jobs',error);
    }
    console.log(data);
    return data;
}


export const addnewcompany=async(token,_,company_data)=>{
    
    const supabase=await supabaseClient(token);
    const random = Math.floor(Math.random() * 1200);
    const filename = `company-${random}-${company_data.name_at}`;

    const { error: storageError } = await supabase.storage.from('company_logo').upload(filename, company_data.logo);

    if (storageError){
        console.error('Error uploading company logo', storageError);
        return null;
    }

    const logo_url = `${supabaseUrl}/storage/v1/object/public/company_logo/${filename}`;
    const {data , error}=await supabase.from('companies').
    insert([
        {
            name_at:company_data.name_at,
            logo_url
        }
    ]).select();

    if(error){
        console.error('Error Submitting company',error);
        return null;
    }
             return data;
}
