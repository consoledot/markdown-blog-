const Article = require("../model/article")
const middleware = {}

middleware.newArticle = async(req,res,next)=>{
    req.article = new Article()
    next()
}

middleware.editArticle = async(req,res,next)=>{
    req.article = await Article.findById(req.params.id)
    next()
}
module.exports = middleware