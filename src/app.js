const express = require("express")
const db = require("./db")

const app = express()
db.connect(process.env.MONGO_URI)

app.get("/",(req,res)=>{
    res.send("gaga")
})
console.log(process.env.NAME)
module.exports = app
 