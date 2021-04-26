const { default: axios } = require('axios');
const express = require('express')
const {body, check, validationResult} = require('express-validator');
const { validateToken } = require('../middleware/auth');
const { models, validate, model } = require('../models');
const {Op} = require('sequelize');
const router = express.Router();

router.get('/assets', validateToken, async (req, res) => {
    console.log(req.query.page)
    console.log(req.query.type_is_crypto)
    const page = parseInt(req.query.page || 0);
    const limit = parseInt(req.query.limit || 25);
    const where = {
    	price_usd: {
		[Op.not]: null
	}
    }
    if(req.params.type_is_crypto){
        where.type_is_crypto = req.params.type_is_crypto
    }
    const assets = await models.asset.findAll({
        offset: page,
        limit: limit,
        where: where
    })
    const response = {
        success: true,
        page,
        limit,
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
