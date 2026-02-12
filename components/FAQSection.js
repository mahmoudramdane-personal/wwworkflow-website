import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqData = [
  {
    question: "Qu'est-ce que la conception paramétrique ?",
    answer: "La conception paramétrique est une approche de design qui utilise des algorithmes et des paramètres pour générer et modifier des formes complexes. Elle permet de créer des designs non-standard et de tester rapidement différentes variations."
  },
  {
    question: "Ai-je besoin d'expérience préalable en programmation ?",
    answer: "Non, nos cours sont conçus pour tous les niveaux. Nous commençons par les bases de Grasshopper, une interface visuelle de programmation, avant d'aborder des concepts plus avancés."
  },
  {
    question: "Quels logiciels sont utilisés dans les formations ?",
    answer: "Nous utilisons principalement Rhinoceros 3D avec le plugin Grasshopper. Ces outils sont standards dans l'industrie de l'architecture paramétrique et sont utilisés par des cabinets d'architecture de renommée mondiale."
  },
  {
    question: "Comment se déroulent les cours ?",
    answer: "Nos cours combinent théorie et pratique. Chaque session inclut des démonstrations en direct, des exercices pratiques et un accompagnement personnalisé. Vous aurez accès aux enregistrements pour réviser à votre rythme."
  },
  {
    question: "Puis-je suivre les cours à distance ?",
    answer: "Oui, tous nos cours sont disponibles en ligne avec des sessions en direct interactives. Vous pouvez participer depuis n'importe où dans le monde, il vous suffit d'une connexion internet stable."
  }
]

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
        aria-expanded={isOpen}
      >
        <span className="text-lg md:text-xl font-semibold font-eb text-black pr-4">
          {question}
        </span>
        <span className={`text-2xl transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-base font-alt text-gray-700 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-cgrey py-20 lg:py-[120px]">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-eb text-black mb-4">
            Questions fréquentes
          </h2>
          <p className="text-lg font-alt text-gray-700">
            Tout ce que vous devez savoir sur nos formations
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="text-gray-600 font-alt mb-4">
            Vous avez d'autres questions ?
          </p>
          <a 
            href="https://tally.so/r/nrYAvN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-ibm justify-center h-12 px-8 font-semibold py-3 border-transparent text-white bg-black hover:bg-gray transition-colors duration-200"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
