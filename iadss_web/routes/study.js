
/*
 * GET users listing.
 */

exports.query = function(req, res){
    req.models.study.find({ }, function (err, studies) {
        if ( err != null )
            res.json(false); // todo : return error
        else
            res.json(studies);
    });
};

exports.get = function (req, res) {
    var studyId = req.params.studyId;
    req.models.study.get(studyId, function (err, study) {
        if (study != null) {
            res.json(study);
        } else {
            res.json(false); // todo : return error
        }
    });
};