const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('register.html');
});

module.exports = router