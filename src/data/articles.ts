import { Article } from '../types/product';
import { heroCampaignImg, craftAtelierImg, velvetHaloModelImg } from './products';

export const ARTICLES: Article[] = [
  {
    id: 'art-01',
    slug: 'the-anatomy-of-24k-gold-metallurgy',
    title: 'The Anatomy of 24K Gold Metallurgy: Why Weight Matters',
    subtitle: 'On solid brass chassis, 3-micron electroplating baths, and the tactile authority of genuine metals.',
    category: 'Atelier Metallurgy',
    author: {
      name: 'Benoît de Courcelles',
      role: 'Master Metallurgist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: 'October 1, 2026',
    readTime: '6 min read',
    heroImage: craftAtelierImg,
    excerpt: 'In an era dominated by featherweight hollow alloys, true luxury resides in gravity. When a 24k gold clasp clicks shut with hermetic precision, it asserts an undeniable physical sovereignty.',
    content: [
      'The modern fashion landscape is flooded with composite metals masquerading as gold. Hollow zamak alloys coated in a vanishingly thin flash of varnish degrade within months under natural skin contact and perfume oils.',
      'At LUNÉA, every arch handle, turn-lock, and serpentine link is poured as solid jeweler’s brass before undergoing a 3-micron 24-karat gold electroplating bath. This thickness allows the gold to form an authentic crystalline bond with the substrate metal, impervious to everyday oxidation.',
      'When you take a LUNÉA bag in hand, you immediately feel the cold density of real metallurgy. It does not rattle or chatter. It operates with the dampened, hydraulic confidence of vault machinery.',
      'Because true luxury is not merely an image caught across a dimly lit room; it is an intimate sensory relationship between human touch and enduring matter.',
    ],
  },
  {
    id: 'art-02',
    slug: 'the-nocturne-hour-dressing-for-midnight-paris',
    title: 'The Nocturne Hour: Dressing for Paris When the Lights Dim',
    subtitle: 'Why the darkest black requires the warmest gold to achieve timeless optical presence.',
    category: 'Nocturne Editorial',
    author: {
      name: 'Vivienne Vance',
      role: 'Senior Stylist & Curator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: 'October 4, 2026',
    readTime: '5 min read',
    heroImage: heroCampaignImg,
    excerpt: 'Nocturne dressing is not about blending into shadows; it is about orchestrating how evening spotlights and candlelight slice through darkness.',
    content: [
      'At night, color behaves unpredictably. Saturated jewel tones flatten under warm candlelight, while soft pastels dissolve into gray. Pure obsidian noir, however, functions as an infinite void.',
      'When deep obsidian calfskin or midnight crushed velvet is framed by high-contrast 24k gold geometry, something theatrical happens: the gold acts as an optical amplifier, capturing low ambient lumens and creating our signature Aura Infinity bloom.',
      'Whether attending an opera premiere, an intimate private salon dinner on Place Vendôme, or an after-hours gallery preview, this juxtaposition commands immediate attention with effortless dignity.',
    ],
  },
  {
    id: 'art-03',
    slug: 'french-boxcalf-and-the-lost-art-of-saddle-stitching',
    title: 'French Boxcalf & The Lost Discipline of Saddle-Stitching',
    subtitle: 'Thirty-eight hours of hand-tensioned beeswax linen thread per individual bag chassis.',
    category: 'Craftsmanship Heritage',
    author: {
      name: 'Mathieu Laurent',
      role: 'Atelier Director, Rue Saint-Honoré',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    publishedAt: 'September 26, 2026',
    readTime: '7 min read',
    heroImage: velvetHaloModelImg,
    excerpt: 'Machine lock-stitches unravel when a single thread snaps. The traditional double-needle saddle stitch is self-locking, preserving leather tension for centuries.',
    content: [
      'In a world addicted to computational speed, manual hand-stitching can appear anachronistic. Yet no mechanized needle has ever matched the dynamic tension adjustment of a trained artisan’s fingers.',
      'Our boxcalf hides are sourced from the volcanic Auvergne region, where mineral-rich pastures produce skins of unmatched density and micro-fine grain.',
      'With each pass of two blunt needles through hand-punched diamond awl holes, the beeswax-coated linen cord forms a perpetual figure-eight knot. Should one thread experience severe wear after forty years, the stitch refuses to unravel.',
      'This is why we provide a lifetime warranty on every chassis that departs our Rue Saint-Honoré workroom.',
    ],
  },
];
