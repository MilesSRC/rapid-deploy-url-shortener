/**
 * Rapid Deploy URL Shortener
 * By Dubst3pGam1ng/Miles Rush on Github
 * 
 * Liscensed GNU General Public License v3.0
 */
module.exports = (error, req, res, next) => {
    if(error.status){
        res.status(error.status);
    } else {
        res.status(500);
    }

    res.json({
        error: process.env.ENV == 'production' ? "An error occured." : error.stack
    });
}