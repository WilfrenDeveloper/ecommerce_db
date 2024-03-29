const catchError = require('../utils/catchError');
const ProductCart = require('../models/ProductCart');
const Product = require('../models/Product');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const results = await ProductCart.findAll({
        include: [
            {
              model: Product,
              include: [Image],
            },
          ],
        where: {userId : req.user.id},
        
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { productId, quantity } = req.body;
    const result = await ProductCart.create({
        userId: req.user.id,
        productId,
        quantity
    });
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await ProductCart.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductCart.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    remove,
    update
}