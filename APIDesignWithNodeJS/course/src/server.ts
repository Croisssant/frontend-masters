// const express = require("express");
import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user';


// import * as bcrypt from 'bcrypt'
// // let my_hash = bcrypt.hashSync("password", 5);
// async function genHash(word) {
//     return bcrypt.hash(word, 8)
// }
// console.log(genHash("password"))

const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    req.shhh_secret = "some secret";
    next()
})

app.get("/", (req, res) => {
    console.log("Hello from Express");
    res.status(200);
    res.json({message: "hello"});
})

app.use('/api', protect, router)
app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'Unauthorized' })
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'Invalid Input' })
    } else {
        res.status(500).json({ message: 'Problem with server' })
    }
})

console.log(process.env.JWT_SECRET);
// module.exports = app;
export default app