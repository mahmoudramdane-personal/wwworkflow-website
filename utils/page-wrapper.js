import { motion, AnimatePresence, useReducedMotion } from "framer-motion";


export const PageWrapper = ({ children }) => {
   const shouldReduceMotion = useReducedMotion();
   
   if (shouldReduceMotion) {
      return <>{children}</>;
   }
   
   return (
      <>
         <AnimatePresence>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3 }}
            >
               {children}
            </motion.div>
         </AnimatePresence>
      </>
   );
};