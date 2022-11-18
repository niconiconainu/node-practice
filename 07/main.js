"use strict";

const port = 3000;
const http = require("http");
const fs = require("fs");

function readFile(file, response) {
    fs.readFile(`./${file}`, (errors, data) => {
        if (errors) {
            console.log("Error reading the file...");
        }
        response.end(data);
    });
}

const app = http.createServer((request, response) => {
    if (request.url === "/" && request.method === "GET") {
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        readFile("view/index.html", response);
    } else if (request.url === "/public/image/nodejs.png" && request.method === "GET") {
        response.writeHead(200, {
            "Content-Type": "image/png"
        });
        readFile("public/image/nodejs.png", response);
    } else if (request.url === "/public/css/style.css" && request.method === "GET") {
        response.writeHead(200, {
            "Content-Type": "text/css"
        });
        readFile("public/css/style.css", response);
    } else {
        response.writeHead(404, {
            "Content-Type": "text/html"
        });
        response.end(`Not found : ${request.url}`);
        console.log();
    }
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);