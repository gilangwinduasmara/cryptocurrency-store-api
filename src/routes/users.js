const express = require('express')
const {body, check, validationResult} = require('express-validator');
const { validateToken } = require('../middleware/auth');
const { models, validate } = require('../models');
const router = express.Router();

router.get('/users', validateToken, async (req, res) => {
    const users = await models.user.findAll()
    return res.json(users)
})

router.get('/users/:id', validateToken, async (req, res) => {
    const user = await models.user.findByPk(req.params.id)
    return res.json(user)
})

module.exports = router;