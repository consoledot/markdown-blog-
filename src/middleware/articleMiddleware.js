
const middleware = {}

middleware.saveArticleandRedirect = path=>{
    return async (req,res)=>{
        let article = req.article
        article.title= req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        console.log("gag",req.article)
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (error) {
            res.render(`${path}`,{article:article})
        }
    }
}

module.exports = middleware