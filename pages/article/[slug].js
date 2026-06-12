import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getArticleBySlug, getArticles } from "../../lib/contentful";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function getStaticPaths() {
  const articles = await getArticles();

  const paths = articles.map((a) => ({
    params: { slug: a.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return { notFound: true };
  }

  return {
    props: { article },
    revalidate: 60,
  };
}

function ArticlePage({ article }) {
  const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Head>
        <title>{article.title} | Afterwork Workflow</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        {article.thumbnail && (
          <meta property="og:image" content={article.thumbnail} />
        )}
        <link
          rel="canonical"
          href={`https://www.afterworkworkflow.com/article/${article.slug}`}
        />
      </Head>

      <div className="bg-white min-h-screen">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          {/* Back navigation */}
          <div className="pt-8">
            <Link
              href="/articles"
              className="font-alt text-black/40 text-xs tracking-[0.12em] uppercase hover:text-black transition-colors duration-300"
            >
              &larr; Retour aux articles
            </Link>
          </div>

          {/* Title section */}
          <section className="pt-12 pb-8 md:pt-16 md:pb-12">
            <div className="flex items-center gap-3 mb-4">
              {article.category && (
                <span className="font-alt text-xs tracking-[0.12em] uppercase text-black/40">
                  {article.category}
                </span>
              )}
              <span className="font-alt text-xs tracking-[0.1em] text-black/30">
                {formattedDate}
              </span>
            </div>
            <h1 className="font-eb text-3xl md:text-5xl font-bold text-black leading-tight">
              {article.title}
            </h1>
            <p className="mt-4 font-alt text-black/50 text-lg md:text-xl leading-relaxed">
              {article.excerpt}
            </p>
          </section>

          {/* Hero image */}
          {article.thumbnail && (
            <section className="mb-12">
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-cgrey">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </section>
          )}

          {/* Body content */}
          <section className="mb-16">
            <article className="prose prose-lg max-w-none font-alt text-black/80
              prose-headings:font-eb prose-headings:text-black prose-headings:font-bold
              prose-h1:text-4xl prose-h2:text-2xl
              prose-a:text-blue prose-a:no-underline hover:prose-a:underline
              prose-img:w-full prose-img:rounded-lg prose-img:my-8
              prose-blockquote:border-l-black/20 prose-blockquote:text-black/60 prose-blockquote:italic
              prose-code:text-black/70 prose-code:bg-cgrey prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-black prose-pre:text-white
              prose-strong:text-black
              prose-hr:border-black/10">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.body}
              </ReactMarkdown>
            </article>
          </section>

          {/* Back to articles */}
          <section className="border-t border-black/10 py-12 text-center">
            <Link
              href="/articles"
              className="font-alt text-black/40 text-xs tracking-[0.12em] uppercase hover:text-black transition-colors duration-300"
            >
              Voir tous les articles &rarr;
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

export default ArticlePage;
