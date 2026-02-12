import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from "framer-motion"

const Testimonials = () => {

  const ref = useRef(null)
  const isInView = useInView(ref)
  const animation1 = useAnimation();
  const animation2 = useAnimation();
  const animation3 = useAnimation();


  useEffect(() => {
    if (isInView) {
      animation1.start({
        y: 0, opacity: 100,
        transition: {type: "spring",duration: 1,bounce: 0.3}})

      animation2.start({
        y: 0, opacity: 100,
        transition: {type: "spring",duration: 1,bounce: 0.3,delay: 0.5}})

      animation3.start({
        y: 0, opacity: 100,
        transition: {type: "spring",duration: 1,bounce: 0.3,delay: 1 }})
    }
    if (!isInView) {
      animation1.start({y: '10vw',opacity: 0})
      animation2.start({y: '10vw',opacity: 0})
      animation3.start({y: '10vw',opacity: 0})

    }
  }, [isInView]);

  return (

    <div className="text-white bg-black my-24">
      <div className="container px-12 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">

        <h1 class="mb-4 text-5xl tracking-tight font-eb font-bold text-white ">
            Découvrez ce que disent nos étudiants sur le cours.
          </h1>

        </div>
        <div className="flex flex-wrap -m-4" ref={ref}>
          <motion.div
            animate={animation1}
            className=" lg:w-1/3 lg:mb-0 mb-6 p-4"  >
            <div class="max-w-screen-xl px-4 py-4 mx-auto text-center lg:py-10 lg:px-6">
              <figure class="max-w-screen-md mx-auto">

                <blockquote>
                  <p class="text-2xl font-medium font-eb text-center text-white ">Je te félicite Mahmoud pour ta pédagogie. Tu as simplifié les choses de manière à capter notre attention tout au long de la formation. Le choix des exercices était pertinent. Bravo!</p>
                </blockquote>
                <figcaption class="flex items-center justify-center mt-6 space-x-3">

                  <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div class="pr-3 font-medium text-white ">Ahmed JORIO</div>
                    <div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">Architecte</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </motion.div >
          <motion.div
            animate={animation2}
            className="lg:w-1/3 lg:mb-0 mb-6 p-4"  >
            <div class="max-w-screen-xl px-4 py-4 mx-auto text-center lg:py-10 lg:px-6">
              <figure class="max-w-screen-md mx-auto">

                <blockquote>
                  <p class="text-base font-medium font-eb text-center text-white whitespace-pre-line ">"J'ai trouvé que la formation sert exactement son objet, à savoir fournir une base solide pour les deux logiciels ou plutôt au nouveau workflow proposé. Suite à ca j'ai pu mieux comprendre comment le logiciel marche dans ses grandes lignes, la méthode paramétrique et un début des automatisations possibles avec ces derniers.{'\n'}J'ai également apprécié comment le cours était concis et straight-to-the-point. Pas trop long et pas court non plus. La nature flexible du court était très importante pour moi pour faire le pas et m'y inscrire vu mes conditions de travail.{'\n'}Finalement, le coté hands-on du cours et sa nature interactive m'a personnellement aidé à accélérer le processus d'apprentissage. Un juste milieu entre cours et tutoriel."</p>
                </blockquote>
                <figcaption class="flex items-center justify-center mt-6 space-x-3">

                  <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div class="pr-3 font-medium text-white ">Maha BOUTAHRAY</div>
                    <div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">Architecte Enseignante Doctorante en Urbanisme et Aménagement</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </motion.div >
          <motion.div
            animate={animation3}
            className="lg:w-1/3 lg:mb-0 mb-6 p-4"  >
            <div class="max-w-screen-xl px-4 py-4 mx-auto text-center lg:py-10 lg:px-6">
              <figure class="max-w-screen-md mx-auto">
                <blockquote>
                  <p class="text-2xl font-medium text-white font-eb text-center ">Mood paisible, aucun malaise ni difficultés à communiquer</p>
                </blockquote>
                <figcaption class="flex items-center justify-center mt-6 space-x-3">

                  <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div class="pr-3 font-medium text-white ">Souhail Zoubeidi</div>
                    <div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">Etudiant à l'UIR 5eme année</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials