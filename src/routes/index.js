const express = require('express')
const router = express.Router();


router.get('/', (req, res) => {
    res.send('<h2>Hello, GGV!</h2>');
})

module.exports = router

// module.exports = (app) => {
//     app.use('/api/auth', router);
// }