// setTimeout(() => {
//     setTimeout(() => {
//         console.log(Promise.resolve(4));
//     })
//     setTimeout(() => console.log('tm'))
// })

// const fs = require('fs');
//
// const stream = fs.createReadStream(__dirname + '/asd.txt', 'utf-8');
//
// let fullData = '';
//
// stream.on('data', (chunk) => fullData += chunk)
//
// stream.on('end', () => console.log(fullData));


const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})