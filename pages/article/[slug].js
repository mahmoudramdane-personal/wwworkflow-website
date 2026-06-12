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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style>{`
        .article-detail-page {
          background-color: #fafaf7;
          min-height: 100vh;
          font-family: Inter, -apple-system, system-ui, sans-serif;
          color: #1a1a1a;
        }
        .article-detail-inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 3rem 1.5rem 4rem;
        }
        .article-detail-inner a {
          color: #b25340;
          text-decoration: underline;
        }
        .article-detail-inner h2 {
          font-size: 1.35rem;
          font-weight: 600;
          margin: 2rem 0 1rem;
          line-height: 1.3;
          color: #1a1a1a;
        }
        .article-detail-inner p {
          margin-bottom: 1.2rem;
          color: #1a1a1a;
        }
        .article-detail-inner ul,
        .article-detail-inner ol {
          margin-bottom: 1.2rem;
          padding-left: 1.5rem;
        }
        .article-detail-inner li {
          margin-bottom: 0.4rem;
        }
        .article-detail-inner blockquote {
          border-left: 3px solid #b25340;
          padding-left: 1rem;
          color: #666;
          font-style: italic;
          margin: 1.5rem 0;
        }
        .article-detail-inner img {
          max-width: 100%;
          border-radius: 6px;
          margin: 1.5rem 0;
          display: block;
        }
        .article-detail-inner code {
          background: rgba(0, 0, 0, 0.04);
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          font-family: JetBrains Mono, monospace;
          font-size: 0.9em;
        }
        .article-detail-inner pre {
          background: rgba(0, 0, 0, 0.04);
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .article-detail-inner hr {
          border: none;
          border-top: 1px solid rgba(0,0,0,0.08);
          margin: 2rem 0;
        }
        @media (max-width: 600px) {
          .article-detail-inner {
            padding: 2rem 1rem 3rem;
          }
        }
      `}</style>

      <div className="article-detail-page">
        <div className="article-detail-inner">
          {/* Back link */}
          <div style={{ marginBottom: "1.5rem" }}>
            <Link
              href="/articles"
              style={{
                background: "rgba(0,0,0,0.04)",
                color: "#1a1a1a",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                fontSize: "0.8rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              ← Back to Articles
            </Link>
          </div>

          {/* Meta */}
          <div
            style={{
              fontSize: "0.85rem",
              color: "#666",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {article.category} &middot; {formattedDate}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
              lineHeight: 1.15,
              fontWeight: 700,
              marginBottom: "0.8rem",
              color: "#1a1a1a",
            }}
          >
            {article.title}
          </h1>

          {/* Excerpt */}
          <p
            style={{
              fontSize: "1.1rem",
              color: "#666",
              marginBottom: "2rem",
              lineHeight: 1.55,
            }}
          >
            {article.excerpt}
          </p>

          {/* Hero image */}
          {article.thumbnail && (
            <img
              src={article.thumbnail}
              alt={article.title}
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "2.5rem",
                background: "#eee",
              }}
            />
          )}

          {/* Body content */}
          <div>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.body}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <div
            style={{
              borderTop: "1px solid rgba(0,0,0,0.08)",
              marginTop: "3rem",
              paddingTop: "1.5rem",
              fontSize: "0.8rem",
              color: "#999",
            }}
          >
            <Link
              href="/articles"
              style={{ color: "#999", textDecoration: "underline" }}
            >
              Voir tous les articles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticlePage;