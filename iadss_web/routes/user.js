
/*
 * GET users listing.
 */

exports.list = function(req, res){
    req.models.user.find({ }, function (err, users) {
        if ( err != null )
            res.json(false); // todo : return error
        else
            res.json(users);
    });
};