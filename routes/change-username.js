const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('change-username.html');
});

module.exports = router