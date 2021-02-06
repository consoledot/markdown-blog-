const express = require("express")
const routes = express.Router()
const articleController = require("../controllers/articleControler")
const articleMiddleware = require("../middleware/articleMiddleware")
 

routes.get("/new",  articleController.newArticle)

routes.post("/", articleController.saveArticle, articleMiddleware.saveArticleandRedirect("new"))

routes.put("/:id", articleController.getAndEditArticle, articleMiddleware.saveArticleandRedirect("edit"))

routes.get("/:slug", articleController.getArticle)

routes.get("/edit/:slug", articleController.editArticle)

routes.delete("/:id", articleController.deleteArticle)




module.exports = routes
