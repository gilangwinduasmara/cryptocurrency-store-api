const { default: axios } = require('axios');
const express = require('express')
const {body, check, validationResult} = require('express-validator');
const { validateToken } = require('../middleware/auth');
const { models, validate, model } = require('../models');
const {Op, sequelize}= require('sequelize');
const router = express.Router();

router.get('/assets', validateToken, async (req, res) => {
    const user = await models.user.findByPk(req.user_id);
    const limit = req.query.size ? +reg.query.size : 10;
    const offset = req.query.page ? req.query.page * limit : 0;
    const where = {
    	price_usd: {
		[Op.not]: null
	}
    }
    if(req.params.type_is_crypto){
        where.type_is_crypto = req.params.type_is_crypto
    }
    let assets = await models.asset.findAll({
        offset: offset,
        limit: limit,
        where: where,
	raw: true
    })

    assets = await Promise.all(assets.map( async (asset) => {
	let user_balance = 0;
	const transactions = await models.transaction.findAll({
		where: {
			asset_id: asset.asset_id,
			user_id: req.user_id
		},
		raw: true
	})

	    console.log(transactions)
		transactions.map((transaction) => {
			if(transaction.status == 'BUY'){
				user_balance += transaction.ammount
			}else{
				user_balance -= transaction.ammount
			}
		})
	
    	return {...asset, user_balance}
    }))

    const response = {
        success: true,
        page: req.params.page,
        data: assets
    }
    return res.json(response)
})

router.post('/assets/update', async (req, res) => {
    var config = {
        method: 'get',
        url: 'https://rest.coinapi.io/v1/assets',
        headers: { 
          'X-CoinAPI-Key': 'B364EB50-5CB2-4073-B40A-C845DB1F4D50'
        }
      };
      
      axios(config)
      .then(async function (response) {
          try{
              await models.asset.bulkCreate(response.data);
              res.json({success: true})
          }catch(error){
              res.json({success: false, error})
              console.log("bulk create error");
              console.error(error)
          }
      })
      .catch(function (error) {
        res.json({success: false, error})
      });
})

router.get('/assets/:id', validateToken, async (req, res) => {
    const user = await models.user.findByPk(req.params.id)
    return res.json(user)
})

module.exports = router;
