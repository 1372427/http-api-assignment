const http = require('http');
const url = require('url');
const jsonHandler = require('./jsonResponses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    "/": htmlHandler.getIndex,
    "/success": jsonHandler.getSuccess,
    "/style.css": htmlHandler.getCSS,
    "/badRequest": jsonHandler.getBad,
    "/unauthorized": jsonHandler.getUnauth,
    "/forbidden": jsonHandler.getForbidden,
    "/internal": jsonHandler.getInternal,
    "/notImplemented": jsonHandler.getNotImplemented,
    notFound: jsonHandler.getNotFound,
    index: htmlHandler.getIndex
};

const onRequest = (request, response) => {
    const parsedURL = url.parse(request.url);
    const acceptedTypes = request.headers.accept.split(',');

    if(urlStruct[parsedURL.pathname]){
        urlStruct[parsedURL.pathname](request, response, acceptedTypes); 
    }else{
        urlStruct.notFound(request, response, acceptedTypes);
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
