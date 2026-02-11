import React, { useEffect, useState } from 'react'
import Accordion from './Accordion';
import Link from 'next/link';
import Image from "next/image"
import { useRouter } from 'next/router';
import ComingSoon from './ComingSoon';


const CoursePageContent = ({ courses }) => {

   const router = useRouter();
   const courseId = Object.keys(router.query)[0] * 1
   const course = courses[courseId - 1]


   useEffect(() => {
      console.log("course", course)
   }, [])


   return (
      <section className="text-black body-font">
         <div className="container px-5 pb-24 mx-auto" key={course?.id} >


            <div className="relative h-96 mb-10  ">
               <Image className="w-full h-full object-cover opacity-50  max-w-none whitespace-pre-line " src={course?.titleImage} alt="Your Image" layout='fill' />
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                  <h1 className="text-5xl text-black font-bold font-eb whitespace-pre-line ">{course?.courseTitle}</h1>
                  <h1 className="text-3xl mt-5 text-gray font-bold font-eb">{course?.comingSoon}</h1>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-4  sm:grid-cols-3">
               <div className="col-span-2 bg-white sm:col-span-2 p-10">

                  <h2 className="text-3xl font-eb pb-5 font-semibold text-black leading-tight whitespace-pre-line ">
                     {course?.courseDetailTitle}
                  </h2>

                  <div class="aspect-w-16 aspect-h-9">
                     {course?.link == ""? <ComingSoon/> : <iframe src={course?.link} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> }
                     
                  </div>

                  <p className="leading-relaxed text-lg font-alt my-10 whitespace-pre-line "  >{course?.description}</p>

                  <p className="leading-relaxed text-lg font-eb mb-5 font-extrabold ">Ce que vous allez apprendre:</p>
                  <ol className="mb-8 space-y-4 text-left text-black font-alt list-disc marker:text-black " >
                     {
                        course?.learn?.map((learn, index) => (

                           <li key={index} className="flex items-center space-x-3 marker:text-black "  >
                              <span className='pl-4 font-alt' >{learn}</span>
                           </li>
                        ))
                     }
                  </ol>



                  <p className="leading-relaxed text-lg font-bold font-alt mb-10">{course?.requirement?.length == 0 ? "" : "Requirement"}</p>
                  <ul className="mb-8 space-y-4 text-left text-gray-500 font-alt dark:text-gray-400">
                     {
                        course?.requirement?.map((requirement, index) => (
                           <li key={index} className="flex items-center space-x-3"  >
                              {/* <!-- Icon --> */}
                              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                              <span>{requirement} </span>
                           </li>
                        ))
                     }
                  </ul>

                  {/* Bonus */}

                  <p className="leading-relaxed text-lg font-bold font-alt mb-10">{course?.bonus?.length == 0 ? "" : "Bonus"}</p>
                  <ul className="mb-8 space-y-4 text-left text-gray-500 font-alt dark:text-gray-400">
                     {
                        course?.bonus?.map((bonus, index) => (
                           <li key={index} className="flex items-center space-x-3"  >
                              {/* <!-- Icon --> */}
                              <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                              <span>{bonus} </span>
                           </li>
                        ))
                     }
                  </ul>
               </div>
               <div className="col-span-1 sm:col-span-1">
                  <img src={course?.sideImage} className="pb-5 w-full object-cover " style={{ height: "28em" }} />
                  {
                     course?.accordeon?.map((item, index) => {
                        return (
                           <Accordion item={item} key={index} />)
                     })}




                  <button className='font-ibm font-semibold my-5 w-full h-14 px-6 text-white bg-black hover:bg-gray' >
                     Coming Soon
                  </button>
               </div>
            </div>
         </div>
      </section>
   )
}

export default CoursePageContent