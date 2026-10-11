import { config, secondsPerBar, timeline, totalSeconds } from '../storyboard.mjs'
import { builders, clamp } from './scenes.js'

const params = new URLSearchParams(location.search)
const preview = params.has('preview')
const stage = document.getElementById('stage')
const scenesRoot = document.getElementById('scenes')
const canvas = document.getElementById('background')
const paint = canvas.getContext('2d')
const flash = document.getElementById('flash')
const fade = document.getElementById('fade')
const scenes = timeline()
const duration = totalSeconds()
const beat = 60 / config.bpm
const bar = secondsPerBar()

const random = (() => {
  let seed = config.music.seed
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
})()

const particles = Array.from({ length: 85 }, () => ({
  x: random() * config.width,
  phase: random(),
  speed: .035 + random() * .075,
  size: 1 + random() * 4,
  sway: 20 + random() * 55,
  warm: random() > .35,
}))

const palettes = [
  ['#171a3d', '#232057', '#0c5961'],
  ['#261641', '#512559', '#0d5966'],
  ['#102f43', '#126e73', '#24234f'],
  ['#171b46', '#313078', '#0c6068'],
  ['#241943', '#4c2864', '#155b70'],
  ['#142b48', '#1c4962', '#39204f'],
  ['#23183f', '#542850', '#0d6269'],
]

function background(t, pulse, scene) {
  const colors = palettes[scene.index % palettes.length]
  const gradient = paint.createLinearGradient(0, 0, config.width, config.height)
  gradient.addColorStop(0, colors[0])
  gradient.addColorStop(.55, colors[1])
  gradient.addColorStop(1, colors[2])
  paint.fillStyle = gradient
  paint.fillRect(0, 0, config.width, config.height)

  paint.globalCompositeOperation = 'lighter'
  const orbs = [
    [420 + Math.sin(t * .29) * 130, 270 + Math.cos(t * .23) * 90, 700, `rgba(255,111,97,${.12 + pulse * .025})`],
    [1500 + Math.cos(t * .25) * 110, 760 + Math.sin(t * .31) * 80, 760, 'rgba(103,217,209,.14)'],
    [1180 + Math.sin(t * .18) * 120, 90, 520, 'rgba(255,209,102,.07)'],
  ]
  for (const [x, y, radius, color] of orbs) {
    const glow = paint.createRadialGradient(x, y, 0, x, y, radius)
    glow.addColorStop(0, color)
    glow.addColorStop(1, 'rgba(0,0,0,0)')
    paint.fillStyle = glow
    paint.fillRect(0, 0, config.width, config.height)
  }

  for (const particle of particles) {
    const travel = (particle.phase + t * particle.speed) % 1
    const y = config.height + 30 - travel * (config.height + 60)
    const x = particle.x + Math.sin(t + particle.phase * 7) * particle.sway
    const alpha = Math.sin(travel * Math.PI) * (.24 + .32 * Math.sin(t * 5 + particle.phase * 9) ** 2)
    paint.fillStyle = particle.warm ? `rgba(241,194,125,${alpha})` : `rgba(168,205,187,${alpha})`
    paint.beginPath()
    paint.arc(x, y, particle.size * (1 + pulse * .5), 0, Math.PI * 2)
    paint.fill()
  }

  paint.globalCompositeOperation = 'source-over'
  paint.strokeStyle = `rgba(248,246,239,${.035 + pulse * .02})`
  const horizon = 690
  for (let x = -10; x <= 10; x++) {
    paint.beginPath()
    paint.moveTo(config.width / 2 + x * 45, horizon)
    paint.lineTo(config.width / 2 + x * 260, config.height)
    paint.stroke()
  }
}

const built = scenes.map((scene) => {
  const root = document.createElement('section')
  root.className = `scene ${scene.type}`
  scenesRoot.append(root)
  const update = builders[scene.type](root, scene, { url: config.url })
  return { scene, root, update }
})

function render(t) {
  const time = clamp(t, 0, duration - 1e-6)
  const current = built.find(({ scene }) => time >= scene.start && time < scene.end) ?? built.at(-1)
  const local = time - current.scene.start
  const drums = current.scene.energy !== 'intro' && current.scene.energy !== 'break'
  const pulse = drums ? Math.exp(-(time % beat) * 9) : 0
  background(time, pulse, current.scene)

  for (const item of built) {
    const active = item === current
    item.root.classList.toggle('active', active)
    if (!active) continue
    item.update(local, { t: time, pulse, beat, bar })
    const incoming = 1 - clamp(local / .2)
    const outgoing = clamp((local - item.scene.duration + .18) / .18)
    const shift = incoming * 120 - outgoing * 120
    const blur = (incoming + outgoing) * 9
    item.root.style.transform = `translateX(${shift}px)`
    item.root.style.filter = blur > .05 ? `blur(${blur}px)` : ''
  }

  const impact = current.scene.energy === 'drop' || current.scene.energy === 'outro'
  flash.style.opacity = impact && current.scene.index > 0 ? String(.75 * Math.exp(-local * 8)) : '0'
  fade.style.opacity = String(Math.max(clamp(1 - time / .45), clamp((time - duration + .7) / .7)))
}

let stageScale = 1
function fit() {
  if (!preview) return
  stageScale = Math.min(innerWidth / config.width, (innerHeight - 70) / config.height)
  stage.style.transform = `scale(${stageScale})`
}

function previewControls() {
  const controls = document.getElementById('controls')
  const play = document.getElementById('play')
  const scrub = document.getElementById('scrub')
  const output = document.getElementById('time')
  const audio = document.getElementById('music')
  controls.hidden = false
  scrub.max = String(duration)
  audio.src = new URL('../build/music.wav', import.meta.url).href
  fit()
  addEventListener('resize', fit)
  let playing = false
  const show = (time) => {
    scrub.value = String(time)
    output.textContent = `${time.toFixed(2)}s`
    render(time)
  }
  const tick = () => {
    if (!playing) return
    if (audio.currentTime >= duration) {
      playing = false
      play.textContent = 'Play'
      show(duration)
      return
    }
    show(audio.currentTime)
    requestAnimationFrame(tick)
  }
  play.addEventListener('click', () => {
    playing = !playing
    play.textContent = playing ? 'Pause' : 'Play'
    if (playing) {
      audio.currentTime = Number(scrub.value) >= duration ? 0 : Number(scrub.value)
      audio.play()
      requestAnimationFrame(tick)
    } else {
      audio.pause()
    }
  })
  scrub.addEventListener('input', () => {
    audio.currentTime = Number(scrub.value)
    show(audio.currentTime)
  })
  show(Number(params.get('t') ?? 0))
}

if (preview) previewControls()
else render(0)

window.__video = {
  ready: Promise.resolve(),
  seek(time) {
    render(time)
  },
}
