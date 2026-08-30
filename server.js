const http = require('http');
const { v4: uuidv4 } = require('uuid');

const todos = [];

const requestListener = (req, res) => {
  console.log(req.method, req.url);
  const header = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  };

  let body = "";
  req.on('data', chunk => {
    body += chunk;
  })

  if (req.url == '/todos' && req.method == 'GET') {
    res.writeHead(200, header);
    res.write(JSON.stringify({
      "status": "success",
      "data": todos,
    }));
    res.end();
  } else if (req.url == '/todos' && req.method == 'POST') {
    req.on('end', () => {
      console.log(body);
      try {
        const title = JSON.parse(body).title
        if (title !== undefined) {
          const todo = {
            "title": title,
            "id": uuidv4()
          }
          todos.push(todo);
          res.writeHead(200, header);
          res.write(JSON.stringify({
            "status": "success",
            "data": todos
          }))
          res.end();
        } else {
          // 處理異常行為：title 為空值
          res.writeHead(400, header);
          res.write(JSON.stringify({
            "status": "false",
            "data": "欄位格式錯誤"
          }))
          res.end();
        }
      } catch (error) {
        // 處理異常行為： body 欄位格式錯誤
        res.writeHead(400, header);
        res.write(JSON.stringify({
          "status": "false",
          "data": "欄位格式錯誤"
        }))
        res.end();
      }

    })
  } else if (req.method == "OPTIONS") {
    // 回應 CORS 預檢請求（Preflight）：瀏覽器在跨來源的非簡單請求前，會先以 OPTIONS 方法詢問
    res.writeHead(200, header);
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