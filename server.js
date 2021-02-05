require("dotenv").config()

const port = process.env.PORT || 8080
const app = require("./src/app")

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})