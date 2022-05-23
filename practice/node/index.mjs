// import fs from 'fs/promises';
// import path from 'path';
//
// const current = path.resolve();
// console.log(path.resolve('./a.txt'));
// console.log(path.join(current, 'b.txt'));
//
// // fs.readFile('./a.txt', 'utf-8')
// //     .then((data) => console.log(data));
// //
// // fs.writeFile("b.txt", "asdasd");

import http from "http";

const server = http.createServer((req, res) => {
    console.log("test");

    if (req.url === '/') {
        res.writeHead(200, {"Content-Type": "text-plain"});
        res.end("Hello");
    } else if (req.url === '/users') {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify([{ name: "Monika" }]));
    }

});

server.listen(5000, () => {
    console.log("Server started...");

})
