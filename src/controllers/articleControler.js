const articleSchema = require("../model/article")

const controller = {}

controller.getAllArticles = async ()=>{
    return await articleSchema.find().sort({createdAt: "desc"})
}

controller.newArticle = (req,res)=>{
    res.render("new", {article: new articleSchema()})
}

controller.saveArticle = async(req,res,next)=>{
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
    req.article = await articleSchema.findById(req.params.id)
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

// const saveArticleandRedirect = path=>{
//     return async (req,res)=>{
//         req.article.title= req.body.title
//         req.article.description = req.body.description
//         req.article.markdown = req.body.markdown
//         console.log("gag",req.article)
//         try {
//             req.article = await req.article.save()
//             res.redirect(`/articles/${req.article.slug}`)
//         } catch (error) {
//             res.render(`${path}`,{article:req.article})
//         }
//     }
// }


module.exports = controller