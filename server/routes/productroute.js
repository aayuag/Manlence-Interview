const productModel = require("../models/productModel.js")
const express = require("express")

const router = express.Router()

router.post("/add", (req, res) => {
    productModel.find({ productid: req.body.productid }).then((data) => {
        if (data.length) {
            res.status(400).send("Product Already Exists")
        } else {
            productModel.create({
                name: req.body.name,
                image: req.body.image,
                price: req.body.price,
                productid: req.body.productid
            }).then(() => {
                res.status(200).send(`${req.body.name} added successfully`);
            }).catch((err) => {
                res.status(400).send(err.message)
            })
        }
    })

});

router.get("/all", (req, res) => {
    productModel.find().then((data) => {
        res.status(200).send(data)
    })
});

router.delete("/delete/:id", (req, res) => {
    productModel.find({ productid: req.params.id }).then((data) => {
        if (data.length) {
            productModel.deleteOne({ productid: req.params.id }).then(() => {
                res.status(200).send("Product deleted successfully")
            }).catch((err) => {
                res.status(400).send(err)
            })
        } else {
            res.status(400).send("no such product")
        }
    })
});

router.post("/edit/:id", (req, res) => {
    productModel.find({ productid: req.params.id }).then((data) => {
        if (data.length) {
            productModel.updateOne({ productid: req.params.id }, { $set: req.body }).then((data) => {
                res.status(200).send(data)
            }).catch((err) => {
                res.status(400).send(err)
            })
        } else {
            res.status(400).send("no such product")
        }
    })
});


module.exports = router