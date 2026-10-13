import type { StaticImageData } from "next/image";

import bamyan1 from "./media/bamyan-valley/01-board.jpg";
import bamyan2 from "./media/bamyan-valley/02-board.jpg";
import bamyan3 from "./media/bamyan-valley/03-board.jpg";
import bamyan4 from "./media/bamyan-valley/04-board.jpg";
import breadLogo from "./media/bread-work-freedom/01-logo.png";
import breadBackdrop from "./media/bread-work-freedom/02-backdrop.jpg";
import breadConference from "./media/bread-work-freedom/03-conference.jpg";
import bubbles from "./media/bubbles/01-bubbles.jpg";
import logosCard from "./media/business-logos/01-rawline-card.jpg";
import logosWorkwear from "./media/business-logos/02-workwear.jpg";
import logosEntrance from "./media/business-logos/03-entrance.jpg";
import diaspora from "./media/diaspora-dreams/01-painting.jpg";
import posterTreasures from "./media/event-posters/01-hidden-music-treasures.png";
import posterDeejay from "./media/event-posters/02-deejay-stan.png";
import posterKabul from "./media/event-posters/03-kabul-nights.png";
import line1 from "./media/invisible-line/01-board.jpg";
import line2 from "./media/invisible-line/02-board.jpg";
import nextDoorBar from "./media/next-door/01-bar.jpg";
import nextDoorCounter from "./media/next-door/02-counter.jpg";
import nextDoorLounge from "./media/next-door/03-lounge.jpg";
import nextDoorBooth from "./media/next-door/04-booth.jpg";
import workshopFlyer from "./media/political-impact-art/01-flyer.jpg";
import workshop2 from "./media/political-impact-art/02-collage.jpg";
import workshop3 from "./media/political-impact-art/03-collage.jpg";
import workshop4 from "./media/political-impact-art/04-collage.jpg";
import workshop5 from "./media/political-impact-art/05-collage.jpg";
import workshop6 from "./media/political-impact-art/06-collage.jpg";
import workshopTable from "./media/political-impact-art/07-table.jpg";
import salamLogo from "./media/salam-vegan/01-logo.png";
import salamCard from "./media/salam-vegan/02-business-card.jpg";
import salamEnsemble from "./media/salam-vegan/03-card-and-catering.jpg";
import salamCatering from "./media/salam-vegan/04-catering.jpg";
import coin from "./media/you-dont-look-afghani/01-coin.jpg";

export type Discipline = "architecture" | "graphics" | "art" | "collective";

/** How a project's gallery is staged: boards on a drafting grid, cut-outs, a poster wall, a workshop table. */
export type Staging = "drafting" | "collage" | "wall" | "table";

export type Shot = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  /** Archive number shown across the site, e.g. "Z—04". */
  no: string;
  title: string;
  /** The label her original tiles carried, e.g. "Interior Architecture". */
  kind: string;
  discipline: Discipline;
  staging: Staging;
  /** One sentence for cards, previews and the meta description. */
  summary: string;
  facts: { label: string; value: string }[];
  /** Her own words from zolfar.de (spelling fixes only). */
  body: string[];
  quote?: string;
  /** Optional Persian line that belongs to the work itself. */
  persian?: string;
  cover: Shot;
  gallery: Shot[];
  /** Crop used inside the lattice diamond when the cover is too wide or text-heavy. */
  thumb?: { src: StaticImageData; position?: string };
};

export const disciplines: Record<Discipline, { label: string; color: string; ink: string }> = {
  architecture: { label: "Architecture", color: "var(--aqua)", ink: "var(--ink)" },
  graphics: { label: "Graphics", color: "var(--orchid)", ink: "var(--ink)" },
  art: { label: "Art", color: "var(--vermilion)", ink: "var(--paper)" },
  collective: { label: "Collective", color: "var(--saffron)", ink: "var(--ink)" },
};

const list: Omit<Project, "no">[] = [
  {
    slug: "next-door",
    title: "Next Door",
    kind: "Interior Architecture",
    discipline: "architecture",
    staging: "drafting",
    summary:
      "A craft beer and cocktail bar next door to O’Reilly’s Irish Pub in Stuttgart West — from concept and city approval to copper details and the menu.",
    facts: [
      { label: "Client", value: "O’Reilly’s Irish Pub" },
      { label: "Place", value: "Stuttgart West" },
      { label: "Role", value: "Concept, approvals, execution, branding" },
      { label: "Woodwork", value: "Ado Ulrich" },
    ],
    body: [
      "O’Reilly’s Irish Pub in Stuttgart West, a cozy and traditional spot, had a unique vision: to create a Craft Beer and Cocktail Bar next door.",
      "To improve worker-customer interaction, I placed the bar at the center, making it easy for customers to find their spot and keeping the essence of O’Reilly’s at the core. The design combines old and new elements, blending familiarity with modern simplicity.",
      "Throughout this project, I played a multifaceted role, from concept development and participation in the city approval process to overseeing its execution and managing the reconstruction efforts following water damage from the floor above, which impacted half of the Pub. I took a hands-on approach to crafting various elements of the bar, including all the copper details such as the coat hanger, foot railing, copper shelves, the central light piece featuring bottle-inspired elements, a copper room separator, trombone lights, and Cymbal wall lights.",
      "In the construction phase, I curated the color palette, selected the furniture, designed the lighting scheme, painted the walls, laid bricks, and even handled the graphic design, covering everything from the overall branding, including the logo, to the menu.",
      "I had the pleasure of collaborating with Ado Ulrich, a skilled carpenter, and a good friend, who contributed his expertise. Ado took charge of all the woodwork, crafting the central bar piece and tables. This collaboration allowed us to exchange ideas and bring out the best in each other’s skills.",
    ],
    quote: "I placed the bar at the center, keeping the essence of O’Reilly’s at the core.",
    cover: { src: nextDoorBar, alt: "Next Door bar: dark wood counter with leather stools under copper pendant rails and a wall of bottles" },
    gallery: [
      { src: nextDoorCounter, alt: "Long wooden bar counter with copper foot railing and leather bar stools", caption: "The bar at the center" },
      { src: nextDoorLounge, alt: "Teal-walled lounge with brick, leather chesterfield seating and framed pictures", caption: "Old and new, side by side" },
      { src: nextDoorBooth, alt: "Red leather booth by the window with a copper room separator", caption: "Copper room separator" },
    ],
  },
  {
    slug: "salam-vegan",
    title: "Salam Vegan",
    kind: "Logo Design",
    discipline: "graphics",
    staging: "wall",
    summary: "A logo between Farsi calligraphy and hip-hop graffiti for @salam.vegan, crafted letter by letter.",
    facts: [
      { label: "Client", value: "@salam.vegan" },
      { label: "Style", value: "Farsi calligraphy × hip-hop graffiti" },
      { label: "Year", value: "2025" },
    ],
    body: [
      "Recently I had the pleasure and challenge to design @salam.vegan’s new logo. Through our talks, I understood the style she wanted to have, which was between Farsi calligraphy and hip-hop/graffiti. Since I’m not a trained calligraphy artist, this was an exciting but also an unknown territory.",
      "When I presented the options I was excited to see Fereschta’s reaction and how much she loved it. Paying attention to details, on how letters collide with each other and adding the khaal (4 dots) contributed to the crafting of an at last Afghan hip-hop and calligraphy logo. I feel honoured to be able to do this for my fellow hamwatan and friend.",
      "The pictures are the logo and some images of the business card at an event @salam.vegan did the catering for. She got some bad-ass recipes and you can write her for catering.",
    ],
    quote: "An Afghan hip-hop and calligraphy logo.",
    cover: { src: salamLogo, alt: "Salam Vegan logo: turquoise Farsi-inspired calligraphy with a four-dot khaal" },
    gallery: [
      { src: salamCard, alt: "Salam Vegan business card held over a catering table", caption: "Business card" },
      { src: salamEnsemble, alt: "Catering spread with dips and pastries next to a Salam Vegan card", caption: "Ensemble of card and catering" },
      { src: salamCatering, alt: "Candle-lit vegan catering table on a red kilim runner", caption: "Catering ensemble with card" },
    ],
  },
  {
    slug: "bubbles",
    title: "Bubbles",
    kind: "Collage",
    discipline: "art",
    staging: "collage",
    summary:
      "A collage about a refugee girl blowing bubbles on unknown tracks — published in ‘What’s Afghan Punk Rock Anyways?’.",
    facts: [
      { label: "Published in", value: "What’s Afghan Punk Rock Anyways?" },
    ],
    body: [
      "The story of a refugee girl (inspired by a photograph taken at the train station in Hungary). Within the midst of chaos, the little girl was still embracing her childhood: dreaming. Dreaming of all that could be, but nothing is sure, just like the fragility of the bubbles being blown.",
      "The backdrop is an excerpt of rubble of the war she is fleeing from; the tracks are the journey unknown. Uncertainty is future — we all have hopes and dreams but they are all fragile like the bubbles that could pop anytime.",
      "Published in the magazine ‘What’s Afghan Punk Rock Anyways?’",
    ],
    quote: "We all have hopes and dreams but they are all fragile like the bubbles that could pop anytime.",
    cover: { src: bubbles, alt: "Collage: a girl in pink blows a stream of bubbles while standing on railway tracks before a grey disc of rubble" },
    gallery: [],
  },
  {
    slug: "event-posters",
    title: "Event Posters",
    kind: "Graphics",
    discipline: "graphics",
    staging: "wall",
    summary: "Posters for Afghan music nights and an exhibition of Afghan vinyl, cassettes and audio-visual material.",
    facts: [
      { label: "Events", value: "Markk Museum · Westwerk · Cascadas, Hamburg" },
      { label: "Year", value: "2023" },
      { label: "Format", value: "Social media & web" },
    ],
    body: [
      "Creating eye-catching event posters for promotion on social media and websites is an essential aspect of event marketing. These graphic designs are instrumental in conveying event details and attracting attendees. They blend creativity with strategic visual communication to inform and engage the target audience effectively.",
    ],
    cover: { src: posterTreasures, alt: "Poster ‘Afghanistan’s Hidden Music Treasures’: a vintage record with Persian label inside a stamp frame, Markk Museum, 27.10.2023" },
    gallery: [
      { src: posterDeejay, alt: "Poster ‘Deejay-stan Mix’ in neon yellow with a portrait and Persian lettering, Westwerk, 28.10.2023", caption: "Deejay-stan · Westwerk" },
      { src: posterKabul, alt: "Poster ‘Kabul Nights’ in pink neon script on a starry night sky, Cascadas Hamburg, 29.09.2023", caption: "Kabul Nights · Cascadas Hamburg" },
    ],
    thumb: { src: posterTreasures, position: "50% 45%" },
  },
  {
    slug: "political-impact-art",
    title: "Political Impact Art",
    kind: "Workshop",
    discipline: "collective",
    staging: "table",
    summary:
      "An open, free collage workshop where people from different backgrounds turn magazines and scraps into political messages.",
    facts: [
      { label: "Format", value: "Open, free collage workshop" },
      { label: "Place", value: "studio nagelneu, Berlin" },
      { label: "Date", value: "16 February 2022" },
    ],
    body: [
      "An open, free collaboration of political impact art workshop using magazines, scraps, and collaging paper or snippets brings together people from different backgrounds. In this informal setting, participants explore and express political messages creatively, fostering open exchanges and providing a unique space to discuss and communicate complex political topics.",
      "The informal atmosphere of the workshop lends a sense of lightness to even the most serious of subjects, offering a space for individuals to explore and communicate their thoughts on political matters through different forms of artistic communication. This collaborative environment encourages the exploration of different viewpoints and the creation of thought-provoking artwork that sparks discussions.",
    ],
    quote: "A sense of lightness to even the most serious of subjects.",
    cover: { src: workshopFlyer, alt: "Workshop flyer with ransom-note lettering ‘Political Art Impact’, a megaphone and a collaged crowd" },
    gallery: [
      { src: workshop2, alt: "Participant collage ‘Collecting deep fake people / embodied histories’ framed by portraits", caption: "Embodied histories" },
      { src: workshop3, alt: "Collage ‘Equality’ with a magenta circle, cranes and German headlines", caption: "Equality" },
      { src: workshop4, alt: "Dense collage of headlines including ‘Faith Fucks’ and ‘Satt werden’", caption: "Satt werden" },
      { src: workshop5, alt: "Collage with a speckled red background, cut-out figures and Persian handwriting", caption: "Cut-outs and handwriting" },
      { src: workshop6, alt: "Vertical collage of clippings and notes with an orange speech bubble", caption: "Notes and clippings" },
      { src: workshopTable, alt: "Workshop table covered in magazines, scissors and drinks", caption: "The table" },
    ],
    thumb: { src: workshop4, position: "45% 50%" },
  },
  {
    slug: "you-dont-look-afghani",
    title: "You don’t look Afghani",
    kind: "Watercolor",
    discipline: "art",
    staging: "collage",
    summary:
      "A watercolor answer to a backhanded compliment — the Afghani is, in fact, the currency of Afghanistan.",
    facts: [],
    body: [
      "This watercolor piece is based on the many times I was told that I do not look ‘Afghani’. Mostly the people that said this do not know the many different faces and ways people of Afghanistan can look like.",
      "‘Afghani’ in fact, is the currency of Afghanistan. My take on these backhanded ‘compliments’ is to make beautiful humorous art out of it.",
    ],
    quote: "‘Afghani’ in fact, is the currency of Afghanistan.",
    cover: { src: coin, alt: "Watercolor of a gold one-afghani coin reading ‘You don’t look Afghani’, framed by violet kilim motifs" },
    gallery: [],
  },
  {
    slug: "business-logos",
    title: "Business Logos",
    kind: "Logo Design",
    discipline: "graphics",
    staging: "wall",
    summary: "Logos for small businesses — a carpentry, a mechanic, a Lebanese restaurant — each drawn from the character of the work.",
    facts: [{ label: "For", value: "Small businesses" }],
    body: [
      "Examples of logos created for small businesses. The essence of the logo lies in the characteristics of the work it is supposed to present. Whether it is carpentry, a mechanic or a Lebanese restaurant.",
    ],
    cover: { src: logosCard, alt: "Rawline business cards on dark wood, black card with a geometric R monogram" },
    gallery: [
      { src: logosWorkwear, alt: "Two mechanics seen from behind wearing black shirts with the workshop logo", caption: "Workwear" },
      { src: logosEntrance, alt: "Workshop entrance with the logo on a vertical sign beside the glass door", caption: "Signage" },
    ],
  },
  {
    slug: "invisible-line",
    title: "Invisible Line",
    kind: "Architecture Competition",
    discipline: "architecture",
    staging: "drafting",
    summary:
      "A competition entry for the Ventimiglia–Menton border: scaffolding spaces and reclaimed buildings where locals and migrants meet.",
    facts: [
      { label: "Site", value: "Ventimiglia – Menton, French–Italian border" },
      { label: "Entry", value: "Team project" },
    ],
    body: [
      "Every year hundreds of thousands of refugees arrive to the shores of Europe as well as the land barriers. These are heavily controlled and passing through these borders is both deadly and highly difficult. Through persistence some are able to make it into the Schengen zone. Refugees come from war zones and poverty-stricken countries to seek a better life. Even with the creation of the European Union and the Schengen Zone that advertises free movement — since 2015 border police and control check points have been made explicitly to stop undocumented people from moving from one country to the next.",
      "On the Franco-Italian border, we took our focus on the coastal cities Ventimiglia–Menton. Human borders are in this area stopping people from passing through car traffic, train entrances and mountain hiking.",
      "Each year people suffer the consequences of this border, whether it is physical or mental abuse or worse: death. Some have their items confiscated, stolen and or broken as they return to Italy after being held in containers up to 12 hours. Crime has increased as a result of hopelessness — not only to local people through breaking into empty summer houses but also taking advantage of new refugees by human trafficking or tricking them into believing they are smugglers; thus, the hostility is increasing day by day. The lack of infrastructure, social spaces and interactive elements in the city does not allow people to connect and understand each other and dehumanises refugees in need.",
      "Our solutions include modular scaffolding spaces, where different groups are encouraged to meet through local, French and migrant arts and food. Abandoned industrial buildings are recreated for cultural exchange and interaction through cinema, art galleries and recreational activities.",
      "We believe that the hostility from the local culture to the migrant crowds comes from only seeing humans in a critical state. A state of displacement, where the basic needs of the human are not provided. By providing safe spaces and spaces that humanise the migrant we effectively can allow them to feel included in different activities that clearly show their cultures are appreciated. An interaction between the local culture and the migrants is crucial for harmonising the situation and creating positive spaces. Sharing knowledge of each other’s cultures, giving spaces of interaction and encouraging interaction is how we believe strangers could get a stronger sense of empathy for each other.",
    ],
    quote: "Strangers could get a stronger sense of empathy for each other.",
    cover: { src: line2, alt: "Competition board ‘invisible LINE’: map of Europe and Ventimiglia with circular diagrams over a blue coastline" },
    gallery: [
      { src: line1, alt: "Competition board: axonometric scaffolding pavilions in pink and teal along the coast", caption: "Modular scaffolding spaces" },
    ],
    thumb: { src: line1, position: "30% 40%" },
  },
  {
    slug: "bread-work-freedom",
    title: "Bread Work Freedom",
    kind: "Logo Design",
    discipline: "graphics",
    staging: "wall",
    summary: "‘Nan, Kar, Azadi’ — a solidarity logo with Afghan women, designed for the VAFO e.V. conference.",
    facts: [
      { label: "Client", value: "VAFO e.V." },
      { label: "Used for", value: "Conference backdrop & presentations" },
    ],
    body: [
      "For the VAFO e.V. I have designed a ‘Bread Work Freedom’ logo, which was used for the conference, as a backdrop, on their presentations etc.",
    ],
    persian: "نان کار آزادی",
    cover: { src: breadLogo, alt: "Logo ‘نان کار آزادی’ in green, red and black with ‘Solidarity with Afghan women’" },
    gallery: [
      { src: breadBackdrop, alt: "The Bread Work Freedom logo printed on a conference backdrop", caption: "Conference backdrop" },
      { src: breadConference, alt: "Conference participants holding signs with the logo in a hall", caption: "At the conference" },
    ],
    thumb: { src: breadBackdrop, position: "38% 50%" },
  },
  {
    slug: "diaspora-dreams",
    title: "Diaspora Dreams",
    kind: "Painting",
    discipline: "art",
    staging: "collage",
    summary: "An acrylic painting of interlocking kilim motifs in green and saffron on deep red.",
    facts: [{ label: "Medium", value: "Acrylic on canvas" }],
    body: [],
    cover: { src: diaspora, alt: "Acrylic painting: interlocking green and yellow kilim motifs on a deep red ground" },
    gallery: [],
  },
  {
    slug: "bamyan-valley",
    title: "Bamyan Valley",
    kind: "Architecture Competition",
    discipline: "architecture",
    staging: "drafting",
    summary:
      "A cultural centre for Bamiyan built on the octagon hidden in Afghan carpets — a place to reconnect and learn about culture and common practices.",
    facts: [
      { label: "Site", value: "Bamiyan, Afghanistan" },
      { label: "Program", value: "Cultural centre" },
      { label: "Season", value: "Winter 2015" },
      { label: "Boards", value: "4" },
    ],
    body: [
      "The carpet and the act of weaving and creation that it embodies, has been and continues to be an integral practice in Afghanistan. The greatest aspect of the significance of carpets in Afghanistan is that despite the differences and quarrels between tribes, the woven artwork suspends those tensions for the universal admiration of the beautiful designs no matter whose hands created it.",
      "Through analysing the pattern of the carpets a common shape of the octagon is found in Afghan carpets. The octagon, disguised in several different ways, has become an aspect that allows one to recognize the carpet to come from Afghanistan.",
      "As Bamiyan has suffered through the war and has become a cultural heritage site through UNESCO, this cultural center will allow Bamiyan to reconnect and educate about culture and common practices.",
    ],
    quote: "The woven artwork suspends those tensions — no matter whose hands created it.",
    cover: { src: bamyan1, alt: "Competition board 1: concept text, diagrams and a long elevation of the building set into the Bamyan landscape" },
    gallery: [
      { src: bamyan2, alt: "Competition board 2: concept diagram, interior renderings and a long section", caption: "Concept & section" },
      { src: bamyan3, alt: "Competition board 3: site plan and floor plan with a building section", caption: "Plans" },
      { src: bamyan4, alt: "Competition board 4: plan and sections with UNESCO Bamyan Valley titling", caption: "Sections" },
    ],
    thumb: { src: bamyan2, position: "38% 30%" },
  },
];

export const projects: Project[] = list.map((p, i) => ({ ...p, no: `Z—${String(i + 1).padStart(2, "0")}` }));

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function neighbours(slug: string): { prev: Project; next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
