const express = require('express')
const jwt = require('jsonwebtoken')

const secretKey = 'secret key' //consider putting this into a config file. Could also make this dynamic and change per user every time that user logs out
const router = express.Router()

router.get('/', async (req, res) => {
    res.status(200).send('hello')
})

router.get('/secure', verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if(err) {
            console.log(err)
            res.sendStatus(403)
        } else {
            res.json({
                message: 'secure location reached',
                authorization: authData
            })
        }
    })
})

router.get('/login', async (req, res) => {

    //Authenticate user here.  Mock for now
    const user = {
        name: 'test user',
        role: 'commissioner'
    }

    jwt.sign({user: user}, secretKey, { expiresIn: '10min'}, (err, token) => {
        res.json({token})
    })
})

function verifyToken(req, res, next) {
    //check that token exists.  If not, send 403. Token signature and payload should exist in separate cookies

    //fake out token for now. Copy output from /api/login endpoint and paste here to test
    req.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJ0ZXN0IHVzZXIiLCJyb2xlIjoiY29tbWlzc2lvbmVyIn0sImlhdCI6MTU4MjUwMDUyOCwiZXhwIjoxNTgyNTAxMTI4fQ.FOSFImBP4PISiALyOotaO50ApR7AJIO5FyQmMEZxQQw'
    next()
}

module.exports = router