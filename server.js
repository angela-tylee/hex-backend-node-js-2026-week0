const http = require('http');

const requestListener = (req, res) => {
  res.writeHead(200,{"Content-Type":"text/plain"});
  res.write("hello");
  res.end();
}

const server = http.createServer(requestListener);
server.listen(3005, () => {
  console.log('Server running at http://localhost:3005');
});