

const express = require("express")
const app = express()
port = 4000

app.get("/" , (req,res) => {

    res.send("hello Vedant")
})
app.listen(port, () => {

    console.log(`the server is ruuning on http://127.0.0.1:${port}`)
})

