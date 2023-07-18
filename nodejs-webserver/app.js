const readline = require('readline')
const fs = require('fs');
const http = require('http');

const html = fs.readFileSync('./template/index.html', 'utf-8');

//Create server
const server = http.createServer((request, response) => {
    response.end(html);
    console.log('Request received');
    //console.log(response);
});

//Start server
server.listen(8000, '127.0.0.1', () => {
    console.log('Server has started')
});