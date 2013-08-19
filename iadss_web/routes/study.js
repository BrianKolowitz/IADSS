
/*
 * GET users listing.
 */

exports.list = function(req, res){
    req.models.study.find({ }, function (err, studies) {
        if ( err != null )
            res.json(false); // todo : return error
        else
            res.json(studies);
    });
};