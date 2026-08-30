const http = require('http');

const requestListener = (req, res) => {
  console.log(req.method, req.url);
  const header = {
    "Content-Type": "text/plain"
  };
  if (req.url == '/') {
    res.writeHead(200, header);
    res.write("index");
    res.end();
  } else {
    res.writeHead(404, header);
    res.write("此頁面不存在");
    res.end();
  }
}

const server = http.createServer(requestListener);
server.listen(3005, () => {
  console.log('Server running at http://localhost:3005');
});