import React from 'react'
import Head from 'next/head'
import { PageWrapper } from '../utils/page-wrapper';
import CoursePage from '../components/CoursePage'

const courses = ({ courses }) => {

  return (
    <>
      <Head>
        <title>Nos Cours | Afterwork Workflow</title>
        <meta name="description" content="Découvrez nos formations en conception paramétrique et computationnelle. Cours de Rhinoceros et Grasshopper pour architectes et designers." />
        <meta property="og:title" content="Nos Cours | Afterwork Workflow" />
        <meta property="og:description" content="Découvrez nos formations en conception paramétrique et computationnelle." />
        <link rel="canonical" href="https://www.wwworkflows.com/courses" />
      </Head>
      <PageWrapper>
        <CoursePage courses={courses} />
      </PageWrapper>
    </>
  )
}

export default courses

export async function getStaticProps() {
  const data = await import("../assets/data/courseDetails.json");
  const courses = data.courses;

  return {
    props: {
      courses,
    },
  };
}