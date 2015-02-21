/**
 * Ambil semua setting dari database
 */

var models = require('../models');

module.exports = function() {
    
    return function (req, res, next) {
        models.Setting.findAll().then(function(data) {
            
            var setting = {};
            data.forEach(function(item) {
                setting[item.ckey] = item.cval;
            });
            
            res.locals.websettings = setting;
            next();
        });
    }
}