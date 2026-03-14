const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    }
    catch(err){
        res.json({error: err.message});
    }
};

exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.json(product);
};

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({message: "Product deleted"});
};