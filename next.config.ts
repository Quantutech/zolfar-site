import type { NextConfig } from "next";

/** Old WordPress portfolio URLs (zolfar.de/portfolio_page/…) → new project pages. */
const legacyWorks: Record<string, string> = {
  "interior-design-next-door": "next-door",
  "salam-vegan-logo": "salam-vegan",
  "collage-bubbles": "bubbles",
  "event-posters": "event-posters",
  "political-impact-art": "political-impact-art",
  "you-dont-look-afghani": "you-dont-look-afghani",
  "graphics-i-business-logos": "business-logos",
  "competition-ventimiglia": "invisible-line",
  "graphics-i-bread-work-freedom": "bread-work-freedom",
  "paintings-i-diaspora-dreams": "diaspora-dreams",
  "arch-i-bamyan-competition": "bamyan-valley",
};

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      ...Object.entries(legacyWorks).map(([from, to]) => ({
        source: `/portfolio_page/${from}`,
        destination: `/works/${to}`,
        permanent: true,
      })),
      { source: "/portfolio_page", destination: "/works", permanent: true },
    ];
  },
};

export default nextConfig;
