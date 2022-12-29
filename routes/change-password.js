const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('change-password.html');
});

module.exports = router