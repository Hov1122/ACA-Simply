const express = require('express');
const prisma = require('./services/Prisma')
const Joi = require('joi')

const app = express();
app.use(express.json());

app.post('/company', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(60)
            .required(),

        address: Joi.string()
            .alphanum()
            .min(3)
            .max(60)
            .required(),

        type: Joi.string()
            .alphanum()
            .min(3)
            .max(60)
            .required(),

    })

    try {
        const check = schema.validate(req.body);
        if (!check.error) {
            const data = await prisma.company.create({
                data: req.body
            })
        }
        else {
            console.log('asd')
        }
    }
    catch (err) {
        console.log(err)
        res.send('hajox')
    }

    res.status(200).send("barev");
})

app.listen(5000);