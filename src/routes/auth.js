const express = require('express')
const router = express.Router();


router.get('auth/', (req, res) => {
    res.send('halo');
})

router.post('auth/login', (req, res) => {
    const {email, password} = req.body
})

router.post('auth/register', (req, res) => {

})

module.exports = router

// module.exports = (app) => {
//     app.use('/api/auth', router);
// }