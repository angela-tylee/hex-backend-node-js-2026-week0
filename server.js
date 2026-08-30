const http = require('http');
const { v4: uuidv4 } = require('uuid');
const errorHandle = require('./errorHandle');

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
          errorHandle(res);
        }
      } catch (error) {
        // 處理異常行為： body 欄位格式錯誤
        errorHandle(res);
      }

    })
  } else if (req.url == '/todos' && req.method == 'DELETE') {
    // 刪除所有待辦
    todos.length = 0;
    res.writeHead(200, header);
    res.write(JSON.stringify({
      "status": "success",
      "data": todos
    }))
    res.end();
  } else if (req.url.startsWith('/todos/') && req.method == 'DELETE') {
    // 刪除單筆待辦
    const id = req.url.split('/').pop();
    const index = todos.findIndex(element => element.id == id);
    console.log(id, index)
    if (index !== -1) {
      todos.splice(index, 1);
      res.writeHead(200, header);
      res.write(JSON.stringify({
        "status": "success",
        "data": todos
      }))
      res.end();
    } else {
      errorHandle(res);
    }
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