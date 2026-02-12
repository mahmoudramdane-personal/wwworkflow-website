import Image from 'next/image'
import React from 'react'
import logo from '../assets/workflowLogo.png'

const ComingSoon = () => {
   return (
      <div className="flex items-center justify-center min-h-[60vh]">
         <div className="container px-4">
            <div className="mx-auto max-w-2xl text-center py-16 md:py-24">
               <div className="mb-8 relative mx-auto">
                  <Image 
                     width={200} 
                     height={95} 
                     className="mx-auto" 
                     src={logo} 
                     alt="Afterwork Workflow Logo" 
                     priority
                  />
               </div>
               <h1 className="text-3xl md:text-5xl font-bold font-eb text-black mb-4">
                  Coming Soon!
               </h1>
               <p className="text-lg md:text-xl font-alt text-gray-600 mb-8">
                  Notre boutique est en cours de construction. <br className="hidden md:block"/>
                  Inscrivez-vous pour être informé du lancement !
               </p>
               <a 
                  href="https://tally.so/r/nrYAvN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-ibm justify-center h-12 px-8 font-semibold py-3 border-transparent text-white bg-black hover:bg-gray transition-colors duration-200"
               >
                  Me notifier du lancement
               </a>
            </div>
         </div>
      </div>
   )
}

export default ComingSoon