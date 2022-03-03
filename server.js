const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const file = req.url === "/" ? "index.html" : req.url;
  const filePath = path.join(__dirname, "public", file);
  const extname = path.extname(file);

  const allowedFileExt = [".html", ".js", ".css"];
  const allowed = allowedFileExt.find((item) => item === extname);
  if (!allowed) return;

  fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    res.end(data);
  });
});

server.listen(5000, () => {
  console.log("======= Server is running! ======= \n");
});
