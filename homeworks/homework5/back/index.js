const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const {getData, addData} = require('./controllers/toDoController.js')

const todoRouter = require('./routes/todoRouter.js');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use('/todo', todoRouter);

httpServer.listen(5000, function() {
    console.log(this.address().port)
})


io.on('connection', (socket) => {
    setInterval( async () => {
        const data = await getData();
        data.forEach(todo => {
            if (!todo.isReminded && new Date(todo.reminder) - new Date() < 120000) {
                todo.isReminded = 'true';
                console.log(todo.title);
                socket.emit('reminder', todo.title); //message sent from server to client
                addData(data);
            }
        })
    }, 5000)
});