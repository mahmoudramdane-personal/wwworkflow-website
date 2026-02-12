import Image from 'next/image';
import gif from '../assets/Workflowsgif.gif'
import TestCard from './TestCard';
import SmallCard from "./SmallCard";
import { motion, useReducedMotion } from 'framer-motion'

export default function Hero({ hero }) {
  const shouldReduceMotion = useReducedMotion();
  
  const fadeInUp = shouldReduceMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="px-6 md:my-24 py-12 md:px-12 text-black text-center lg:text-left">
      <div className="container mx-auto xl:px-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="mt-12 lg:mt-0"
            {...fadeInUp}
          >
            <h1 className="mb-4 text-4xl md:text-5xl tracking-tight text-center font-eb font-bold text-black">Nous couvrons ce que votre école a manqué!</h1>
            <p className="mb-4 font-alt text-lg"><strong className='font-eb'>Afterwork Workflow</strong> est une Plateforme éducative pour professionnels axée sur la conception paramétrique et computationnelle.<br/>
            Apprenez un nouveau workflow de travail en utilisant Rhinoceros et Grasshopper comme outils de base - Restez à jour par rapport à un marché en constante évolution!</p>
            <div className="mt-5 max-w-md mx-auto md:flex justify-center items-center md:mt-8">
              <a href="https://tally.so/r/nrYAvN" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-ibm justify-center h-12 px-6 mr-6 font-semibold py-3 border-transparent text-white bg-black hover:bg-gray min-w-[160px]">
                Discover More
              </a>
            </div>
          </motion.div>
          <motion.div 
            className="relative mb-12 lg:mb-0"
            {...fadeInUp}
          >
            <Image src={gif} alt="Workflow demonstration" width={600} height={400} loading="eager" priority />
            <TestCard />
            <SmallCard />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
