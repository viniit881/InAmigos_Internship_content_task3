/**
 * Local assets in /public/images — bundled with the site (no external CDN).
 * Run `npm run assets:fetch` to re-download if files are missing.
 */
export const images = {
  hero: '/images/hero-bg.jpg',
  heroBg: '/images/hero-bg.jpg',
  cta: '/images/cta-bg.jpg',
  aboutHero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1400&auto=format&fit=crop',
  aboutStory: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop',
  contactGym: '/images/contact-gym.jpg',
  booking: '/images/booking-image.jpg',
  membership: '/images/gallery-1.jpg',

  services: {
    pt: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop',
    weightLoss: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop',
    muscleGain: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop',
    strength: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
    diet: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop',
  },

  transforms: {
    before1: '/images/transform-1-before.jpg',
    after1: '/images/transform-1-after.jpg',
    before2: '/images/transform-2-before.jpg',
    after2: '/images/transform-2-after.jpg',
    before3: '/images/transform-3-before.jpg',
    after3: '/images/transform-3-after.jpg',
    t1: '/images/transform-1.png',
    t2: '/images/transform-2.png',
    t3: '/images/transform-3.png',
    t4: '/images/transform-4.png',
    t5: '/images/transform-5.png',
    t6: '/images/transform-6.png',
    t7: '/images/transform-7.png',
    t8: '/images/transform-8.png',
  },

  trainers: {
    one: '/images/trainer-1.jpg',
    two: '/images/trainer-2.jpg',
    three: '/images/trainer-3.jpg',
  },

  avatars: [
    '/images/avatar-1.jpg',
    '/images/avatar-2.jpg',
    '/images/avatar-3.jpg',
    '/images/avatar-1.jpg',
    '/images/avatar-2.jpg',
  ],

  gallery: [
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554244933-d876deb6b2ff?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop',
  ],

  facility: [
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554244933-d876deb6b2ff?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=1000&auto=format&fit=crop',
  ],
} as const

export const videos = {
  hero: '/videos/hero-video.mp4',
  training: '/videos/training-loop.mp4',
} as const
