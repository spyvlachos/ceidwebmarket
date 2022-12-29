const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('logadmin.html');
});

module.exports = router