export type ComponentItem = {
  name: string;
  slug: string;
  link: string;
  description: string;
};

export type ComponentCategory = {
  name: string;
  slug: string;
  items: ComponentItem[];
};

export const components: ComponentCategory[] = [
  {
    name: "Text",
    slug: "text",
    items: [
      {
        name: "Scramble",
        slug: "scramble",
        link: "https://framer.com/m/ScrambleText-v9xmyx.js@gM86kQHcv79mfrzDyi37",
        description:
          "Reveal copy with a randomized character shuffle that locks into the final word, perfect for hero sections and landing-page reveals.",
      },
      {
        name: "Text Flicker",
        slug: "text-flicker",
        link: "https://framer.com/m/FlickerText-wBddWw.js@2zrTfBklpswrrwuvufmP",
        description:
          "Neon-sign style flicker that pulses letters in and out with broken-bulb timing, adding a moody late-night atmosphere to your typography.",
      },
      {
        name: "Smoky",
        slug: "smoky",
        link: "https://framer.com/m/SmokyText-Clz4xK.js@PPOFzt42yYZ6j9GEb2MO",
        description:
          "Type that drifts in like smoke — soft blur, low opacity, slight upward drift, ideal for cinematic editorial intros and quiet brand reveals.",
      },
      {
        name: "Text Morph",
        slug: "text-morph",
        link: "https://framer.com/m/TextMorph-sdQpPK.js@fyMNUT2zwkqcUm7QcyQY",
        description:
          "Smoothly morph one headline into the next, letter by letter, without layout shift, great for rotating taglines and value-prop carousels.",
      },
      {
        name: "Bleed",
        slug: "bleed",
        link: "https://framer.com/m/InkBleed-CAHSsD.js@ss7ZR1AGQCf7BCMVeVQX",
        description:
          "Ink-bleed reveal that lets characters seep into the canvas as they appear, evoking the texture of fountain pen on absorbent paper.",
      },
    ],
  },
  {
    name: "Image",
    slug: "image",
    items: [
      {
        name: "Pop-in/pop-out",
        slug: "pop-in-pop-out",
        link: "https://framer.com/m/ImageGallery-3YC6Rw.js@joD3UXGM4SwfM05uPlEd",
        description:
          "Bouncy scale entrance and exit driven by spring physics, tuned for thumbnails, avatar grids, and product cards that need playful motion.",
      },
      {
        name: "Particles",
        slug: "particles",
        link: "https://framer.com/m/ImageParticles-VqA663.js@3lmd95whAQOnZlL0ASSG",
        description:
          "Disintegrate an image into floating particles that re-form on scroll, creating a sci-fi assembly effect for hero visuals.",
      },
      {
        name: "Orbit",
        slug: "orbit",
        link: "https://framer.com/m/ProximityOrbit-ATpvlQ.js@E7hpyqMNZoZeAedkQYoN",
        description:
          "Rotate satellite images around a central anchor with adjustable orbit speed, perfect for feature highlights and ecosystem diagrams.",
      },
      {
        name: "Image Morph",
        slug: "image-morph",
        link: "https://framer.com/m/ImageMorph-kw87ko.js@gNlzTWOqNLBTbnyCPtLf",
        description:
          "Liquid morph that warps one image into another with mesh-based interpolation, delivering smooth before-and-after transitions.",
      },
      {
        name: "Spin",
        slug: "spin",
        link: "https://framer.com/m/SpinImage-82SIJC.js@VdeHnKxoScROKHGUDyfQ",
        description:
          "Continuous rotation with inertia, perfect for loaders, decorative badges, and award seals that should feel alive.",
      },
    ],
  },
];
