const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

require('./db/conn')

const OrderModel = require('./models/Order')

// we are using middleware for json 
app.use(express.json())
app.use(cors())

// Routes 

app.post('/orders', async (req, res) => {
    try {
        const order = new OrderModel(req.body);
        const orderAdd = await order.save();
        res.status(201).send(orderAdd);
    } catch (e) {
        console.log("Error", e);
        res.status(404).send("Error"); // Change to res.status(404).send("Error: " + e);
    }
});

// GET route to fetch all orders
app.get('/orders', async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).send(orders);
    } catch (e) {
        console.log("Error", e);
        res.status(500).send("Error"); // Change to res.status(500).send("Error: " + e);
    }
});

app.listen(port, () => {

    console.log(`The server is running on http://127.0.0.1:${port}`)
})