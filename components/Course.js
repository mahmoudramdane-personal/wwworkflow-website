import React, {useEffect} from 'react'
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from "next/link"


const Course = ({ course }) => {


  return (

    <div className="w-full md:w-1/2 lg:w-1/3 px-4">
      <div className="max-w-[370px] border border-white bg-white mx-auto  mb-10">
        <div className="overflow-hidden mb-3">
           <img src={course.titleImage} alt={course.courseTitle} className="w-full h-48 object-cover"
          loading="lazy" />
        </div>
        <div className="p-5" >
          <h3>
            <a className="font-semibold text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-4 inline-block text-black hover:text-gray">
              {course.courseTitle}
            </a>
          </h3>
          <p className="text-base text-body-color">
            {course.subtitle}
          </p>
          <div className="mt-5 max-w-md mx-auto md:flex md:mt-8">
            <Link
              href={{
                pathname: '/course',
                query: course.id, 
              }}>
              <a className="inline-flex items-center font-ibm justify-center h-12 px-6 mr-6 font-semibold py-3 border-transparent text-white bg-black hover:bg-gray">
                Enroll now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}
export default dynamic(() => Promise.resolve(Course), {
  ssr: false
})