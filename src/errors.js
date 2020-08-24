exports = (error, req, res) => {
    if(error.status){
        res.status(error.status);
    } else {
        res.status(500);
    }

    res.json({
        error: process.env.TYPE == 'production' ? "An error occured." : error.stack
    });
}