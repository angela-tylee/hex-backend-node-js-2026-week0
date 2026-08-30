const http = require('http');

const requestListener = (req, res) => {
  console.log(req.method, req.url);
  const header = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  };
  if (req.url == '/') {
    res.writeHead(200, header);
    res.write(JSON.stringify({
      "status": "success",
      "data": [],
    }));
    res.end();
  } else {
    res.writeHead(404, header);
    res.write(JSON.stringify({
      "status": "false",
      "message": "無此網站路由",
    }));
    res.end();
  }
}

const server = http.createServer(requestListener);
server.listen(3005, () => {
  console.log('Server running at http://localhost:3005');
});