/**
 * Downloads gym images + hero video into public/
 * Usage: npm run assets:fetch
 */
import { mkdir, writeFile, access, copyFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const imagesDir = join(root, 'public', 'images')
const videosDir = join(root, 'public', 'videos')

/** Pexels — stable direct downloads */
const pexels = (id, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

const imageFiles = {
  'hero-bg.jpg': pexels(1954524, 1920),
  'about-hero.jpg': pexels(2261488, 1600),
  'about-story.jpg': pexels(3253491, 1200),
  'cta-bg.jpg': pexels(1552242, 1920),
  'contact-gym.jpg': pexels(841130, 1600),
  'booking-image.jpg': pexels(3823037, 1200),
  'gallery-1.jpg': pexels(1954524, 1200),
  'gallery-2.jpg': pexels(1552242, 1200),
  'gallery-3.jpg': pexels(2261488, 1200),
  'service-pt.jpg': pexels(3823037, 1200),
  'service-weightloss.jpg': pexels(3076516, 1200),
  'service-musclegain.jpg': pexels(1310651, 1200),
  'service-strength.jpg': pexels(416475, 1200),
  'service-diet.jpg': pexels(863926, 1200),
  'transform-1-before.jpg': pexels(2379005, 800),
  'transform-1-after.jpg': pexels(2294403, 800),
  'transform-2-before.jpg': pexels(1431282, 800),
  'transform-2-after.jpg': pexels(2294403, 800),
  'transform-3-before.jpg': pexels(2379005, 800),
  'transform-3-after.jpg': pexels(2294361, 800),
  'trainer-1.jpg': pexels(2294403, 800),
  'trainer-2.jpg': pexels(3823037, 800),
  'trainer-3.jpg': pexels(2294361, 800),
  'avatar-1.jpg': pexels(1431282, 400),
  'avatar-2.jpg': pexels(774909, 400),
  'avatar-3.jpg': pexels(2294403, 400),
}

const videoFiles = {
  'hero-video.mp4':
    'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-with-dumbbells-in-a-gym-4340-large.mp4',
  'training-loop.mp4':
    'https://assets.mixkit.co/videos/preview/mixkit-gym-training-with-dumbbells-4340-large.mp4',
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'SummitCoreFitness-AssetFetcher/1.0' },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1000) throw new Error(`File too small: ${dest}`)
  await writeFile(dest, buf)
  console.log('✓', dest.replace(root, ''))
}

await mkdir(imagesDir, { recursive: true })
await mkdir(videosDir, { recursive: true })

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

console.log('Downloading images…')
for (const [name, url] of Object.entries(imageFiles)) {
  const dest = join(imagesDir, name)
  if (await exists(dest)) {
    console.log('– skip', dest.replace(root, ''))
    continue
  }
  await download(url, dest)
}

console.log('Downloading videos…')
for (const [name, url] of Object.entries(videoFiles)) {
  const dest = join(videosDir, name)
  if (await exists(dest)) {
    console.log('– skip', dest.replace(root, ''))
    continue
  }
  try {
    await download(url, dest)
  } catch (err) {
    console.warn('!', name, err.message)
  }
}

const heroPath = join(videosDir, 'hero-video.mp4')
const trainingPath = join(videosDir, 'training-loop.mp4')
if ((await exists(heroPath)) && !(await exists(trainingPath))) {
  await copyFile(heroPath, trainingPath)
  console.log('✓ copied hero-video → training-loop.mp4')
}

console.log('Done — assets in public/images and public/videos')
