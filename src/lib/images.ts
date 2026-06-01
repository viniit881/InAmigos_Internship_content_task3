/**
 * Local assets in /public/images — bundled with the site (no external CDN).
 * Run `npm run assets:fetch` to re-download if files are missing.
 */
export const images = {
  hero: '/images/hero-bg.jpg',
  heroBg: '/images/hero-bg.jpg',
  cta: '/images/cta-bg.jpg',
  aboutHero: '/images/about-hero.jpg',
  aboutStory: '/images/about-story.jpg',
  contactGym: '/images/contact-gym.jpg',
  booking: '/images/booking-image.jpg',
  membership: '/images/gallery-1.jpg',

  services: {
    pt: '/images/service-pt.jpg',
    weightLoss: '/images/service-weightloss.jpg',
    muscleGain: '/images/service-musclegain.jpg',
    strength: '/images/service-strength.jpg',
    diet: '/images/service-diet.jpg',
  },

  transforms: {
    before1: '/images/transform-1-before.jpg',
    after1: '/images/transform-1-after.jpg',
    before2: '/images/transform-2-before.jpg',
    after2: '/images/transform-2-after.jpg',
    before3: '/images/transform-3-before.jpg',
    after3: '/images/transform-3-after.jpg',
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
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/about-story.jpg',
    '/images/cta-bg.jpg',
    '/images/contact-gym.jpg',
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
  ],

  facility: [
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/about-story.jpg',
    '/images/cta-bg.jpg',
    '/images/contact-gym.jpg',
  ],
} as const

export const videos = {
  hero: '/videos/hero-video.mp4',
  training: '/videos/training-loop.mp4',
} as const
