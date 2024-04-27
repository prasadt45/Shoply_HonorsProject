const mongoose = require('mongoose')
const { OrderProductSchema } = require('./orderproduct')
const {Schema} = mongoose

const OrderSchema = new Schema({
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User' 
    },
    products: [OrderProductSchema]
}, {timestamps: {createdAt: 'addedAt', updatedAt: 'modifiedAt'}})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order 