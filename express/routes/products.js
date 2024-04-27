let mongoose = require('mongoose')
let express = require('express')
let router = express.Router();

let productSchema = require("../models/Product");

router.post("/create", (req, res, next) => {
    productSchema.create(req.body)
     .then((data) => {
        console.log(data)
        res.json(data) 
     })
     .catch((err) => {
        console.log(err)
        return next(err)
     })
})

router.get("/", (req, res, next) => {
    productSchema.find()
    .then((data) => {
        console.log(data)
        res.json({success: true, data, message: "SUCCESS"})
    })
    .catch(err => {
        console.log(err)
        return next(err)
    })
})

router.route("/update-product/:id")
    .get((req, res, next) => {
        productSchema.findById(req.params.id)
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            console.log(err)
            return next(err)
        })
        
    })
    .put((req, res, next) => {
        productSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,  
            })
            .then((data) => {
                console.log(data)
                res.json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    })

    router.delete("/delete-product/:id", (req, res, next) => {
        productSchema.findByIdAndDelete(req.params.id)
            .then((data) => {
                console.log(data)
                res.json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    })

module.exports = router;