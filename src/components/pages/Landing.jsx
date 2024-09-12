import React from 'react';
import Typewriter from 'typewriter-effect';
import { Button } from '../ui/button';
import { carousel_data } from '@/data/carousel';
import { faq_data } from '@/data/faq';
import Autoplay from "embla-carousel-autoplay"
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Landing = () => {

  return (
    <div className='px-8'>
      <h1 className='font-semibold font-sans text-3xl pt-24 md:text-4xl lg:text-6xl text-white text-center'>
        <Typewriter
          options={{
            strings: ['Welcome to HireX', 'Land Your Dream Job'],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
      <p className='text-white text-center my-8 py-8 px-4 font-sans text-md sm:text-xl'>Explore thousands of job listings or find the perfect candidate</p>
      {/* buttons */}
      <div className='flex flex-row justify-center gap-8 my-8'>
        <Link to="./jobs">
        <Button variant="primary" size="big" className="sm:text-xl text-md ">Find Jobs</Button>
        </Link>
        <Link to="./jobs/post-job">
        <Button variant="destructive" size="big" className="sm:text-xl text-md ">Post a Job</Button>
        </Link>
      
      </div>
      {/* carousel effect  */}
      
      <Carousel 
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full flex items-center justify-center my-12  py-20 "
    >
      <CarouselContent className="flex gap-5 items-center sm:gap-20">
        {carousel_data.map((item,id)=>{
          return (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <img src={item.path} className='h-9 object-contain sm:h-14'/>
          </CarouselItem>
          )
        })
      }
      </CarouselContent>
    </Carousel>

    {/* // banner  */}
    <div className='flex items-center justify-center my-12'>
      <img src="https://hirrd.vercel.app/banner.jpeg" className='object-cover  w-full '/>
    </div>

    {/* // cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
    <Card >
  <CardHeader>
    <CardTitle>For Job Seekers</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Search and apply for jobs, track applications, and more.</p>
  </CardContent>
</Card>
<Card >
  <CardHeader>
    <CardTitle>For Employers</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Post jobs, manage applications, and find the best candidates.</p>
  </CardContent>
</Card>
</div>

    {/* // accordian component faq section  */}
    <Accordion type="single" collapsible className="w-auto flex flex-col gap-4  my-12 ">
      {faq_data.map((item,id)=>{
        return (
          <AccordionItem key={id} value={`${id+1}`}>
           <AccordionTrigger>{item.question}</AccordionTrigger> 
           <AccordionContent>{item.answer}</AccordionContent>
      </AccordionItem>
        )
      })}
    </Accordion>
      </div>
  );
}

export default Landing;
