const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const ejs = require('ejs');
const bodyparser = require("body-parser");
const path = require('path');
const connectDB = require('./connection');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const User = require('./model/user');
const Store = require('./model/store');
const admins = require('./model/admin');
const schemadb = require('./model');
const loginRouter = require('./routes/login');
const logadminRouter = require('./routes/logadmin');
const templateRouter = require('./routes/template');
const cssRouter = require('./routes/css');
const addstoreRouter = require('./routes/addstore');
const registerRouter = require('./routes/register');
const userhomeRouter = require('./routes/userhome');
const adminhomeRouter = require('./routes/adminhome');
const changepasswordRouter = require('./routes/change-password');
const changeusernameRouter = require('./routes/change-username');
const storesRouter = require('./routes/stores');
const delstoresRouter = require('./routes/deletestores');
const mapRoutes = require('./routes/map');
const chartRoutes = require('./routes/chart');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("./model");


const JWT_SECRET = 'sdjkfh89qiuhesdbhjdsfg839ujkdhfjk'

const application = express();
dotenv.config({ path: 'config.env' })
application.use(bodyParser.json())

const PORT = process.env.PORT || 8080
application.use(morgan('tiny'));
connectDB();
application.use(bodyparser.urlencoded({extended: true}))

application.set("view engine", "ejs")
application.set("view engine", "html")






application.use('/css', express.static(path.resolve(__dirname,'assets/css')))
application.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
application.use('/js', express.static(path.resolve(__dirname, 'assets/js')))
application.use('/', express.static(path.resolve(__dirname, 'model')))
application.use('/ejs', express.static(path.join(__dirname, 'views')))
application.use('/', express.static(path.join(__dirname, 'views')))
application.use('/', express.static(path.join(__dirname, 'components')))
application.use('/', express.static(path.resolve(__dirname, 'webapp')))

application.post('/api/markers', async (req, res) => {
    const lng = req.body.lng;
    const lat = req.body.lat;

    Store.find({
        loc: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [lng, lat],
                },
            },
        },
    },
        function (err, Store) {
            if (err) {
                res.send(err);
            } else { res.json(stores); }
        }
    );

   
})

application.post('/api/addcov', async (req, res) => {
    const { name ,covidcases } = req.body

    const storen = await Store.findOne({ name }).lean()

    var covidcase = await Store.findOne({ covidcases }).lean()
    if (!storen) {
        
        return res.json({ status: 'error', error :'invalid store search' })
    }

    if(storen) {

        
        await Store.updateOne(
            //covidcases=covidcases+1,
            { name },
            {
                
                $inc: { covidcases: 1}
            }
        )
        
    res.json({ status: 'ok' })
    }

})




application.delete('/api/deletestore', async (req, res) => {
    const { name  } = req.body

    const storena = await Store.findOne({ name }).lean()

    
    if (!storena) {
        
        return res.json({ status: 'error', error :'invalid store search' })
    }

    if(storena) {

        
        await Store.deleteOne(
            //covidcases=covidcases+1,
            { "name": name }
        )
        
    res.json({ status: 'ok' })
    }

})





application.post('/api/login', async (req, res) => {
    const { username, password } = req.body



    const user = await User.findOne({ username }).lean()
       

    if (!user) {
        return res.json({ status: 'error', error :'invalid username' })
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id, username: user.username, email: user.email },
            JWT_SECRET)
        return res.json(
            {
                status: 'ok',
                data: token
            })
        
        res.redirect('/userhome.ejs');
    }
   
     res.json({ status: 'error', error: 'wrong password' })
})




application.post('/api/logadmin', async (req, res) => {
    const { username, password } = req.body



    const admin = await admins.findOne({ username }).lean()


    if (!admin) {
        return res.json({ status: 'error', error: 'invalid username' })
   }

    if (await bcrypt.compare(password, admin.password)) {
        const token = jwt.sign({ id: admin._id, username: admin.username },
            JWT_SECRET)
        return res.json(
            {
                status: 'ok',
                data: token
            })

        res.redirect('/userhome.ejs');
    }

    res.json({ status: 'error', error: 'wrong password' })
})



application.get('/api/chart', async (req,res)=>{
    var data = await Store.find({"covidcases": {$gt:0}}, {'name':true,'covidcases':true})
    return jsonify ({'data': result['values']})
})


application.post('/api/addStores', async (req, res) => {
    const { type, id,lat,lon,name ,shop
        
    } = req.body
    try {
        const responce = await Store.create({
            type, id,lat,lon,name ,shop
        })
        console.log('User created:', responce)
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: 'error' })
        } throw error
        return res.json({ status: 'error' })
    }

    res.json({ status: 'ok' })
})

application.post('/api/storedata', async (req, res) => {
    let storename = req.body.storename;
    Store.findOne(username, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            let openingTable = '<table>\
                                <tr>\
                                <th>username</th>\
                                <th>address</th>\
                                <th>types</th>\
                                <th>coordinates</th>\
                                <th>rating</th>\
                                <th>rating_n</th>\
                                <th>populartimes</th>\
                                </tr>'
            openingTable = openingTable + '<tr>\
                                           <td>'+ result.username + '</td>\
                                           <td>'+ result.address + '</td>\
                                           <td>'+ result.types + '</td>\
                                           <td>'+ result.coordinates + '</td>\
                                           <td>'+ result.rating + '</td>\
                                           <td>'+ result.rating_n + '</td>\
                                           <td>'+ result.populartimes + '</td>\
                                           </tr>\
                                           </table>'
            res.send({ html: openingTable });
        }
    })
    //const stores = await Store.findOne({storename}).then(Store => {
      //  res.render('views/template.ejs', {
      //      storeslist: stores
     //   });
       
  //  })
       // .catch(err => {
      //      res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
    //    })
        
        
    })

     





application.post('/api/change-password', async (req, res) => {
    const { token, newpassword: plainTextPassword } = req.body

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 7) {
        return res.json({
            status: 'error',
            error: 'Password too small'
        })
    }

    try {
        const user = jwt.verify(token, JWT_SECRET)

        const _id = user.id

        const password = await bcrypt.hash(plainTextPassword, 5)

        await User.updateOne(
            { _id },
            {
                $set: { password }
            }
        )
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'fail' })
    }
})



application.post('/api/change-username', async (req, res) => {
  
    const {token, newusername}  = req.body

    if (!newusername) {
        return res.json({ status: 'error', error: 'Invalid username' })
    }

 
    try {
    const user = jwt.verify(token, JWT_SECRET)
   // const newusername = user.username
     

         const _id = user.id

        //const password = await bcrypt.hash(plainTextPassword, 5)
        
        await User.updateOne(
            { _id },
            {
                $set: { username: newusername}
            }
        )
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'fail' })
    }
})






application.post('/api/register', async(req, res)=> {
    const { username, password: plainTextPassword, email  } = req.body
    

    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'invalid username'})
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'invalid password' })
    }
    if (!email || typeof email !== 'string') {
        return res.json({ status: 'error', error: 'invalid email' })
    }

    if (plainTextPassword.length <7) {
        return res.json({ status: 'error', error: 'password too small' })
    }

    console.log(req.body)
    const password = await bcrypt.hash(plainTextPassword, 5)
    try {
        const responce = await User.create({
            username,
            password,
            email
        })
        console.log('User created:', responce)
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: 'username or email already exists' })
        } throw error
        return res.json({status: 'error'})
    }

    res.json({ status:'ok'})
})

application.use('/login.html', loginRouter);
application.use('/logadmin.html', logadminRouter);
application.use('/register.html', registerRouter);
application.use('/userhome.html', userhomeRouter);
application.use('/adminhome.html', adminhomeRouter);
application.use('/change-password.html', changepasswordRouter);
application.use('/change-username.html', changeusernameRouter);
application.use('/template.html', templateRouter);
application.use('/stores.html', storesRouter);
application.use('/style.css', cssRouter);
application.use('/addstore.html', addstoreRouter);
application.use('/map.html', mapRoutes);
application.use('/deletestores.html', delstoresRouter);
application.use('/chart.html', chartRoutes);
application.get('/', (req, res) => {
   
    res.render('index.html');
    
});


// update data in mongodb
application.post('/server', async function(req, res) {
   
    var newValue = req.body.myVariable;
    var previousValue = req.body.secondVariable;
    var columnValue = req.body.myColumn;
    var id = req.body.myId;
    console.log(newValue);
    console.log(previousValue);
    console.log(columnValue);
    console.log(id);

    
    const storeId = await Store.findOne({id}).lean();
    console.log(storeId)

    if (!storeId)
    {
        console.log("Didn't find a store with that id")
    }
    if (storeId){

        await Store.updateOne(

            {id},
            {
                    $set:{previousValue:newValue}
            }
        )


    }

    
}
);



application.get('/api/supermarkets',async (req,res) =>
    {
        const supers = await Store.find().lean();
        const supersJson =  JSON.stringify(supers);
        res.send(supersJson);
    })

    
    // const query = { previousValue: previousValue };
    // const update = { $set: { previousValue: newValue } };
    // const options = { returnOriginal: false };
    // Store.findOneAndUpdate(query, update, options, (err, res) => {
    //   if (err) throw err;
    //   console.log(res.value);
    // });

  

application.listen(PORT, () => {
    console.log("server started")
});



