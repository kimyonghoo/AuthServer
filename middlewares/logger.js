const logger = (req, res, next) =>{
    console.log(req.url, '.. from logger middleware');
    next();
};

module.exports = logger;