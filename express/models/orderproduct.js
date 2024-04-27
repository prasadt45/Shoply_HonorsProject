const mongoose = require('mongoose')
const {Schema} = mongoose 

const OrderProductSchema = new Schema({
    _id: {type: mongoose.Types.ObjectId},
    qty: Number 
})

const OrderProduct = mongoose.model('OrderProduct', OrderProductSchema)

module.exports = {OrderProduct, OrderProductSchema}