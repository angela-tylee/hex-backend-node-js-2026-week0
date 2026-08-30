function errorHandle(res) {
    const header = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  };

  res.writeHead(400, header);
  res.write(JSON.stringify({
    "status": "false",
    "data": "欄位格式錯誤，或查無此 id"
  }))
  res.end();
}

module.exports = errorHandle;