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
    <Link href={`/article/${article.slug}`} className="article-card">
      <div className="article-card-inner">
        {/* Thumbnail */}
        {article.thumbnail && (
          <div className="article-card-thumb">
            <img src={article.thumbnail} alt={article.title} />
          </div>
        )}

        {/* Meta */}
        <div className="article-card-meta">
          {article.category && <span>{article.category}</span>}
          <span>{formattedDate}</span>
        </div>

        {/* Title */}
        <h2 className="article-card-title">{article.title}</h2>

        {/* Excerpt */}
        <p className="article-card-excerpt">{article.excerpt}</p>
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style>{`
        .articles-page-root {
          background-color: #fafaf7;
          min-height: 100vh;
          font-family: Inter, -apple-system, system-ui, sans-serif;
          color: #1a1a1a;
        }
        .articles-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 3rem 1.5rem 4rem;
        }
        .articles-header {
          margin-bottom: 3rem;
        }
        .articles-header h1 {
          font-size: clamp(1.8rem, 5vw, 2.6rem);
          line-height: 1.15;
          font-weight: 700;
          margin-bottom: 0.8rem;
          color: #1a1a1a;
        }
        .articles-subtitle {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.55;
          max-width: 540px;
        }
        .articles-empty {
          color: #666;
          text-align: center;
          padding: 4rem 0;
        }
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .article-card {
          text-decoration: none;
          color: inherit;
          display: block;
          transition: opacity 0.2s;
        }
        .article-card:hover {
          opacity: 0.75;
        }
        .article-card-inner {
          display: flex;
          flex-direction: column;
        }
        .article-card-thumb {
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 1rem;
          background: #eee;
        }
        .article-card-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .article-card-meta {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
          font-size: 0.8rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .article-card-title {
          font-size: 1.15rem;
          font-weight: 600;
          line-height: 1.3;
          margin-bottom: 0.4rem;
          color: #1a1a1a;
        }
        .article-card-excerpt {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.55;
        }
        @media (max-width: 600px) {
          .articles-page {
            padding: 2rem 1rem 3rem;
          }
          .articles-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>

      <div className="articles-page-root">
        <PageWrapper>
          <div className="articles-page">
            {/* Header */}
            <section className="articles-header">
              <h1>Articles</h1>
              <p className="articles-subtitle">
                Réflexions sur le Computational Design, l&apos;architecture
                paramétrique et les workflows numériques.
              </p>
            </section>

            {/* Grid */}
            {articles.length === 0 ? (
              <p className="articles-empty">
                Aucun article pour le moment. Revenez bientôt.
              </p>
            ) : (
              <div className="articles-grid">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </div>
        </PageWrapper>
      </div>
    </>
  );
}