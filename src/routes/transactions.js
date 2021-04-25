const { default: axios } = require('axios');
const express = require('express')
const {body, check, validationResult} = require('express-validator');
const { validateToken } = require('../middleware/auth');
const { models, validate, model } = require('../models');
const router = express.Router();

router.get('/transactions', validateToken, async (req, res) => {
    console.log(req.query.page)
    console.log(req.query.type_is_crypto)
    const page = parseInt(req.query.page || 0);
    const limit = parseInt(req.query.limit || 5);
    const where = {}
    if(req.params.type_is_crypto){
        where.type_is_crypto = req.params.type_is_crypto
    }
    const transactions = await models.asset.findAll({
        offset: page,
        limit: limit,
        where: where
    })
    const response = {
        success: true,
        page,
        limit,
        data: transactions
    }
    return res.json(response)
})

router.post('/transactions/update', async (req, res) => {
})

router.post('/transactions', validateToken, async (req, res) => {
    try{
        const user = await models.user.findByPk(req.user_id)
        const asset = await models.asset.findByPk(req.body.asset_id)
        const transaction = await models.transaction.create({
            user_id: user.id,
            asset_id: asset.asset_id,
            price_usd: asset.price_usd,
            status: "BUY",
            ammount: req.body.ammount
        })
        return res.json({
            success: true,
            data: transaction
        })
    }catch(err){
        return res.json({
            success: false,
            error: err
        })
    }
})

router.get('/transactions/user', validateToken, async (req, res) => {
    const user = await models.user.findByPk(req.user_id)
    const transaction = await models.transaction.findAll({
        where: {
            user_id: user.id
        }
    })
    return res.json({
        success: true,
        data: transaction
    })
})

router.get('/transactions/:id', validateToken, async (req, res) => {
    const user = await models.user.findByPk(req.params.id)
    return res.json(user)
})

module.exports = router;