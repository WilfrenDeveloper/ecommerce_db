const { getAll, create, remove } = require('../controllers/image.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const imageRouter = express.Router();

imageRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

imageRouter.route('/:id')
    .delete(verifyJWT, remove)

module.exports = imageRouter;