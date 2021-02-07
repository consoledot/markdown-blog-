const Article = require("../model/article")

const controller = {}

controller.getAllArticles = async ()=>{
    return await Article.find().sort({createdAt: "desc"})
}

controller.newArticle = (req,res)=>{
    res.render("new", {article: new Article()})
}

controller.getArticle = async(req,res)=>{
    try {
        const article = await Article.findOne({slug:req.params.slug})
        res.render("show",{article:article})
    } catch (error) {
        res.redirect("/")
    }
}

controller.editArticle = async(req,res)=>{
    try {
        const article = await Article.findOne({slug:req.params.slug})
        res.render("edit",{article:article})
    } catch (error) {
        res.redirect("/")
    }
}

controller.deleteArticle = async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect("/")
}

controller.saveArticleandRedirect = path=>{
    return async (req,res)=>{
        let article = req.article
        article.title= req.body.title.trim()
        article.description = req.body.description.trim()
        article.markdown = req.body.markdown.trim()
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (error) {
            res.render(`${path}`,{article:article})
        }
    }
}
module.exports = controller