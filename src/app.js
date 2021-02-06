const express = require("express")
const db = require("./db")
const articleControler = require("./controllers/articleControler")
const articleRoutes = require("./routes/article")
const methodOverride = require("method-override")

const app = express()
db.connect(process.env.MONGO_URI)

// middleswares 
app.set("view engine","ejs")
app.set('views', `${__dirname}/views`);
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use("/articles", articleRoutes)


app.get("/", async(req,res)=>{
    try {
        const articles = await articleControler.getAllArticles()
         res.render("index", {articles: articles})
    } catch (error) {
        res.json({message:error.message})
    }
    
})

module.exports = app
 