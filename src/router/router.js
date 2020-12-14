/**
 * Rapid Deploy URL Shortener
 * By Dubst3pGam1ng/Miles Rush on Github
 * 
 * Liscensed GNU General Public License v3.0
 */
//Metadata
const package = require('../../package.json');
const directory = require('path').dirname(require.main.filename);

//Router
const express = require('express');
const router = express.Router();

if(process.env.SERVE_FRONTEND == 'true')
    router.use(express.static(`${directory}/../public/`))

router.get('/', (req, res) => {
    if(process.env.SERVE_FRONTEND != 'true'){
        res.json({
            name: package.name,
            version: package.version
        });
    }
});

//Filesystem based routing
const fs = require('fs');

fs.readdirSync(`${directory}/router/routes/`).forEach((path) => {
    let data = require(`${directory}/router/routes/${path}`);
    router.use(data.path, data.router);
});

module.exports = router;