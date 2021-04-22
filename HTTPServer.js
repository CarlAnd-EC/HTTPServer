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
const fs = require('fs');
const os = require('os');
const inspector = require('./inspectDir');

const PORT = 8080;

const serverRoutes = {
  home:{
    method:{GET: welcome}
  },
  books:{
    method:{
      GET: ()=> "books-GET",
      POST: ()=> "books-POST",
      DELETE: ()=> "books-DELETE"
    }
  },
  file_viewer:{method:{GET: explore}},
  server_status:{method:{GET: ()=> "server status-GET"}}
}; 

const server = http.createServer(
  (request,response)=>{
    const {url,method} = request;
    // const route = myRouter(request.url);
    const res = evaluateRequest(url,method);
    response.writeHead(res.statusCode,{'Content-type':'text/html'});
    const readSream = fs.createReadStream(res.view,'utf8');
    readSream.pipe(response);
    // response.end(res.view);
    // return route(request,response)
  });

function welcome (){
  return "myWebPage.html";
}
function explore(path){
  let html = fs.readFileSync("./views/fileViewer.html",'utf-8');
  splittedHTML = html.split('split');
  // console.log(splittedHTML);
  html = `${splittedHTML[0]}Result: ${inspector.inspectDir(path)} ${splittedHTML[1]}`; 
  // const content = `Result: ${inspector.inspectDir(path)}`;
  fs.writeFileSync("./views/fileViewer.html", html, { encoding: 'utf-8'});
  return "./views/fileViewer.html";
}

function evaluateRequest(url,method){
  let route;
  let response = {};

  if(url==='/') route = "home";
  else if(url.includes('-')) route = url.slice(1).replace(/\-/g,'_');
  else route = url.slice(1);

  if(serverRoutes.hasOwnProperty(route)){
    if(serverRoutes[`${route}`].method.hasOwnProperty(method)){
      response.statusCode = 200;
      response.view = serverRoutes[`${route}`].method[`${method}`]();
    }
    else{
      // 405 Method Not Allowed
      response.statusCode = 405;
      response.view ="./views/405.html";
    }
  }
  else{
    // 404 Not Found
    response.statusCode = 404;
    response.view ="./views/404.html";
  }
  return response;
}
server.listen(PORT, ()=>console.log(`Server running at port: ${PORT}`));
