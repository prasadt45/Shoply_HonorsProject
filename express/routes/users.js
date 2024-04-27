let mongoose = require('mongoose')
let express = require('express')
let router = express.Router();

let userSchema = require("../models/User");

router.post("/create", (req, res, next) => {
    userSchema.create(req.body)
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
    userSchema.find()
    .then((data) => {
        console.log(data)
        res.json(data)
    })
    .catch(err => {
        console.log(err)
        return next(err)
    })
})

router.route("/update-user/:id")
    .get((req, res, next) => {
        userSchema.findById(req.params.id)
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
        userSchema.findByIdAndUpdate(
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

    router.delete("/delete-user/:id", (req, res, next) => {
        userSchema.findByIdAndDelete(req.params.id)
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