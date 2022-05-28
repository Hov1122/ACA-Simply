const fs = require('fs/promises')
const uuid = require("uuid");

function getData() {
    return fs.readFile('./data.json', 'utf-8').then((res) => JSON.parse(res));
}

function addData(data) {
    return fs.writeFile('./data.json', JSON.stringify(data, null, 4))
}

async function updateData(req, res) {
    const {title, reminder} = req.body;
    const {id} = req.params;
    const data = await getData();
    const toUpdate = data.find(todo => todo.id === id);

    if (title) {
        toUpdate.title = title;
    }
    else if (reminder) {
        toUpdate.reminder = reminder;
        if (new Date(reminder) > new Date()) {
            toUpdate.isReminded = false;
        }
        else {
            toUpdate.isReminded = true;
        }
    }
    else {
        toUpdate.completed = !toUpdate.completed;
    }
    await addData(data);
    res.json(data);
}

async function showToDos (req, res) {
    const data = await getData();
    res.json(data)
}

async function addToDo (req, res) {
    const { body } = req;
    const data = await getData();
    body.id = uuid.v4();
    body.completed = false;
    body.isReminded = false;

    data.push(body);
    await addData(data);
    res.json(data);
}

async function deleteToDo (req, res) {
    const { id } = req.params;
    let data = await getData()
    data = data.filter(todo => todo.id !== id);
    await addData(data);
    res.json({ success: true, message: 'Deleted Successfully' })
}

module.exports = {
    getData,
    addData,
    showToDos,
    addToDo,
    deleteToDo,
    updateData
}