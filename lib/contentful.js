import { createClient } from "contentful";

const client =
  process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN
    ? createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      })
    : null;

// Static articles — these are the source of truth for afterworkworkflow.com
// Contentful is optional: if available and has articles, it supplements the list.
const staticArticles = [
  {
    title: "How I Actually Learned Grasshopper (And Why Most Tutorials Are Useless)",
    slug: "how-i-actually-learned-grasshopper",
    excerpt:
      "I learned computational design from a professor's lecture recordings on YouTube — probably 720p, but with my internet at the time they looked like 240p. He didn't even know I was watching.",
    body: `# How I Actually Learned Grasshopper (And Why Most Tutorials Are Useless)

I learned computational design from a professor's blurry 240p lecture recordings on YouTube. He didn't even know I was watching.

That's what it took to learn Grasshopper in 2017. And I have a strong opinion about it: a student in 2026 shouldn't have to squint through blurry YouTube lectures — you should be able to [learn computational design](/courses) properly from the start.

---

I was 20, studying architecture at the National School of Architecture in Morocco. Nobody at my school knew what Grasshopper was. Nobody was [teaching computational design](/courses). But I kept seeing what big firms were doing online — Zaha Hadid, Foster + Partners — and I knew: this is the direction architecture is headed. I just had no way to get there.

So I did what any desperate student does. I went to YouTube.

## The Wrong Way

The tutorials I found were silent. Just screen recordings of someone connecting nodes, fast, with no explanation. Monkey-see, monkey-do. I'd recreate the shapes, but I had no idea why they worked. You can't [design anything original](/courses) that way. All I produced was copies of copies.

I spent months like this. Maybe a year. I could make a Voronoi pattern, sure. But ask me to design something from scratch? Nothing. It's like watching someone solve a Rubik's cube on fast-forward and then expecting to solve one yourself.

## The Turning Point

Then I found Nick Senske.

He was a professor at Iowa State University, uploading recordings of his actual classroom sessions. Not tutorials — real lectures. You could hear students in the background. The uploads were 720p but my internet at the time made them look worse. He was projecting his screen and the camera recorded it, so I could barely read what was on the board.

But I could listen. And he explained the *why*, not just the *how*.

I had one small laptop at the time. To follow along, I had to download his videos and play them at 0.5x speed. I bought an old television and set it up as a second screen — one for Nick, one for my Rhino canvas. That was my setup. That was how I learned.

Speed at 0.5x isn't about being slow. It's about understanding. Most people watch tutorials to *finish* them. I watched to *absorb* them.

I also [asked for help](/contact) online. Without the strangers who answered my questions, I would have quit.

Three years of struggling before I took any [real Grasshopper tutoring](/courses). But here's the thing: if I hadn't done those three years of research first, the tutoring wouldn't have worked. It would have been overwhelming. The struggle built the context.

## The Metaphors That Stuck

The first thing I needed was to understand how Grasshopper thinks. It's not a modeling tool. It's a brain. Rhino is the 3D world — reality. Grasshopper is special glasses that let you see the logic underneath that reality.

The geometry you create inside Grasshopper doesn't exist in Rhino until you *bake* it. The logo for baking? A fried egg. You cook inside Grasshopper, then you pull it out of the oven.

That metaphor unlocked everything. And it led me to a bigger realization.

## The Geometry Hierarchy

> Diagram: point → line → curve → surface → solid

Everything in Rhino and Grasshopper follows this hierarchy:

1. **Point** — X, Y, Z coordinates. Three numbers. That's all a point is.
2. **Line** — Two points connected.
3. **Curve** — Lines that may bend, or not. Open or closed.
4. **Surface** — They are actually closed curves that get filled to become surfaces.
5. **Solid** — You Extrude a surface until it's watertight, no openings. That's a three dimensional building.

This hierarchy is the foundation of everything I build in Grasshopper. Silent tutorials skip this entirely — they jump straight to kangaroo physics and attractor patterns. But without this foundation, you're just copying.

**Try this:** Open Rhino. Place two points anywhere. Reference them in Grasshopper with the Point component.

Connect them to a Line component using two wires. Now move one point in Rhino — watch the line in Grasshopper follow. You just wrote your first parametric script. That's the seed of every complex geometry ever made in Grasshopper.

![](/images/articles/how-i-actually-learned-grasshopper/img_20260607_221159_ce64ef.gif)

## What I Now Know

Grasshopper is not a design tool. It's a data management tool.

Here's what I mean: a point isn't just a location — it's a data structure containing three numbers: X, Y, Z. Every component in Grasshopper is asking for data as input and producing data as output. A Line component doesn't "draw" — it takes two points and returns a mathematical relationship between their coordinates.

The moment I stopped thinking about making pretty shapes and started thinking about inputs, outputs, data types, and hierarchies — that was the moment I actually knew what I was doing.

The form is a result of the system. I never think about the form first. I think about the system — nodes, connections, data flow. The form comes after. That's what computational design actually is.

## A Note to Architecture Schools

We're in 2026. Architecture schools should be [teaching computational design](/courses) to second or third-year students. Computational design isn't a niche skill — it's the equivalent of coding for architects. You're going to spend decades using software and managing data. You need to understand how it works under the hood.

[A course](/courses) in geometry hierarchies, parametric logic, and systems thinking should be as fundamental as construction materials or architectural history. Right now, most schools don't offer it. Students are left to find a blurry 240p lecture from a professor who doesn't know they exist.

That's not good enough anymore.

---

*I help designers and architects conceive using Grasshopper and computational design. If you want to finally [learn Grasshopper from scratch](/courses) with structured guidance, check out my courses. Follow me on [Instagram](https://instagram.com/afterwork.workflow) for daily tips. If your firm wants to transition to digital workflows, [get in touch](/contact) and we'll build it from there.*

*This article is part of a [series on learning computational design](/articles). Next up: data trees and how to build complex geometries from simple rules.*`,
    category: "Insights",
    date: "2026-06-04",
    thumbnail: "/images/articles/how-i-actually-learned-grasshopper/img_20260607_215901_b47b8d.png",
    order: 1,
  },
];

export async function getArticles() {
  // Start with static articles
  let articles = [...staticArticles];

  // Optionally supplement with Contentful articles
  if (client) {
    try {
      const entries = await client.getEntries({
        content_type: "article",
        "fields.category": "AFW",
        order: ["-fields.date"],
      });

      if (entries.items.length) {
        const cfArticles = entries.items.map((item) => ({
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

        // Merge: static first, then CF (dedup by slug)
        const slugs = new Set(articles.map((a) => a.slug));
        for (const a of cfArticles) {
          if (!slugs.has(a.slug)) {
            articles.push(a);
            slugs.add(a.slug);
          }
        }
      }
    } catch (err) {
      console.error("Contentful fetch failed:", err.message);
    }
  }

  // Sort by date descending
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticleBySlug(slug) {
  // Check static first
  const staticMatch = staticArticles.find((a) => a.slug === slug);
  if (staticMatch) return { ...staticMatch };

  // Fallback to Contentful
  if (!client) return null;

  try {
    const entries = await client.getEntries({
      content_type: "article",
      "fields.category": "AFW",
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