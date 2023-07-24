const readline = require('readline');
const fs = require('fs');
const http = require('http');
const url = require('url');

const html = fs.readFileSync('./template/index.html', 'utf-8');
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'));
let productListHtml = fs.readFileSync('./template/product-list.html', 'utf-8');
let productDetailHtml = fs.readFileSync('./template/product-details.html', 'utf-8');

/* let productHtmlArray = products.map((prod) => {
    let output = productListHtml.replace(`{{%IMAGE%}}`, prod.productImage);
    output = output.replace('{{%NAME%}}', prod.name);
    output = output.replace('{{%MODELNAME%}}', prod.modelName);
    output = output.replace('{{%MODELNO%}}', prod.modelNumber);
    output = output.replace('{{%SIZE%}}', prod.size);
    output = output.replace('{{%CAMERA%}}', prod.camera);
    output = output.replace('{{%PRICE%}}', prod.price);
    output = output.replace('{{%COLOR%}}', prod.color);
    output = output.replace('{{%ID%}}', prod.id);

    return output;
}) */

function replaceHtml(template, product){
    let output = template.replace('{{%IMAGE%}}', product.productImage);
    output = output.replace('{{%NAME%}}', product.name);
    output = output.replace('{{%MODELNAME%}}', product.modelName);
    output = output.replace('{{%MODELNO%}}', product.modelNumber);
    output = output.replace('{{%SIZE%}}', product.size);
    output = output.replace('{{%CAMERA%}}', product.camera);
    output = output.replace('{{%PRICE%}}', product.price);
    output = output.replace('{{%COLOR%}}', product.color);
    output = output.replace('{{%ID%}}', product.id);
    output = output.replace('{{%ROM%}}', product.ROM);
    output = output.replace('{{%DESC%}}', product.Description);

    return output;
}

//Create server
const server = http.createServer((request, response) => {
    let {query, pathname: path} = url.parse(request.url, true);
    //console.log(x);
    //let path = request.url;

    if(path === '/' || path.toLocaleLowerCase() === '/home'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header' : 'Hello world!'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in the home page'));
    }
    else if(path.toLocaleLowerCase() === '/about'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header' : 'Hello world!'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in the about page'));
    }
    else if(path.toLocaleLowerCase() === '/contact'){
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header' : 'Hello world!'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in the contact page'));
    }
    else if(path.toLocaleLowerCase() === '/products'){
        if(!query.id){
            let productHtmlArray = products.map((prod) => {
                return replaceHtml(productListHtml, prod);
            })
            let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','));
            response.writeHead(200, {'Content-Type': 'text/html' });
            response.end(productResponseHtml);
        }
        else{
            let prod = products[query.id];
            let productDetailResponseHtml = replaceHtml(productDetailHtml, prod);
            response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml));
        }
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