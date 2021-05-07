/*
Name: HTTPServer.js
Alias: Basic HTTP Server
Author: Carlos Andrés Escalona Contreras 
Created: 20/04/2021       Updated: 20/04/2021
Proposed by: Javier Solis
Description:
Create a basic web server using http server using following Structure
Requirements:
When a route does not exist, return proper HTTP error message and HTTP status code.

Use the proper HTTP methods:

Endpoint         Method     Description
/                GET        Display a Welcome Message
/books           GET        Return a list from a .txt file
/books           POST       Append a new element to the .txt file
                            Json Example: {“title”: “Welcome to my blog”, “description”: “This is my personal Web Page”}
/books           DELETE     To clear the content of .txt file
/file-viewer     GET        Displays a file content from an internal directory. 
                            Name of file should be passed via query parameter
/server-status   GET        Displays a JSON showing hostname, cpus available, architecture, uptime, userinfo, memory available

*/
const http = require('http');
var path = require('path');
const fs = require('fs');
const os = require('os');
const inspector = require('./inspectDir');

const PORT = 8080;
const publicDir = path.join(__dirname.replace('src',''),'public');
const FAVICON = path.join(publicDir, '/images/favicon.ico');

const serverRoutes = {
  '/':{
    method:{GET: ()=> "./views/myWebPage.html"}
  },
  '/books':{
    method:{
      GET: getLibrary,
      POST: ()=> "books-POST",
      DELETE: ()=> "books-DELETE"
    }
  },
  '/file-viewer':{method:{GET: explore}},
  '/server-status':{method:{GET: ()=> "server status-GET"}}
}; 

const mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
};

const statusCodes= {
  informational: {}, //(100–199)
  successful: {},   //(200–299)
  redirects: {},    //(300–399)
  clientError: {},  //(400–499)
  serverError: {},  //(500–599)
}
const server = http.createServer(
  (request,response)=>{
    console.log(request);
    const {url,method} = request;

    if(url.match("/NewFavicon") ){
      console.log('Request for favicon.ico');
      const img = fs.readFileSync(FAVICON);
      response.writeHead(200, {'Content-Type': 'image/x-icon' });
      response.end(img, 'binary');
    }
    // Serve html, js, css and img
    if ( serverRoutes.hasOwnProperty(url) ){
      const res = evaluateRequest(url,method);
      const type = mime[path.extname(res.view).slice(1)] || 'text/plain';
      console.log(`${res.view} ${res.statusCode} ${method} ${type}`);
      fs.readFile(res.view, "UTF-8", function(err, html){
        response.writeHead(res.statusCode, {"Content-Type": type});
        response.end(html);
      });
    }
    else{
      // 404 Not Found
      response.writeHead(404, {"Content-Type": 'text/html'});
      response.end(fs.readFileSync(path.join(publicDir, "./views/404.html")));
    }
    
    // const readStream = fs.createReadStream(res.view,{encoding: 'utf-8'});
    // readStream.on('open', function () {
    //   response.writeHead(res.statusCode,{'Content-type':type});
    //   readStream.pipe(response);
    // });
    // readStream.on('error', function () {
    //     console.log("Read Stream: Error 404");
    //     response.writeHead(404,{'Content-type':'text/plain'});
    //     response.end('Not found');
    // });
  }).listen(PORT, ()=>console.log(`Server running at port: ${PORT}`));
function evaluateRequest(route,method){
  let response = {};
  if(serverRoutes.hasOwnProperty(route)){
    if(serverRoutes[`${route}`].method.hasOwnProperty(method)){
      response.statusCode = 200;
      response.view = path.join(publicDir, serverRoutes[`${route}`].method[`${method}`]());
    }
    else{
      // 405 Method Not Allowed
      response.statusCode = 405;
      response.view = path.join(publicDir, "./views/405.html");
    }
  }
  // else if(mime.hasOwnProperty(path.extname(route))){
  //   response.view = path.join(dir, route);
  // }
  return response;
}

function explore(file){
  let html = fs.readFileSync(path.join(publicDir,"./views/fileViewer.html"),{encoding:'utf-8'});
  splittedHTML = html.split('Result');
  // console.log(splittedHTML);
  html = `${splittedHTML[0]}Result: ${inspector.inspectDir(file)} ${splittedHTML[1]}`; 
  // const content = `Result: ${inspector.inspectDir(path)}`;
  fs.writeFileSync(path.join(publicDir,"./views/fileViewer.html"), html, { encoding: 'utf-8'});
  return "./views/fileViewer.html";
}

function getLibrary(){
  let library = fs.readFileSync(path.join(publicDir,"./docs/library.txt"),{encoding:'utf-8'});
}