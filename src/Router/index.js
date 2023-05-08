const express   = require('express')
const router    = express.Router()


router.get('/sisira', (req, res) => {
    console.log(' SERVICE IS RUNINNG ')

    res.send(" Hey Puppala, our service is running ")
})

module.exports = router