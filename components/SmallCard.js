import React from 'react'
import { motion, useReducedMotion } from "framer-motion"

const SmallCard = () => {
   const shouldReduceMotion = useReducedMotion();

   return (
      <motion.div
         animate={shouldReduceMotion ? {} : { scale: 1 }}
         transition={shouldReduceMotion ? {} : { delay: 0.7, duration: 0.3 }}
         initial={shouldReduceMotion ? {} : { scale: 0.8, opacity: 0 }}
         className="absolute hidden md:block -right-2 -top-10 w-40 md:w-60 lg:w-40 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 items-center bg-cgrey rounded-lg shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] md:flex-row md:max-w-xl"
      >
         <div className='flex px-4 py-4 justify-center'>
            <div>
               <p className="text-xs lg:text-xl font-bold tracking-tight font-alt text-black">+120</p>
               <p className="text-xs lg:text-xs font-normal tracking-tight font-alt text-black">Students</p>
            </div>
         </div>
      </motion.div>
   )
}

export default SmallCard