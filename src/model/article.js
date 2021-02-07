const mongoose = require("mongoose")
const slugify = require("slugify")
const createDomPurify = require("dompurify")
const marked = require("marked")
const {JSDOM} = require("jsdom")
const dompurify = createDomPurify(new JSDOM().window)
const {Schema} = mongoose

const articleSchema = Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    markdown:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    sanitizeHtml:{
        type:String,
        required:true
    }
})

articleSchema.pre("validate",function(next){
    if(this.title){
        this.slug= slugify(this.title, {lower:true, strict:true})
    }
    if(this.markdown){
        this.sanitizeHtml = dompurify.sanitize(marked(this.markdown))
    }
    next()
} )

module.exports = mongoose.model("Article", articleSchema)