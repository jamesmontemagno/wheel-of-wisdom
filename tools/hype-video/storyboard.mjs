export const config = {
  title: 'Wheel of Wisdom iPhone launch',
  width: 1920,
  height: 1080,
  fps: 30,
  bpm: 120,
  beatsPerBar: 4,
  url: 'www.wheelofwisdom.app',
  output: 'assets/app-store/launch-video/wheel-of-wisdom-iphone-launch-1080p.mp4',
  previewOutput: 'assets/app-store/launch-video/wheel-of-wisdom-iphone-app-preview-1920x886.mp4',
  standardOutput: 'assets/app-store/launch-video/wheel-of-wisdom-launch-1600x1200.mp4',
  music: {
    seed: 42,
    root: 48,
    progression: [
      [0, 4, 7],
      [-3, 0, 4],
      [-5, 0, 3],
      [-1, 2, 7],
    ],
  },
}

export const scenes = [
  {
    type: 'intro',
    bars: 2,
    energy: 'intro',
    kicker: 'Pass & play',
    headline: 'Game night\n*in your pocket.*',
    tagline: 'Spin. Guess. Solve.',
    logo: 'public/pwa-512.png',
  },
  {
    type: 'spin',
    bars: 2,
    energy: 'drop',
    kicker: 'Round and round',
    headline: 'Spin it.\n*Win it.*',
    body: 'Cash wedges, mystery prizes, and the dreaded Bankrupt.',
    shot: 'assets/IMG_3610.png',
  },
  {
    type: 'pass',
    bars: 2,
    energy: 'groove',
    kicker: 'Your turn!',
    headline: 'Pass the phone.\n*Beat the clock.*',
    body: 'Two or three friends. One phone. Thirty seconds.',
    shots: ['assets/IMG_3611.png', 'assets/IMG_3609.png'],
  },
  {
    type: 'solve',
    bars: 3,
    energy: 'drop',
    kicker: 'Choose wisely',
    headline: 'Pick a letter.\n*Solve the board.*',
    category: 'Phrase',
    rows: ['GAME NIGHT', 'IN YOUR', 'POCKET'],
    picks: ['E', 'T', 'A', 'O', 'N'],
  },
  {
    type: 'puzzles',
    bars: 2,
    energy: 'build',
    kicker: 'Fresh boards all year',
    headline: 'A puzzle for\n*every game night.*',
    stats: [
      ['600', 'original puzzles'],
      ['100+', 'themed boards'],
      ['4 + 1', 'rounds plus a bonus'],
    ],
    shot: 'assets/IMG_3609.png',
  },
  {
    type: 'benefits',
    bars: 2,
    energy: 'break',
    kicker: 'Your game. Your device.',
    headline: 'Big fun.\n*No fuss.*',
    benefits: ['Plays offline', 'No accounts', 'No ads or tracking'],
    shots: ['assets/IMG_3610.png', 'assets/IMG_3611.png'],
  },
  {
    type: 'outro',
    bars: 2,
    energy: 'outro',
    headline: 'Now available on the\n*Apple App Store for iPhone*',
    tagline: 'Free to play · No in-app purchases',
    logo: 'public/pwa-512.png',
  },
]

export const secondsPerBar = () => (60 / config.bpm) * config.beatsPerBar

export function timeline() {
  const barSeconds = secondsPerBar()
  let start = 0
  return scenes.map((scene, index) => {
    const duration = scene.bars * barSeconds
    const entry = { ...scene, index, start, duration, end: start + duration }
    start += duration
    return entry
  })
}

export const totalSeconds = () => scenes.reduce((sum, scene) => sum + scene.bars, 0) * secondsPerBar()
