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

router.post('/users/topup', validateToken, async (req, res) => {
	const user = await models.user.findByPk(req.user_id);
	user.balance = parseFloat(user.balance || 0) + parseFloat(req.body.amount);
	await user.save();
	await models.transaction.create({
		user_id: user.id,
		status: 'TOPUP',
		asset_id: 'USD',
		ammount: parseFloat(req.body.amount),
		price_usd: parseFloat(req.body.amount)

	})
	return res.json({success: true, user});
})

router.put('/users', validateToken, async (req, res) => {
	const user = await models.user.findByPk(req.user_id);
	user.username = req.body.username;
	user.name = req.body.name;
	user.email = req.body.email;
	user.save();
	return res.json({success: true, user: user});
})

module.exports = router;
