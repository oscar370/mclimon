import { getCollection } from "astro:content";

export async function getTutorials() {
  return (await getCollection("tutorials", ({ data }) => !data.draft))
    .sort((a, b) => a.data.order - b.data.order)
    .map((t) => ({
      id: t.id,
      title: t.data.title,
      href: `/tutorials/${t.id}/`,
    }));
}
