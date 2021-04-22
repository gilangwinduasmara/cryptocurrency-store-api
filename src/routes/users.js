const express = require('express')
const {body, check, validationResult} = require('express-validator');
const { models } = require('../models');
const router = express.Router();


router.get('/users', async (req, res) => {
    const users = await models.user.findAll()
    return res.json(users)
})


module.exports = router;