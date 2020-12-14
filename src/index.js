/**
 * Rapid Deploy URL Shortener
 * By Dubst3pGam1ng/Miles Rush on Github
 * 
 * Liscensed GNU General Public License v3.0
 */
//dotenv
const env = process.env;
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
if(env.SSL == 'true'){
    const https = require('https');
    const fs = require('fs');

    https.createServer({
        key: fs.readFileSync(env.SSL_KEY),
        cert: fs.readFileSync(env.SSL_CERT)
    }, app).listen(port, () => {
        console.log(`Listening on Port ${port}`);
    });
} else {
    app.listen(port, ()=>{
        console.log(`Listening on Port ${port}`);
    });
}