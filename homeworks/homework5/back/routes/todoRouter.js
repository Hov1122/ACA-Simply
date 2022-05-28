const express = require('express');
const todoRouter = express.Router();

const {getData, addData, showToDos, addToDo, deleteToDo, updateData} = require('../controllers/toDoController.js')

// setInterval( async () => {
//     const data = await getData();
//     data.forEach(todo => {
//         if (!todo.isReminded && new Date(todo.reminder) - new Date() < 120000) {
//             todo.isReminded = 'true';
//             console.log('saljdkkkkkkkkkkkkkk')
//             console.log(todo.title);
//             addData(data);
//         }
//     })
// }, 5000)

todoRouter
    .get('/', showToDos)
    .post('/', addToDo)
    .delete('/:id', deleteToDo)
    .patch('/updateData/:id', updateData)

module.exports = todoRouter;