const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart = require('../models/ProductCart');

const getAll = catchError(async(req, res) => {
    const purchases = await Purchase.findAll({
        include: [Product],
        where: { userId: req.user.id }
    });
    return res.json(purchases);
});

const create = catchError(async(req, res) => {
    const productCart = await ProductCart.findAll({
        include: [Product],
        where: { userId: req.user.id }
    });
    const result =  productCart.map(async(pro) => (
        await Purchase.create({
            userId: pro.userId,
            productId: pro.productId,
            quantity: pro.quantity,
        })
    )) ;
    await ProductCart.destroy({
        where: { userId: req.user.id }
    });
    return res.status(201).json({message: "purchases successful"});
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Purchase.destroy({where: {id}})
    return res.sendStatus(204)
});

module.exports = {
    getAll,
    create,
    remove
}