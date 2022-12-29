const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('map.html');
});

module.exports = router