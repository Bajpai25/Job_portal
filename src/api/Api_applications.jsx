import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token,_, job_data) {
    // Log job_data before doing anything
    console.log("Received job_data in applyToJob:", job_data);

    if (!job_data || Object.keys(job_data).length === 0) {
        console.error("Job data is empty");
        return null;
    }

    const supabase = await supabaseClient(token);
    const random = Math.floor(Math.random() * 1200);
    const filename = `resume-${random}-${job_data.candidate_id}`;

    const { error: storageError } = await supabase.storage.from('resume').upload(filename, job_data.resume);
    if (storageError){
        console.error('Error uploading resume', storageError);
        return null;
    }

    const resume = `${supabaseUrl}/storage/v1/object/public/resume/${filename}`;
    const { data, error } = await supabase.from('applied_details').insert([
        {
            ...job_data,
            resume
        }
    ]).select();

    if (error) {
        console.error('Error in storing the resume', error);
    }

    console.log("Inserted Data:", data);
    return data;
}




