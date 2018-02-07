const express = require('express')
const config = require('./config')

const router = require('./src/api/servive')
const port = process.env.PORT || config.build.port
const app = express()

app.use('/api', router);

app.use(express.static('./dist'))

module.exports = app.listen(port,function(err){
    if(err){
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})
