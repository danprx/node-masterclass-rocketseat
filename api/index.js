const http = require("http");
const data = require("./urls.json");
const URL = require("url");
const fs = require("fs");
const path = require("path");

function writeFile(callback) {
  fs.writeFile(
    path.join(__dirname, "urls.json"),
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) throw err;
      callback(JSON.stringify({ message: "ok" }));
      console.log(" - The file has been succesfully updated!");
    }
  );
}

const server = http.createServer((req, res) => {
  const { name, url, del } = URL.parse(req.url, true).query;

  res.writeHead(200, {
    "Access-Control-Allow-Origin": "http://localhost:5000",
  });

  if (!name || !url) return res.end(JSON.stringify(data));

  if (del) {
    data.urls = data.urls.filter((item) => String(item.url) !== String(url));
    return writeFile((message) => res.end(message));
  }

  data.urls.push({ name, url });
  return writeFile((message) => res.end(message));
});

server.listen(3000, () => {
  console.log("======= API is running! ======= \n");
});
