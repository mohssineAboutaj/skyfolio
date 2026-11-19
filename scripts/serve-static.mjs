// Minimal static server for the generated site, used by the Playwright e2e
// tests. Mirrors Netlify: existing files are served as-is, directories serve
// their index.html, and anything else gets 404.html with a 404 status.
import fs from "node:fs"
import http from "node:http"
import path from "node:path"

const root = path.resolve(process.argv[2] ?? ".output/public")
const port = Number(process.env.PORT ?? 4173)

if (!fs.existsSync(path.join(root, "index.html"))) {
  console.error(`No generated site in ${root}. Run \`npm run generate\` first.`)
  process.exit(1)
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
}

function resolveFile(urlPath) {
  const target = path.join(root, decodeURIComponent(urlPath))
  if (!target.startsWith(root)) return null
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return target
  const index = path.join(target, "index.html")
  if (fs.existsSync(index)) return index
  return null
}

http
  .createServer((req, res) => {
    const urlPath = new URL(req.url ?? "/", "http://localhost").pathname
    const found = resolveFile(urlPath)
    const status = found ? 200 : 404
    const file = found ?? path.join(root, "404.html")
    const body = fs.readFileSync(file)
    const type = types[path.extname(file)] ?? "application/octet-stream"
    res.writeHead(status, { "content-type": type })
    res.end(body)
  })
  .listen(port, () => {
    console.log(`Serving ${root} on http://localhost:${port}`)
  })
