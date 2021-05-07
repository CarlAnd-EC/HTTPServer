# Basic HTTP Server
## Author: Carlos Andrés Escalona Contreras
### Proposed by: Javier Solis
### Main file: HTTPServer.js
### Created: 20/04/2021       Updated: 20/04/2021
### Description:
* Basic web server using http server using following Structure
* When a route does not exist, return proper HTTP error message and HTTP status code.

### Available Routes and HTTP methods:

|Endpoint       |Method    |Description                                          |
|---------------|----------|-----------------------------------------------------|
|/              |GET       |Display a Welcome Message                            |
|---------------|----------|-----------------------------------------------------|
|/books         |GET       |Return a list from a .txt file                       |
|/books         |POST      |Append a new element to the .txt file
Json Example: 
```json
{
  “title”: “Welcome to my blog”,
  “description”: “This is my personal Web Page”}
```|
|               |----------|-----------------------------------------------------|
|               |DELETE    |To clear the content of .txt file                    |
|---------------|----------|-----------------------------------------------------|
|/file-viewer   |GET       |Displays a file content from an internal directory. Name of file should be passed via query parameter. |
|---------------|----------|-----------------------------------------------------|
|/server-status |GET       |Displays a JSON showing hostname, cpus available, architecture, uptime, userinfo, memory available|