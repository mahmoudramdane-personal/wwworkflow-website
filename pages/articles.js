import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getArticles } from "../lib/contentful";
import { PageWrapper } from "../utils/page-wrapper";

export async function getStaticProps() {
  const articles = await getArticles();

  return {
    props: { articles },
    revalidate: 60,
  };
}

function ArticleCard({ article }) {
  const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <div className="w-full mb-4">
        {/* Thumbnail */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-cgrey mb-4">
          {article.thumbnail && (
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-2">
          {article.category && (
            <span className="text-[10px] tracking-[0.15em] uppercase text-black/40 font-alt">
              {article.category}
            </span>
          )}
          <span className="text-[10px] tracking-[0.1em] text-black/30 font-alt">
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-medium font-eb text-black leading-snug mb-1.5 group-hover:opacity-60 transition-opacity duration-300">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm font-alt text-black/50 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

export default function ArticlesPage({ articles }) {
  return (
    <>
      <Head>
        <title>Articles | Afterwork Workflow</title>
        <meta
          name="description"
          content="Articles sur l'architecture paramétrique, le Computational Design et les workflows numériques."
        />
        <meta property="og:title" content="Articles | Afterwork Workflow" />
        <meta
          property="og:description"
          content="Articles sur l'architecture paramétrique et le Computational Design."
        />
        <link rel="canonical" href="https://www.afterworkworkflow.com/articles" />
      </Head>

      <PageWrapper>
        <section className="pt-24 pb-16 md:pt-32 md:pb-20 px-6 md:px-12 max-w-[1200px] mx-auto">
          <div className="max-w-xl mb-12">
            <h1 className="font-eb text-4xl md:text-5xl font-bold text-black leading-tight mb-4">
              Articles
            </h1>
            <p className="font-alt text-base text-black/50 leading-relaxed">
              Réflexions sur le Computational Design, l&apos;architecture
              paramétrique et les workflows numériques.
            </p>
          </div>

          {articles.length === 0 ? (
            <p className="font-alt text-black/40 text-center py-20">
              Aucun article pour le moment. Revenez bientôt.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </section>
      </PageWrapper>
    </>
  );
}
