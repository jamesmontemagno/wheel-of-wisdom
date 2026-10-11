import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

export const toolDir = resolve(fileURLToPath(new URL('..', import.meta.url)))
export const repoRoot = resolve(toolDir, '../..')

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.wav': 'audio/wav',
}

export async function startStaticServer(root = repoRoot) {
  const server = createServer((request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1')
    const requested = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)
    const path = resolve(root, `.${requested}`)
    if (path !== root && !path.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end('Forbidden')
      return
    }
    if (!existsSync(path) || !statSync(path).isFile()) {
      response.writeHead(404).end('Not found')
      return
    }
    response.writeHead(200, { 'Content-Type': types[extname(path)] ?? 'application/octet-stream' })
    createReadStream(path).pipe(response)
  })
  await new Promise((resolvePromise) => server.listen(0, '127.0.0.1', resolvePromise))
  const address = server.address()
  return {
    url: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolvePromise) => server.close(resolvePromise)),
  }
}
