# iPhone launch video

The launch package contains two 30-second, music-only videos using repository artwork, original synthesized background music, animated device captures, spinning wheels, and beat-synchronized motion:

- `wheel-of-wisdom-iphone-launch-1080p.mp4` — 1920 × 1080 landscape video for social and launch promotion.
- `wheel-of-wisdom-iphone-app-preview-1920x886.mp4` — 1920 × 886 landscape App Store preview.
- `wheel-of-wisdom-launch-1600x1200.mp4` — 1600 × 1200 presentation export with the complete widescreen composition over a color-matched backdrop.

Regenerate it from the repository root:

```sh
cd tools/hype-video
npm install
npm run setup
npm run build
```

The frame-accurate HTML/CSS composition, storyboard, renderer, and procedural soundtrack live in `tools/hype-video/`.

Requirements: Node.js 20+, FFmpeg, and Playwright Chromium.
