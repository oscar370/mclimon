import { getCollection } from "astro:content";

export async function getTutorials() {
  const tutorials = await getCollection("tutorials");
  return tutorials.sort((a, b) => a.data.order - b.data.order);
}

export type TutorialLink = {
  id: string;
  title: string;
  href: string;
};

export async function getTutorialLinks(): Promise<TutorialLink[]> {
  const tutorials = await getTutorials();

  return tutorials.map((tutorial, index) => ({
    id: tutorial.id,
    title: tutorial.data.title,
    href: index === 0 ? "/tutorials/" : `/tutorials/${tutorial.id}/`,
  }));
}
