const readline = require('readline')
const fs = require('fs');
const http = require('http');

const html = fs.readFileSync('./template/index.html', 'utf-8');
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'));
let productListHtml = fs.readFileSync('./template/product-list.html', 'utf-8');

let productHtmlArray = products.map((prod) => {
    let output = productListHtml.replace(`{{%IMAGE%}}`, prod.productImage);
    output = output.replace('{{%NAME%}}', prod.name);
    output = output.replace('{{%MODELNAME%}}', prod.modelName);
    output = output.replace('{{%MODELNO%}}', prod.modelNumber);
    output = output.replace('{{%SIZE%}}', prod.size);
    output = output.replace('{{%CAMERA%}}', prod.camera);
    output = output.replace('{{%PRICE%}}', prod.price);
    output = output.replace('{{%COLOR%}}', prod.color);

    return output;
})

//Create server
const server = http.createServer((request, response) => {
    let path = request.url;

    if (path === '/' || path.toLocaleLowerCase() === '/home'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header' : 'Hello world!'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in the home page'));
    }
    else if (path.toLocaleLowerCase() === '/about'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header' : 'Hello world!'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in the about page'));
    }
    else if (path.toLocaleLowerCase() === '/contact'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header' : 'Hello world!'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in the contact page'));
    }
    else if (path.toLocaleLowerCase() === '/products'){
        let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','));
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end(productResponseHtml);
    }
    else {
        response.writeHead(404, {
            'Content-Type' : 'text/html',
            'my-header' : 'Hello world!'
        });
        response.end(html.replace('{{%CONTENT%}}', 'ERROR 404: Page not found.'));
    }
    
    // Test to see if fallthrough technique for switch statement is viable for routing. -IT WORKS-
/*     switch(path.toLocaleLowerCase()) {
	    case '/':
	    case '/home':
            response.end('You are in the home page.');
            break;
        case '/about':
            response.end('You are in the about page.');
            break;
        default:
            response.end('Error 404: Page not found.');
            break;
    }
 */
    /* response.end(html);
    console.log('Request received'); */
});

//Start server
server.listen(8000, '127.0.0.1', () => {
    console.log('Server has started')
});