const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

// optional HTML transform hook
function transformHtml(html, filePath, req) {
  // safe place for injections, replacements, feature flags, etc.
  // example:
  // if (filePath.endsWith("index.html")) html = html.replace("{{title}}", "DataPulse");
  return html;
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml"
  };
  return map[ext] || "application/octet-stream";
}

function serveFile(req, res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Not Found");
    }

    let content = data;

    if (filePath.endsWith(".html")) {
      content = Buffer.from(transformHtml(data.toString(), filePath, req));
    }

    res.writeHead(200, { "Content-Type": getContentType(filePath) });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  const urlPath = req.url.split("?")[0];

  // routes
  if (urlPath === "/") {
    return serveFile(req, res, path.join(PUBLIC_DIR, "index.html"));
  }

  if (urlPath === "/embed/googleanalytics.js") {
    return serveFile(req, res, path.join(PUBLIC_DIR, "embed", "googleanalytics.js"));
  }

  // static fallback
  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);

  return serveFile(req, res, filePath);
});

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});