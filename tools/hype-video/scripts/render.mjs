import { spawn, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { chromium } from 'playwright'
import { config, totalSeconds } from '../storyboard.mjs'
import { repoRoot, startStaticServer, toolDir } from './static-server.mjs'

if (spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status !== 0) {
  throw new Error('ffmpeg was not found on PATH.')
}

const music = join(toolDir, 'build', 'music.wav')
if (!existsSync(music)) throw new Error('build/music.wav is missing. Run npm run music first.')

const output = resolve(repoRoot, config.output)
const previewOutput = resolve(repoRoot, config.previewOutput)
const standardOutput = resolve(repoRoot, config.standardOutput)
const duration = totalSeconds()
const server = await startStaticServer()
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: config.width, height: config.height }, deviceScaleFactor: 1 })

try {
  await page.goto(`${server.url}/tools/hype-video/composition/index.html`, { waitUntil: 'load' })
  await page.evaluate(() => window.__video.ready)
  await mkdir(dirname(output), { recursive: true })

  const args = [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(config.fps), '-c:v', 'mjpeg', '-i', '-',
    '-i', music,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(config.fps),
    '-c:a', 'aac', '-b:a', '256k', '-ar', '48000',
    '-t', String(duration), '-movflags', '+faststart', output,
  ]
  const ffmpeg = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] })
  const finished = new Promise((resolvePromise, reject) => {
    ffmpeg.on('error', reject)
    ffmpeg.on('close', (code) => code === 0 ? resolvePromise() : reject(new Error(`ffmpeg exited with ${code}`)))
  })

  const frames = Math.round(duration * config.fps)
  for (let frame = 0; frame < frames; frame++) {
    const time = frame / config.fps
    await page.evaluate((value) => window.__video.seek(value), time)
    const jpeg = await page.screenshot({ type: 'jpeg', quality: 95 })
    if (!ffmpeg.stdin.write(jpeg)) await new Promise((resolvePromise) => ffmpeg.stdin.once('drain', resolvePromise))
    if (frame % config.fps === 0 || frame === frames - 1) process.stdout.write(`\rframe ${frame + 1}/${frames} (${time.toFixed(1)}s)`)
  }
  ffmpeg.stdin.end()
  await finished
  process.stdout.write('\n')

  const crop = spawnSync('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', output,
    '-vf', 'crop=1920:886:0:97,format=yuv420p',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
    '-c:a', 'aac', '-b:a', '256k', '-ar', '48000',
    '-movflags', '+faststart', previewOutput,
  ], { stdio: 'inherit' })
  if (crop.status !== 0) throw new Error('App Store preview export failed.')

  const standard = spawnSync('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', output,
    '-filter_complex',
    '[0:v]split=2[background][foreground];' +
      '[background]scale=1600:1200:force_original_aspect_ratio=increase,crop=1600:1200,' +
      'boxblur=32:12,eq=brightness=-0.18:saturation=0.85[backdrop];' +
      '[foreground]scale=1600:900[content];' +
      '[backdrop][content]overlay=0:150,format=yuv420p[video]',
    '-map', '[video]', '-map', '0:a',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
    '-c:a', 'aac', '-b:a', '256k', '-ar', '48000',
    '-movflags', '+faststart', standardOutput,
  ], { stdio: 'inherit' })
  if (standard.status !== 0) throw new Error('1600x1200 export failed.')

  console.log(`rendered ${output}`)
  console.log(`rendered ${previewOutput}`)
  console.log(`rendered ${standardOutput}`)
} finally {
  await browser.close()
  await server.close()
}
