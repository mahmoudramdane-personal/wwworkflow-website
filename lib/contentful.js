import { createClient } from "contentful";

const client =
  process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN
    ? createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      })
    : null;

export async function getArticles() {
  if (!client) return [];

  try {
    const entries = await client.getEntries({
      content_type: "article",
      order: ["-fields.date"],
    });

    if (!entries.items.length) return [];

    return entries.items.map((item) => ({
      title: item.fields.title,
      slug: item.fields.slug,
      excerpt: item.fields.excerpt,
      category: item.fields.category || "",
      date: item.fields.date,
      thumbnail: item.fields.thumbnail
        ? `https:${item.fields.thumbnail.fields.file.url}`
        : null,
      order: item.fields.order || 0,
    }));
  } catch (err) {
    console.error("Contentful fetch failed:", err.message);
    return [];
  }
}

export async function getArticleBySlug(slug) {
  if (!client) return null;

  try {
    const entries = await client.getEntries({
      content_type: "article",
      "fields.slug": slug,
      limit: 1,
    });

    if (!entries.items.length) return null;

    const item = entries.items[0];
    return {
      title: item.fields.title,
      slug: item.fields.slug,
      excerpt: item.fields.excerpt,
      body: item.fields.body,
      category: item.fields.category || "",
      date: item.fields.date,
      thumbnail: item.fields.thumbnail
        ? `https:${item.fields.thumbnail.fields.file.url}`
        : null,
      order: item.fields.order || 0,
    };
  } catch (err) {
    console.error("Contentful fetch failed:", err.message);
    return null;
  }
}
