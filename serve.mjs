import http from 'node:http';
import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';

// No dependencies or build step. Serve the complete site on this computer only.
const root = path.resolve(fileURLToPath(new URL('./dist/', import.meta.url)));
const port = Number(process.argv.find(arg => /^\d+$/.test(arg)) || process.env.PORT || 8080);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Invalid port. Example: node serve.mjs 8081');
  process.exit(1);
}
const mime = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.mjs':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml',
  '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp',
  '.gif':'image/gif', '.ico':'image/x-icon', '.mp4':'video/mp4', '.webm':'video/webm',
  '.pdf':'application/pdf', '.ttf':'font/ttf', '.woff':'font/woff', '.woff2':'font/woff2',
  '.txt':'text/plain; charset=utf-8'
};
const server = http.createServer(async (req, res) => {
  if (!['GET','HEAD'].includes(req.method)) {
    res.writeHead(405, {'Allow':'GET, HEAD'}).end(); return;
  }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403).end('Forbidden'); return;
    }
    let info = await stat(file);
    if (info.isDirectory()) { file = path.join(file, 'index.html'); info = await stat(file); }
    if (!info.isFile()) { res.writeHead(404).end('Not found'); return; }
    const headers = {
      'Content-Type':mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Accept-Ranges':'bytes', 'Cache-Control':'no-cache'
    };
    let start = 0, end = info.size - 1, status = 200;
    if (req.headers.range) {
      const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (!range || (!range[1] && !range[2])) {
        res.writeHead(416, {'Content-Range':`bytes */${info.size}`}).end(); return;
      }
      if (!range[1]) start = Math.max(0, info.size - Number(range[2]));
      else { start = Number(range[1]); if (range[2]) end = Math.min(end, Number(range[2])); }
      if (start > end || start >= info.size) {
        res.writeHead(416, {'Content-Range':`bytes */${info.size}`}).end(); return;
      }
      status = 206; headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
    }
    headers['Content-Length'] = Math.max(0, end - start + 1);
    res.writeHead(status, headers);
    if (req.method === 'HEAD' || info.size === 0) { res.end(); return; }
    const stream = createReadStream(file, {start, end});
    stream.on('error', () => res.destroy());
    res.on('close', () => stream.destroy());
    stream.pipe(res);
  } catch (error) {
    const status = error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : 400;
    res.writeHead(status).end(status === 404 ? 'Not found' : 'Bad request');
  }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? `Port ${port} is in use. Run: node serve.mjs ${port + 1} --open`
    : error.message);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  const url = `http://127.0.0.1:${port}/`;
  console.log(`Portfolio: ${url}\nKeep this terminal open. Press Ctrl+C to stop.`);
  if (process.argv.includes('--open')) {
    const command = process.platform === 'win32'
      ? ['cmd.exe', ['/c','start','',url]]
      : process.platform === 'darwin' ? ['open',[url]] : ['xdg-open',[url]];
    const child = spawn(command[0], command[1], {stdio:'ignore', detached:true});
    child.on('error', () => console.log(`Open this URL in your browser: ${url}`));
    child.unref();
  }
});
