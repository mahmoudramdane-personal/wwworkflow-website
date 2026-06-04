import Hero from '../components/Hero'
import Head from 'next/head'
import CoursesSection from '../components/CoursesSection';
import CourseList from '../components/CourseList';
import Testimonials from '../components/Testimonials';
import TrustUs from '../components/TrustUs';
import FAQSection from '../components/FAQSection';
import { PageWrapper } from '../utils/page-wrapper';


export default function Home({ courses, hero, courseInfo }) {
  return (
    <div className="">
      <Head>
        <title>Afterwork Workflow | Formation en Conception Paramétrique</title>
        <meta name="description" content="Plateforme éducative pour professionnels axée sur la conception paramétrique et computationnelle. Apprenez Rhinoceros et Grasshopper avec des experts." />
        <meta property="og:title" content="Afterwork Workflow | Formation en Conception Paramétrique" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://afterworkworkflow.com" />
        <meta property="og:image" content="https://afterworkworkflow.com/og-image.jpg" />
        <meta property="og:description" content="Plateforme éducative pour professionnels axée sur la conception paramétrique et computationnelle." />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Afterwork Workflow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Afterwork Workflow | Formation en Conception Paramétrique" />
        <meta name="twitter:description" content="Plateforme éducative pour professionnels axée sur la conception paramétrique et computationnelle." />
        <meta name="twitter:image" content="https://afterworkworkflow.com/og-image.jpg" />
        <link rel="canonical" href="https://afterworkworkflow.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Afterwork Workflow",
              "url": "https://afterworkworkflow.com",
              "description": "Plateforme éducative pour professionnels axée sur la conception paramétrique et computationnelle.",
              "parentOrganization": {
                "@type": "Organization",
                "name": "WWWORKFLOWS",
                "url": "https://www.wwworkflows.com"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+212-623-633-222",
                "contactType": "customer service",
                "email": "mahmoud@wwworkflows.com",
                "areaServed": "MA",
                "availableLanguage": ["French", "English", "Arabic"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/afterworkworkflow",
                "https://twitter.com/rmdnmd",
                "https://www.instagram.com/afterwork.workflow/",
                "https://www.youtube.com/@afterworkworkflow"
              ]
            })
          }}
        />
      </Head>
      <PageWrapper>
        <Hero hero={hero} />

        <CoursesSection courseInfo={courseInfo} />
        <Testimonials />
        <div id="discover-more">
          <CourseList courses={courses} />
        </div>
        <TrustUs />
        <FAQSection />
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-4xl text-3xl font-bold font-eb mb-4 text-black">Prêt à commencer votre apprentissage ?</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed font-alt text-base mb-8">Inscrivez-vous dès maintenant et commencez votre parcours dans la conception paramétrique.</p>
            <a 
              href="https://tally.so/r/nrYAvN" 
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