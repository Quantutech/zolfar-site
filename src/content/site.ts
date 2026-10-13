import type { Discipline } from "./projects";

export const site = {
  name: "Zolfar",
  title: "Zolfar — Architect & Visuals",
  tagline: "Architecture, Graphic Design & Art",
  description:
    "Zolfar is a licensed architect, graphic designer and artist: architecture concepts, logos and branding, posters, collages, paintings and political art projects.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zolfar.de",
  /** Only the real domain may be indexed; review deployments (e.g. *.vercel.app) stay out of search. */
  indexable: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://zolfar.de") === "https://zolfar.de",
  statement: "I focus on concepts and execution.",
  open: "I am open for collaborations & brainstorming.",
} as const;

/** Her "recent work experience" list from the About page, tagged with the thread it belongs to. */
export const practice: { role: string; detail?: string; thread: Discipline | "practice" }[] = [
  { role: "Licensed Architect", detail: "I focus on concepts and execution", thread: "architecture" },
  { role: "Project Management", detail: "& coordination", thread: "practice" },
  { role: "Graphic Designer", detail: "Logos, branding, posters", thread: "graphics" },
  { role: "Event Management", thread: "practice" },
  { role: "Art", detail: "Collages and painting (watercolor & acrylics)", thread: "art" },
  {
    role: "ShurCollective co-founder",
    detail: "I create interactive political art projects in public spaces",
    thread: "collective",
  },
];
