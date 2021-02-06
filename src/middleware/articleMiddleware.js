const articleSchema = require("../model/article")
const middleware = {}

middleware.saveArticleandRedirect = path=>{
    return async (req,res)=>{
        console.log(req.body)

        console.log("gag",req.article)
        // let article = req.article
        req.article.title= req.body.title
        req.article.description = req.body.description
        req.article.markdown = req.body.markdown

        console.log("gag",req.article)
        try {
           
            let article = await req.article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (error) {
            res.render(`${path}`,{article:req.article})
        }
    }
}

module.exports = middleware