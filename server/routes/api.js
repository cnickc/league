const express = require(`express`)
const jwt = require(`jsonwebtoken`)

const secretKey = `secret key` //consider putting this into a config file. Could also make this dynamic and change per user every time that user logs out
const verifyCookieName = `verify`;
const verifyCookieLongevityText = `15min`
const verifyCookieLongevity = 15 * 60 * 1000 // 15 minutes converted to milliseconds
const router = express.Router()

router.get(`/`, async (req, res) => {
    res.status(200).send(`hello`)
})

router.get(`/secure`, verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            console.log(err)
            res.sendStatus(403)
        } else {
            res.json({
                message: `secure location reached`,
                authorization: authData
            })
        }
    })
})

router.post(`/login`, async (req, res) => {
    //send 403 for all errors. Do not give any extra info back 

    //Authenticate user here. Mock for now
    const user = {
        name: `test user`,
        role: `commissioner`
    }

    jwt.sign({ user: user }, secretKey, { expiresIn: verifyCookieLongevityText }, (err, token) => {
        if (err) {
            console.log(err)
            res.sendStatus(403)
        }
        //should also turn on the secure option, but that will break things without https
        res.cookie(`verify`, token, { maxAge: verifyCookieLongevity, httpOnly: true, sameSite: true })
        res.cookie(`userInfo`, user)
        res.sendStatus(200)
    })
})

function verifyToken(req, res, next) {
    //check that token exists. If not, send 403. Token signature and payload should exist in separate cookies
    if (!req.cookies[verifyCookieName]) {
        console.log(`user has attempted to view secure page without a token`)
        res.sendStatus(403)
    } else {
        req.token = req.cookies[verifyCookieName]
        next()
    }
}

module.exports = router