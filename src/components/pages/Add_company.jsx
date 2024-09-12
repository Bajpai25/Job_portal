import React, { useEffect } from 'react'
import { addnewcompany } from '@/api/Api_companies'
import { useUser } from '@clerk/clerk-react'
import {z} from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
    import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from "@/components/ui/label"
import { useFetch } from '@/hooks/Usefetch'
import { BarLoader } from 'react-spinners'
import { Plus } from 'lucide-react'

const schema=z.object({
    name_at:z.string().min(1,{message:"Company name is required"}),
    logo:z.any().refine(
        (file)=>file[0] && (
            file[0].type==='image/png' || file[0].type==="image/jpeg",
            {
                message:"Only Images are allowed"
            }
        ),
    )
})


const Add_company = ({fetch_companies_data}) => {
    const {user}=useUser();

    const {register , handleSubmit , formState:{errors} ,}=useForm({
        resolve:zodResolver(schema),
    })

    const {loading:loadingaddcompany , 
        error:erroraddcompany,
        data:dataaddcompany,
        fn:fnaddcompany
    }=useFetch(addnewcompany);

    useEffect(()=>{
        if(dataaddcompany?.length >0) fetch_companies_data();
    },[loadingaddcompany ])


    const onSubmit=(data)=>{
        fnaddcompany({
            ...data,
            logo:data.logo[0],

        })
    }

  return (
  
     <Drawer >
  <DrawerTrigger className='bg-red-500 rounded-md flex flex-row gap-2 sm:p-3 p-2 w-1/2 items-center justify-center text-white '>Add <span><Plus></Plus></span> </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle className="mx-6 text-3xl font-bold font-sans py-2">Add a New Company</DrawerTitle>
    </DrawerHeader>
    <form className='flex flex-col gap-3 mx-8'>
        <Input placeholder="Company name" {...register("name_at")} />
        <Input type="file" accept="image" className="file:text-gray-400" {...register("logo")}/>
        {loadingaddcompany && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
        <Button type="button" onClick={handleSubmit(onSubmit)} variant="destructive" classname="w-full">Add</Button>
    </form>
    <DrawerFooter className="mx-4">
      <DrawerClose>
        <Button variant="outline" className="w-full  ">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

  
  )
}

export default Add_company
