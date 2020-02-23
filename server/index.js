const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParser.json())

const apiRoute = require('./routes/api')
app.use('/api', apiRoute)

const testRoute = require('./routes/test')
app.use('/test', testRoute)

app.use(express.static(path.resolve(__dirname,'public')))
app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

const port = process.emitWarning.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
