import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { config, timeline, totalSeconds } from '../storyboard.mjs'
import { toolDir } from './static-server.mjs'

const sampleRate = 44100
const duration = totalSeconds()
const length = Math.ceil(duration * sampleRate)
const left = new Float32Array(length)
const right = new Float32Array(length)
const beat = 60 / config.bpm
const bar = beat * config.beatsPerBar

let seed = config.music.seed
const random = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0
  return seed / 4294967296
}
const midi = (note) => 440 * 2 ** ((note - 69) / 12)
const add = (index, value, pan = 0) => {
  if (index < 0 || index >= length) return
  left[index] += value * (1 - pan)
  right[index] += value * (1 + pan)
}

function kick(time, gain = 1) {
  const start = Math.round(time * sampleRate)
  for (let i = 0; i < sampleRate * .42; i++) {
    const t = i / sampleRate
    const frequency = 48 + 115 * Math.exp(-t * 30)
    add(start + i, Math.sin(Math.PI * 2 * frequency * t) * Math.exp(-t * 8) * .65 * gain)
  }
}

function clap(time, gain = 1) {
  const start = Math.round(time * sampleRate)
  for (let i = 0; i < sampleRate * .22; i++) {
    const t = i / sampleRate
    const noise = random() * 2 - 1
    add(start + i, noise * Math.exp(-t * 18) * .16 * gain, (random() - .5) * .3)
  }
}

function hat(time, gain = 1) {
  const start = Math.round(time * sampleRate)
  for (let i = 0; i < sampleRate * .07; i++) {
    const t = i / sampleRate
    const noise = random() * 2 - 1
    add(start + i, noise * Math.exp(-t * 54) * .055 * gain, (random() - .5) * .45)
  }
}

function bass(time, frequency, seconds, gain = 1) {
  const start = Math.round(time * sampleRate)
  for (let i = 0; i < sampleRate * seconds; i++) {
    const t = i / sampleRate
    const env = Math.min(1, t * 30) * Math.exp(-t * 2.8)
    const value = (Math.sin(Math.PI * 2 * frequency * t) + .22 * Math.sin(Math.PI * 4 * frequency * t)) * env * .13 * gain
    add(start + i, value)
  }
}

function pad(time, notes, seconds, gain = 1) {
  const start = Math.round(time * sampleRate)
  for (let i = 0; i < sampleRate * seconds; i++) {
    const t = i / sampleRate
    const release = Math.min(1, (seconds - t) * 1.8)
    const attack = Math.min(1, t * 1.5)
    let value = 0
    notes.forEach((note, index) => {
      const frequency = midi(note)
      value += Math.sin(Math.PI * 2 * frequency * t + index * .65)
      value += .18 * Math.sin(Math.PI * 2 * frequency * 2 * t + index)
    })
    add(start + i, value / notes.length * attack * release * .075 * gain, -.12)
  }
}

function arp(time, note, gain = 1) {
  const start = Math.round(time * sampleRate)
  const frequency = midi(note)
  for (let i = 0; i < sampleRate * .38; i++) {
    const t = i / sampleRate
    const value = Math.sin(Math.PI * 2 * frequency * t) * Math.exp(-t * 8.5) * .075 * gain
    add(start + i, value, (random() - .5) * .5)
  }
}

let barIndex = 0
for (const scene of timeline()) {
  for (let sceneBar = 0; sceneBar < scene.bars; sceneBar++, barIndex++) {
    const start = barIndex * bar
    const chord = config.music.progression[barIndex % config.music.progression.length].map((offset) => config.music.root + offset)
    const intensity = scene.energy === 'intro' ? .55 : scene.energy === 'break' ? .62 : scene.energy === 'drop' ? 1 : .84
    pad(start, chord, bar + .25, intensity)
    for (let step = 0; step < 8; step++) {
      const time = start + step * beat / 2
      if (scene.energy !== 'intro' && scene.energy !== 'break') hat(time, intensity)
      if (step % 2 === 0) arp(time, chord[(step / 2) % chord.length] + 12, intensity)
    }
    if (scene.energy !== 'intro') {
      kick(start, intensity)
      kick(start + beat * 2, intensity)
      clap(start + beat, intensity)
      clap(start + beat * 3, intensity)
      bass(start, midi(chord[0] - 12), beat * 1.7, intensity)
      bass(start + beat * 2, midi(chord[0] - 12), beat * 1.7, intensity)
    }
  }
}

const pcm = Buffer.alloc(length * 4)
let peak = 0
for (let i = 0; i < length; i++) peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]))
const gain = .88 / Math.max(peak, .001)
for (let i = 0; i < length; i++) {
  const fade = Math.min(1, i / (sampleRate * 1.2), (length - i) / (sampleRate * 1.8))
  pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, left[i] * gain * fade)) * 32767), i * 4)
  pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, right[i] * gain * fade)) * 32767), i * 4 + 2)
}

const header = Buffer.alloc(44)
header.write('RIFF', 0)
header.writeUInt32LE(36 + pcm.length, 4)
header.write('WAVEfmt ', 8)
header.writeUInt32LE(16, 16)
header.writeUInt16LE(1, 20)
header.writeUInt16LE(2, 22)
header.writeUInt32LE(sampleRate, 24)
header.writeUInt32LE(sampleRate * 4, 28)
header.writeUInt16LE(4, 32)
header.writeUInt16LE(16, 34)
header.write('data', 36)
header.writeUInt32LE(pcm.length, 40)

const output = join(toolDir, 'build', 'music.wav')
await mkdir(join(toolDir, 'build'), { recursive: true })
await writeFile(output, Buffer.concat([header, pcm]))
console.log(`generated ${duration}s soundtrack -> ${output}`)
