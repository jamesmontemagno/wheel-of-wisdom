import { chromium } from 'playwright'
import { startStaticServer } from './static-server.mjs'

const server = await startStaticServer()
const browser = await chromium.launch({ headless: false })
const page = await browser.newPage({ viewport: { width: 1280, height: 790 } })
await page.goto(`${server.url}/tools/hype-video/composition/index.html?preview=1`)

const close = async () => {
  await browser.close()
  await server.close()
}
process.on('SIGINT', close)
await new Promise((resolve) => browser.on('disconnected', resolve))
await server.close()
