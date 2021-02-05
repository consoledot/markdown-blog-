const mongoose = require("mongoose")

module.exports ={
    connect:uri=>{
        mongoose.set("useNewUrlParser",true)
        mongoose.set("useUnifiedTopology",true)
        mongoose.set("useCreateIndex",true)
        mongoose.set("useFindAndModify",true)
        mongoose.connect(uri)
        mongoose.connection.on("error",()=>{
            console.log("Conection error. Please make sure mongodb is running")
            process.exit()
        })
        mongoose.connection.on("open",()=>{
            console.log("Database Connected")
        })
    },
    close:()=>{
        mongoose.connection.close()
    }

}