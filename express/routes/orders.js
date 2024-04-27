const express = require('express')
const Order = require('../models/order')
const mongoose = require('mongoose')
const User = require('../models/User')
const router = express.Router()

const isUserAdmin = async (uid) => {
    const user = await User.findOne({_id: mongoose.mongo.BSON.ObjectId.createFromHexString(uid)})

    if(!user) {
        console.log("NOT FOUND")
        return false 
    }
    console.log(user.isAdmin)
    return user.isAdmin 
}


router.get('/', async (req, res) => {
    const orders = await getOrders(req.headers.uid)
    
    res.json({success: true, data: orders})
})


router.post('/', async (req, res) => {
    const orderObj = req.body 

    try {
        const order = new Order({uid: req.headers.uid})
        
        if(orderObj instanceof Array) {
            orderObj.map(p => order.products.push({_id: mongoose.mongo.BSON.ObjectId.createFromHexString(p.id), qty: p.qty}))
        }
        order.save()

        res.json({success: true})
    } catch(err) {
        if(err instanceof Error) {
            res.json({success: false, message: err.message})
        } else {
            res.json({success: false, message: err})
        }
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const delResult = await Order.deleteOne({_id: mongoose.mongo.BSON.ObjectId.createFromHexString(req.params.id)})
        console.log(delResult)
        console.log(req.headers.uid)
        if(delResult.hasOwnProperty('deletedCount') && delResult.deletedCount === 1) {
            const orders = await getOrders(req.headers.uid)

            return res.json({success: true, data: orders})
        } else {
            return res.json({success: false, message: "Unable to delete at the moment"})
        }
    } catch(err) {
        console.log(err)
        return res.json({success: false, message: "Error"})
    }
})

async function getOrders(uid = null) {
    const queryAllOrders = [
        {
            $lookup: {
                from: "users",
                localField: "uid",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: "$userDetails"
        },
        {
            $lookup: {
                from: "products",
                localField: "products._id",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        {
            $project: {
                _id: 1,
                addedAt: 1,
                products: {
                    $map: {
                        input: "$products",
                        as: "orderProduct",
                        in: {
                            $mergeObjects: [
                                "$$orderProduct",
                                {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$productDetails",
                                                as: "product",
                                                cond: {
                                                    $eq: [
                                                        "$$product._id",
                                                        "$$orderProduct._id"
                                                    ]
                                                }
                                            }
                                        },
                                        0
                                    ]
                                }
                            ]
                        }
                    }
                },
                user: {
                    _id: "$userDetails._id",
                    username: "$userDetails.username",
                    email: "$userDetails.email"
                }
            }
        },
        {
            $project: {
                _id: 1,
                addedAt: 1,
                products: {
                    $map: {
                        input: "$products",
                        as: "prod",
                        in: {
                            _id: "$$prod._id",
                            name: "$$prod.name",
                            price: "$$prod.price",
                            qty: "$$prod.qty",
                            total: {
                                $multiply: [
                                    "$$prod.qty",
                                    "$$prod.price"
                                ]
                            }
                        }
                    }
                },
                user: 1
            }
        },
        {
            "$sort": {
                "addedAt": -1
            }
        }
    ]

    const queryUserOrders = [
        {
            $match: {
                _id: mongoose.mongo.BSON.ObjectId.createFromHexString(uid)
            }
        },
        {
            "$lookup": {
                "from": "orders",
                "localField": "_id",
                "foreignField": "uid",
                "as": "orders"
            }
        },
        {
            "$lookup": {
                "from": "products",
                "localField": "orders.products._id",
                "foreignField": "_id",
                "as": "productDetails"
            }
        },
        {
            "$addFields": {
                "orders": {
                    "$map": {
                        "input": "$orders",
                        "as": "order",
                        "in": {
                            "$mergeObjects": [
                                "$$order",
                                {
                                    "products": {
                                        "$map": {
                                            "input": "$$order.products",
                                            "as": "product",
                                            "in": {
                                                "$let": {
                                                    "vars": {
                                                        "productDetails": {
                                                            "$arrayElemAt": [
                                                                {
                                                                    "$filter": {
                                                                        "input": "$productDetails",
                                                                        "as": "pd",
                                                                        "cond": {
                                                                            "$eq": [
                                                                                "$$pd._id",
                                                                                "$$product._id"
                                                                            ]
                                                                        }
                                                                    }
                                                                },
                                                                0
                                                            ]
                                                        }
                                                    },
                                                    "in": {
                                                        "$mergeObjects": [
                                                            "$$product",
                                                            {
                                                                "name": "$$productDetails.name",
                                                                "price": "$$productDetails.price",
                                                                "total": {
                                                                    "$multiply": [
                                                                        "$$productDetails.price",
                                                                        "$$product.qty"
                                                                    ]
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                "productDetails": "$$REMOVE"
            }
        },
        {
            $set: {
                "orders": {
                    $sortArray: {
                        input: "$orders",
                        sortBy: {"addedAt": -1}
                    }
                }
            }
        },
        {
            $project: {
                "orders.uid": 0,
                "orders.__v": 0,
                "password": 0,
                "isAdmin": 0,
                "__v": 0
            }
        }
    ]

    const orders = (await isUserAdmin(uid)) ? await Order.aggregate(queryAllOrders) : await User.aggregate(queryUserOrders)

    return orders instanceof Array ? orders : []
}

module.exports = router 