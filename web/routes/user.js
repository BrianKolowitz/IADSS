
/*
 * GET users listing.
 */

exports.query = function(req, res){
    req.models.user.find({ }, function (err, users) {
        if ( err != null )
            res.json(false); // todo : return error
        else
            res.json(users);
    });
};

exports.get = function (req, res) {
    var userName = req.params.userName;
    req.models.user.find({userName: userName}, function (error, users) {
        if (error) {
            res.json(false); // todo : return error
        } else {
            res.json(users.length == 1 ? users[0] : null); // todo : throw error if 0 or more than 1 user found
        }
    });
}