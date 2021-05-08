# Basic HTTP Server
### Author: Carlos Andrés Escalona Contreras
#### Proposed by: Javier Solis
Main file: HTTPServer.js  
Created: 20/04/2021  
Updated: 20/04/2021

## Installation
### `git clone https://github.com/CarlosAEC-KS/HTTPServer`
## Testing
### `npm run test`
## Start
### `npm run start`

## Description
: Basic web server using http server using following structure:  
(**Note:** When a route does not exist, proper HTTP error message and HTTP status code are returned.)

### Available routes and HTTP methods:

| Endpoint | Method | Description |
|-|-|-|
| / | GET | Displays a welcome message. |
| /books | GET | Returns a list from a .txt file. |
| /books | POST | Appends a new element to the .txt file after receiving it in JSON format. |
| /books | DELETE | Clears the content of the .txt file. |
| /file-viewer | GET | Displays a file content from an internal directory. Name of file should be passed via query parameter. |
| /server-status | GET | Displays a JSON showing hostname, cpus available, architecture, uptime, userinfo, and memory available. |


Json Example:   
```json
{
  "title": "Welcome to my blog",
  "description": "This is my personal Web Page"
}
```