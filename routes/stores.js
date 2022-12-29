const express = require('express')
const router = express.Router()
const Stores = require('../model/store.js');

router.get('/', (req, res) => {
  //  Stores.find({}, (err,result)=>{
   //   res.json(result)
 //  })
    res.render('stores.html');
});

module.exports = router