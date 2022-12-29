const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('addstore.html');
});

module.exports = router