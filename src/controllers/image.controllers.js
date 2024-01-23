const catchError = require('../utils/catchError');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const results = await Image.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Image.create(req.body);
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Image.destroy({ where: {id} });
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove
}