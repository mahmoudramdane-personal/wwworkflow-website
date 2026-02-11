import Hero from '../components/Hero'
import Head from 'next/head'
import CoursesSection from '../components/CoursesSection';
import CourseList from '../components/CourseList';
import Testimonials from '../components/Testimonials';
import TrustUs from '../components/TrustUs';
import { PageWrapper } from '../utils/page-wrapper';


export default function Home({ courses, hero, courseInfo }) {
  return (
    <div className="">
      <Head>
        <title>AWF</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
        <meta name='description' content='' />
        <meta property="og:title" content="WorkFlow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
        <meta property="og:description"
          content="" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="WorkFlow" />
      </Head>
      <PageWrapper>
        <Hero hero={hero} />

        <CoursesSection courseInfo={courseInfo} />
        <Testimonials />
        <div id="discover-more">
          <CourseList courses={courses} />
        </div>
        <TrustUs />
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-4xl text-3xl font-bold font-eb mb-4 text-black">Prêt à commencer votre apprentissage ?</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed font-alt text-base mb-8">Inscrivez-vous dès maintenant et commencez votre parcours dans la conception paramétrique.</p>
            <a 
              href="https://tally.so/forms/nrYAvN" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center font-ibm justify-center h-12 px-6 font-semibold py-3 border-transparent text-white bg-black hover:bg-gray mx-auto"
            >
              J'ai envie d'apprendre
            </a>
          </div>
        </div>
      </PageWrapper>
    </div>
  )
}

export async function getStaticProps() {
  const data = await import("../assets/data/courseDetails.json");
  const courses = data.courses;

  const results = await import("../assets/data/HeroSection.json");
  const hero = results.hero;

  const infos = await import("../assets/data/CourseSection.json");
  const courseInfo = infos.courseInfo;

  return {
    props: {
      courses, hero, courseInfo
    },
  };
}