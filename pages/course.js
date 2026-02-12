import Head from 'next/head'
import CoursePageContent from './../components/CoursePageContent';
import { PageWrapper } from '../utils/page-wrapper';


const course = ({courses}) => {

   return (
      <>
        <Head>
          <title>Détails du Cours | Afterwork Workflow</title>
          <meta name="description" content="Découvrez les détails de nos formations en conception paramétrique. Apprenez Rhinoceros et Grasshopper avec des experts." />
          <link rel="canonical" href="https://www.wwworkflows.com/course" />
        </Head>
        <PageWrapper>
          <div className="min-h-screen py-12 sm:pt-20">
            <CoursePageContent courses={courses} />
          </div>
        </PageWrapper>
      </>
   )
}

export default course

export async function getStaticProps() {
   const data = await import("../assets/data/courseDetails.json");
   const courses = data.courses;

   return {
     props: {
       courses,
     },
   };
 }