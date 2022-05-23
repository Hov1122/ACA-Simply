import http from "http";
import fs from 'fs/promises'
import {API_URL} from "./constants.js";

const server = http.createServer((req, res) => {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        "Content-Type": "application/json"
    }

    //

    if (req.url.startsWith(`${API_URL}posts`)) {
        if (req.method === 'GET') {
            fs.readFile("./db/posts.json", "utf-8").then((postsData) => {
                res.writeHead(200, headers);
                if (req.url === `${API_URL}posts` || req.url === `${API_URL}posts/`) {
                    res.end(postsData);
                    return;
                }
                const tmp = req.url.split('/');
                const postId = Number(tmp[tmp.length - 2]);
                if (Number.isInteger(postId) && tmp[tmp.length - 1] === 'comments') {
                    fs.readFile("./db/comments.json", "utf-8").then((commentsData) => {
                        commentsData = JSON.parse(commentsData);
                        const comments = commentsData.filter((comment) => comment.postId == postId);
                        res.end(JSON.stringify(comments) || 'no data found');
                        return;
                    })
                } else {
                    res.writeHead(404, headers);
                    res.end('wrong url');
                }
            })
        }
            if (req.method === 'POST') {
                req.on('data', chunk => {
                    res.writeHead(201, headers);
                    fs.readFile('./db/posts.json', 'utf-8')
                        .then(data => {
                            console.log(data)
                            data = JSON.parse(data);
                            chunk = JSON.parse(chunk)
                            chunk.id = data.length + 1;
                            chunk.userId = 1000;
                            data.push(chunk)
                            console.log(data)

                            fs.writeFile('./db/posts.json', JSON.stringify(data, null, 2), 'utf-8');
                            res.end();
                        })
                    res.end("success")
                });
            //

        }
    }
    else if(req.url.startsWith(`${API_URL}users`))  {
        res.writeHead(200, headers);
        fs.readFile("./db/users.json", "utf-8").then((usersData) => {
            if (req.url === `${API_URL}users` || req.url === `${API_URL}users/`) {
                res.end(usersData);
                return;
            }

            const obj = JSON.parse(usersData);
            const tmp = Number(req.url.substring(req.url.lastIndexOf('/') + 1));

            if (Number.isInteger(tmp)) {
                const user = obj.find((user) => user.id == tmp)
                res.end(JSON.stringify(user) || "No data found");
                return;
            }

            res.writeHead(404, headers);
            res.end('url doesnt exist');

        })
    }
    // }

});

server.listen(8000, () => {
    console.log("Server started...");
})
