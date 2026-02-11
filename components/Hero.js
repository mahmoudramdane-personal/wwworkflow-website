import Image from 'next/image';
import gif from '../assets/Workflowsgif.gif'
import TestCard from './TestCard';
import SmallCard from "./SmallCard";
import {motion } from 'framer-motion'

export default function Hero({ hero }) {
  return (


    <div className="px-6 md:my-24 py-12 md:px-12  text-black text-center lg:text-left">
      <div className="container mx-auto xl:px-32">

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="mt-12 lg:mt-0">
            <h1 className="mb-4 text-5xl tracking-tight text-center font-eb font-bold md:text-black text-black ">Nous couvrons ce que votre école a manqué!</h1>
            <p className="mb-4 font-alt text-lg "><strong className='font-eb' >Afterwork Workflow </strong>est une Plateforme éducative pour professionnels axée sur la conception paramétrique et computationnelle.<br/>
            Apprenez un nouveau workflow de travail en utilisant Rhinoceros et Grasshopper comme outils de base - Restez à jour par rapport à un marché en constante évolution!</p>
            <div className="mt-5 max-w-md mx-auto md:flex justify-center items-center md:mt-8">

<a href="https://tally.so/r/nrYAvN" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-ibm justify-center h-12 px-6 mr-6 font-semibold py-3 border-transparent text-white bg-black hover:bg-gray">
                Discover More
              </a>

            </div>
          </div>
          <div className="relative mb-12 lg:mb-0">
            <motion.div animate={{ scale: 1 }} initial={{ scale: 0 }} transition={{delay:1.5}} >

              <Image src={gif} alt="office content 1" />
            </motion.div>
            <TestCard />
            <SmallCard />

          </div>
        </div>
      </div>
    </div>
  )
}
