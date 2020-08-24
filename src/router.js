/**
 * Rapid Deploy URL Shortener
 * By Dubst3pGam1ng/Miles Rush on Github
 * 
 * Liscensed GNU General Public License v3.0
 */
//Metadata
const package = require('../package.json');

//Router
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        name: package.name,
        version: package.version
    });
});

//Filesystem based routing
const fs = require('fs');

fs.readdirSync('./routes').forEach((path) => {
    let data = require(`./routes/${path}`);
    router.use(data.path, data.router);
});

module.exports = router;