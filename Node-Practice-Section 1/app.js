const http = require('http');
const route = require('./routes')

const server = http.createServer(route.requestHandler);

server.listen(3000);
