/**
 * Rapid Deploy URL Shortener
 * By Dubst3pGam1ng/Miles Rush on Github
 * 
 * Liscensed GNU General Public License v3.0
 */
//dotenv
require('dotenv').config();

//Express Application
const express = require('express');
const app = express();

//Middlewares
const cors = require('cors');

//Inject middlewares
app.use(cors());

//Router
app.use('/', require('./router/router'));

//Error Handling
app.use(require('./helpers/errors'))

//Listen
var port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
});