const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('deletestores.html');
});

module.exports = router