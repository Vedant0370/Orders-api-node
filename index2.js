const express = require ('express')

const app = express()


app.get((req,res) =>{

    res.send('/', "hello")
})
app.listen(port,() =>{

    console.log("hello Again")
})

// ********************