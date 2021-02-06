const articleSchema = require("../model/article")

const controller = {}

controller.getAllArticles = async (req,res)=>{
    return await articleSchema.find()
}

controller.newArticle = (req,res)=>{
    res.render("new", {article: new articleSchema()})
}

controller.saveArticle = (req,res, next)=>{
    req.article = new articleSchema()
    next()
}

controller.getArticle = async(req,res)=>{
    try {
        const article = await articleSchema.findOne({slug:req.params.slug})
        res.render("show",{article:article})
    } catch (error) {
        res.redirect("/")
    }
}

controller.getAndEditArticle = async(req,res,next)=>{
        const article = await articleSchema.findById(req.params.id)
        req.article = article
        next()
}

controller.editArticle = async(req,res)=>{
    try {
        const article = await articleSchema.findOne({slug:req.params.slug})
        res.render("edit",{article:article})
    } catch (error) {
        res.redirect("/")
    }
}

controller.deleteArticle = async(req,res)=>{
    await articleSchema.findByIdAndDelete(req.params.id)
    res.redirect("/")
}

module.exports = controller