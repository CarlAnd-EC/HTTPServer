/*
Name: inspectDir.js
Alias: Directory Inspector
Author: Carlos Andrés Escalona Contreras 
Created: 19/04/2021       Updated: 19/04/2021
Proposed by: Javier Solis
Description:
  1.- The list of elements in a directory specified by a path will be shown.
  2.- If the directory is not specified it will display the files in the current directory.
  3.- If the directory does not exist, an error message is shown.
  4.- If an element is a directory, show " directoryName/", otherwise "file: filename".
*/

'use strict';

const fs = require('fs');

function inspectDir(path){
console.time('Inspection Time');
try {
  switch (process.argv.length) {
    case 2:
      return inspect(process.cwd());
    case 3:
      switch (process.argv[2]) {
        case '-h':
        case '--help':
          printHelp();
          break;
        default:
          let path = process.argv[2];
          if(path[0]==='.'){
            if (process.platform === "win32") {
              path = `${process.cwd()}${process.argv[2].slice(1).replace(/\//g,'\\')}`;
            }
            else{
              path = `${process.cwd()}${process.argv[2].slice(1)}`;
            }  
          }
          if (fs.existsSync(path)) {
            return inspect(path);
          }
          else throw new Error(`Directory path could not be found.`);
          break;
      }
      break;
    default:
      throw new SyntaxError('More than 1 argument was received.');
  }
} 
catch (error) {
  console.error(error);
}
console.timeEnd('Inspection Time');
}
function inspect(path){
  var files = fs.readdirSync(path);
  if(files.length>0){
    let result = files.map((file) => {
      if(file.lastIndexOf('.')<0) file+='/';
      return file;
    });
    return result.toString().replace(/\,/g,'\  ');
  }
  else {
    console.log("Directory is empty.");
    return "Directory is empty.";
  }
}

function printHelp() {
  console.log("Usage:");
  console.log("node inspectDir.js <path>");
}

exports.inspectDir = inspectDir;