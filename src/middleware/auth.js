const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({success: false, error: "Token not found"})

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user_id) => {
        console.log(err)

        if (err) return res.status(403).json({success: false, error: "Token is invalid"})

        req.user_id = user_id

        next()
    })
}


module.exports = {validateToken}