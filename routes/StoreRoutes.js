const express = require('express');
const router = express.Router();

const storecontroller = require("../server.js");

router.post('/create', storecontroller.createStore);


module.exports = router;