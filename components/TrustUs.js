import React from 'react'
import almaxyra from '../assets/trustUs/almaxyra.png'
import artCom from '../assets/trustUs/artCom.png'
import holmarcom from '../assets/trustUs/holmarcom.png'
import iaac from '../assets/trustUs/iaac.png'
import olivium from '../assets/trustUs/olivium.png'
import hdeuxa from '../assets/trustUs/hdeuxa.png'
import Image from 'next/image' 
import orangeAtelier from '../assets/trustUs/orangeAtelier.jpg'

const TrustUs = () => {
  return (

   <section className="bg-white py-20 lg:py-[120px]">
     <div className="container px-12 mx-auto">
       <div className="-mx-4 flex flex-wrap">
         <div className="w-full px-4">
         <h1 className="text-5xl text-center font-extrabold font-eb mb-4 pb-20 text-black">Ils nous ont fait confiance</h1>
          
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
               <a 
                 className="flex w-[120px] md:w-[150px] items-center justify-center py-4 md:py-5 min-h-[80px]"
               >
                 <Image
                   src={almaxyra}
                   alt="Almaxyra"
                   className="h-12 md:h-16 w-auto object-contain"
                 />
               </a>
               <a 
                 className="flex w-[120px] md:w-[150px] items-center justify-center py-4 md:py-5 min-h-[80px]"
               >
                 <Image
                   src={orangeAtelier}
                   alt="Orange Atelier"
                   className="h-12 md:h-16 w-auto object-contain"
                 />
               </a>
               <a 
                 className="flex w-[120px] md:w-[150px] items-center justify-center py-4 md:py-5 min-h-[80px]"
               >
                 <Image
                   src={iaac}
                   alt="IAAC"
                   className="h-12 md:h-16 w-auto object-contain"
                 />
               </a>
               <a 
                 className="flex w-[120px] md:w-[150px] items-center justify-center py-4 md:py-5 min-h-[80px]"
               >
                 <Image
                   src={olivium}
                   alt="Olivium"
                   className="h-12 md:h-16 w-auto object-contain"
                 />
               </a>
               <a 
                 className="flex w-[120px] md:w-[150px] items-center justify-center py-4 md:py-5 min-h-[80px]"
               >
                 <Image
                   src={artCom}
                   alt="ArtCom"
                   className="h-12 md:h-16 w-auto object-contain"
                 />
               </a>
               <a 
                 className="flex w-[120px] md:w-[150px] items-center justify-center py-4 md:py-5 min-h-[80px]"
               >
                 <Image
                   src={hdeuxa}
                   alt="H2A"
                   className="h-12 md:h-16 w-auto object-contain"
                 />
               </a>
               <a 
                 className="flex w-[120px] md:w-[150px] items-center justify-center py-4 md:py-5 min-h-[80px]"
               >
                 <Image
                   src={holmarcom}
                   alt="Holmarcom"
                   className="h-12 md:h-16 w-auto object-contain"
                 />
               </a>
            </div>
         </div>
       </div>
     </div>
   </section>
   
     )
}

export default TrustUs