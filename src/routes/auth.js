const express = require('express')
const {body, check, validationResult} = require('express-validator');
const { models } = require('../models');
const {Op} = require('sequelize')
const userModel = require('../models/user.model');
const router = express.Router();
const jwt = require('jsonwebtoken');

const {validateToken} = require('../middleware/auth') 

router.get('/auth', (req, res) => {
    res.send('halo');
})

router.post('/auth/login', 
    body('username', 'Username is required').exists(),
    body('password', 'Password is required').exists(),
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const user = await models.user.findOne({
            where: {
                [Op.and]: [
                    {
                        username: req.body.username
                    },
                    {
                        password: req.body.password
                    },

                ]       
            }
        })
        if(user){
            const token = jwt.sign(user.id, process.env.TOKEN_SECRET)
            return res.json({success: true, token})
        }else{
            return res.json({
                success: false
            })
        }
    }
)

router.get('/auth/user', validateToken, async (req, res) => {
	const user = await models.user.findByPk(req.user_id);
	return res.json({success: true, user})
})

router.post('/auth/register', 
    body('email').exists(),
    body('name').isLength({min: 5, max: 100}),
    body('username').exists(),
    body('password').isLength({min: 8}),
    async (req, res) => {
        const errors = validationResult(req)
        console.log('here')
        if(!errors.isEmpty()){
            return res.status(200).json({success: false, errors: errors.array()})
        }
        const user = await models.user.create({
            email: req.body.email,
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        })
        return res.json({success: true, user})
    }
)

module.exports = router

// module.exports = (app) => {
//     app.use('/api/auth', router);
// }
