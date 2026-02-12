import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import BlogCard from '../components/BlogCard'
import { PageWrapper } from '../utils/page-wrapper';


const blog = () => {



  return (
    <>
      <Head>
        <title>Blog | Afterwork Workflow</title>
        <meta name="description" content="Articles et ressources sur l'architecture paramétrique, la conception computationnelle et les workflows innovants." />
        <meta property="og:title" content="Blog | Afterwork Workflow" />
        <meta property="og:description" content="Articles et ressources sur l'architecture paramétrique et la conception computationnelle." />
        <link rel="canonical" href="https://www.wwworkflows.com/blog" />
      </Head>



      <Script id='substack-feed-embed' >
        {`window.SubstackFeedWidget = {
          substackUrl: "mahmoudramdane.substack.com",
          posts: 12,
          layout: "center",
          colors: {
            primary: "#231F20",
            secondary: "#231F20",
            background: "#F1F1F1",
          }
        }; `}
      </Script>
      <Script src="https://substackapi.com/embeds/feed.js" async></Script>
      <PageWrapper>
        <section className="pt-20 px-10   lg:pt-[120px] pb-10 lg:pb-20">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">

                <h2
                  className="font-bold text-5xl font-eb sm:text-4xl md:text-[40px] text-black mb-4"
                >
                  Architecute, crazy job right?              </h2>
                <p className="text-base font-alt text-black">
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap " >
            {/* <BlogCard />
          <BlogCard />
          <BlogCard /> */}
            <div id="substack-feed-embed" className="p-5 [&>a]:m-10 " ></div>
          </div>


        </section>
      </PageWrapper>
    </>

  )
}

export default blog