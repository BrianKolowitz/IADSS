var Q = require('q');
var EXTEND = require('extend');

exports.info = function(req, res) {
    req.models.study.find({ }, function (err, studies) {
        if ( err != null )
            res.json(false); // todo : return error
        else
            res.json(studies.length);
    });
}

exports.query = function(req, res) {
    var params = { };

    if ( typeof req.query.limit != 'undefined' ) {
        console.log('limit: ' + req.query.limit);
        params = EXTEND(params, {
            limit: parseInt(req.query.limit)
        });
    }

    if ( typeof req.query.offset != 'undefined' ) {
        console.log('offset: ' + req.query.offset);
        params = EXTEND(params, {
            offset: parseInt(req.query.offset)
        });
    }

    req.models.study.find({ }, params, function (err, studies) {
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

exports.add = function (req, res) {
    // lookup patient
    Q.fcall(function () {
        var d = {
            study: req.body
        };

        var deferred = Q.defer();
        req.models.patient.find({medicalRecordNumber: d.study.patient.medicalRecordNumber}).run(function (error, patients) {
            var patient;
            if (patients.length == 0) {
                // add the patient
                req.models.patient.create(
                    [
                        {
                            medicalRecordNumber: d.study.patient.medicalRecordNumber,
                            name: d.study.patient.name
                        }
                    ], function (error, patients) {
                        if (error) {
                            deferred.reject(new Error(error));
                        } else {
                            d = EXTEND(d, {
                                dbPatient: patients[0]
                            });
                            deferred.resolve(d);
                        }
                    });
            } else if (patients.length == 1) {
                d = EXTEND(d, {
                    dbPatient: patients[0]
                });
                deferred.resolve(d);
            } else {
                deferred.reject(new Error("more than one patient found"));
            }
        });
        return deferred.promise;
    }).then(function (d) {
            var deferred = Q.defer();
            req.models.study.find({accessionNumber: d.study.accessionNumber}).run(function (error, studies) {
                if (studies.length == 0) {
                    // add the patient
                    req.models.study.create(
                        [
                            {
                                accessionNumber: d.study.accessionNumber,
                                patient_id: d.dbPatient.id
                            }
                        ], function (error, studies) {
                            if (error) {
                                deferred.reject(new Error(error));
                            } else {
                                console.log("returning ");
                                console.log(studies[0]);
                                res.json(studies[0]);
                                deferred.resolve(d);
                            }
                        });
                } else if (studies.length == 1) {
                    deferred.reject(new Error("study already exists"));
                } else {
                    deferred.reject(new Error("more than one patient found"));
                }
            });
            return deferred.promise;
        }).fail(function (error) {
            console.log("exports.addStudy Error %s", error);
            res.json(false);
        }).done();
};

// PUT
exports.edit = function (req, res) {
    Q.fcall(function () {
        var d = {
            studyId: req.params.studyId,
            study: req.body
        };

        var deferred = Q.defer();
        req.models.study.get(d.studyId, function (error, study) {
            if (error) {
                console.log("edit study select image error: %s", error);
                deferred.reject(new Error(error));
            }
            else {
                d = EXTEND(d, {
                    dbRecord: study
                });
                deferred.resolve(d);
            }
        });
        return deferred.promise;
    }).then(function (d) {
            var deferred = Q.defer();
            d.dbRecord.save(d.study, function (error) {
                if (error) {
                    console.log("edit study save study error: %s", error);
                    deferred.reject(new Error(error));
                } else {
                    deferred.resolve(d);
                }
            });
            return deferred.promise;
        }).then(function (d) {
            var deferred = Q.defer();
            req.models.patient.get(d.dbRecord.patient_id, function (error, patient) {
                if (error) {
                    console.log("edit study select patient error: %s", error);
                    deferred.reject(new Error(error));
                } else {
                    d.dbRecord = patient;
                    deferred.resolve(d);
                }

            });
            return deferred.promise;
        }).then(function (d) {
            var deferred = Q.defer();
            d.dbRecord.save(d.study.patient, function (error) {
                if (error) {
                    console.log("edit study save patient error %s", error);
                    deferred.reject(new Error(error));
                } else {
                    deferred.resolve(d);
                    res.json(true)
                }
            });
            return deferred.promise;
        }).fail(function (error) {
            console.log("edit study fail %s", error);
            res.json(false);
        }).done();
};

// DELETE
exports.delete = function (req, res) {
    Q.fcall(function () {
        var deferred = Q.defer();
        var d = {
            studyId: req.params.studyId
        };

        req.models.image.count({ study_id: d.studyId }, function (error, count) {
            if (count > 0) {
                req.models.image.find({ study_id: d.studyId }).remove(function (error) {
                    if (error) {
                        deferred.reject(new Error(error));
                    } else {
                        deferred.resolve(d);
                    }
                });
            } else {
                deferred.resolve(d);
            }
        });
        return deferred.promise;
    }).then(function (d) {
            var deferred = Q.defer();
            req.models.study.count({id: d.studyId}, function (error, count) {
                if (count == 1) {
                    req.models.study.get(d.studyId, function (error, study) {
                        if (error) {
                            deferred.reject(new Error(error));
                        } else {
                            d = EXTEND(d, {
                                study: study
                            });
                            deferred.resolve(d);
                        }
                    });
                } else {
                    deferred.reject(new Error("Study count " + count + " != 1"));
                }
            });
            return deferred.promise;
        }).then(function (d) {
            var deferred = Q.defer();
            d.study.remove(function (error) {
                if (error) {
                    deferred.reject(new Error(error));
                } else {
                    deferred.resolve(d);
                }
            });
            return deferred.promise;
        }).then(function (d) {
            var deferred = Q.defer();
            req.models.study.count({ patient_id: d.study.patient_id }, function (error, count) {
                if (count == 0) {
                    req.models.patient.find({id: d.study.patient_id}).remove(function (error) {
                        if (error) {
                            deferred.reject(new Error(error));
                        } else {
                            deferred.resolve(d);
                        }
                    });
                } else {
                    deferred.resolve(d);
                }
            });
            return deferred.promise;
        }).then(function (d) {
            res.json(true);
        }).fail(function (error) {
            console.log("delete study fail %s", error);
            res.json(false);
        }).done();
};