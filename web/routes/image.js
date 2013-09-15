var fs = require('fs');
var path = require('path');
var mime = require('mime');
var uuid = require('node-uuid');
var Q = require('q');
var EXTEND = require('extend');

exports.get = function (req, res) {
    Q.fcall(function () {
        var d = {
            imageId: req.params.imageId
        };
        var deferred = Q.defer();
        req.models.image.get(d.imageId, function (error, image) {
            if (error) {
                deferred.reject(new Error(error));
            } else {
                d = EXTEND(d, { image: image });
                deferred.resolve(d)
            }
        });
        return deferred.promise;
    }).then(function (d) {
            var deferred = Q.defer();
            var fullName = path.join(d.image.filePath, d.image.uniqueFileName);
            //console.log("Reading File %s", fullName);
            fs.exists(fullName, function (exists) {
                if (!exists) {
                    deferred.reject(new Error(fullName + " does not exist"));
                } else {
                    d = EXTEND(d, { fullName: fullName });
                    deferred.resolve(d);
                }
            });
            return deferred.promise;
        })
        .then(function (d) {
            var deferred = Q.defer();
            fs.readFile(d.fullName, function (error, file) {
                if (error) {
                    deferred.reject(new Error(error));
                } else {
                    d = EXTEND(d, { file: file});
                    deferred.resolve(d);
                }
            });
            return deferred.promise;
        }).then(function (d) {
            var contentType = mime.lookup(d.fullName);
            res.writeHead(200, {'Content-Type': contentType });
            res.end(d.file, 'binary');
        }).fail(function (error) {
            res.json(false); // todo : return error
        });
};

// POST
exports.add = function (req, res) {
    Q.fcall(function () {
        var d = {
            studyId: req.params.studyId,
            normal: (req.body.normal == "true"),
            report: req.body.report
        };

        var deferred = Q.defer();
        fs.readFile(req.files.studyFile.path, function (error, file) {
            if (error) {
                deferred.reject(new Error(error));
            } else {
                var newFileName = uuid.v4() + path.extname(req.files.studyFile.name);
                var newPath = path.join("/home/parallels/Source/research-us/ImageRepository/" + d.studyId + "/");   // todo : don't hard code base path
                var newFullName = path.join(newPath, newFileName);
                d = EXTEND(d, {
                    newFileName: newFileName,
                    newPath: newPath,
                    newFullName: newFullName,
                    file: file
                });
                deferred.resolve(d)
            }
        });
        return deferred.promise;
    }).then(function (d) {
            var deferred = Q.defer();
            fs.exists(d.newPath, function (exists) {
                if (!exists) {
                    fs.mkdir(d.newPath, function (error) {
                        if (error) {
                            console.log("addStudy mkdir error: %s", error);
                            deferred.reject(new Error(error));
                        } else {
                            console.log("addStudy mkdir success: %s", d.newPath);
                            deferred.resolve(d);
                        }
                    });
                } else {
                    console.log("addStudy dir exists: %s", d.newPath);
                    deferred.resolve(d);
                }
            });
            return deferred.promise;
        }).then(function (d) {
            var deferred = Q.defer();
            fs.writeFile(d.newFullName, d.file, function (error) {
                if (error) {
                    console.log("addStudy writeFile error: %s", err);
                    deferred.reject(new Error(error));
                }
                else {
                    // write to the database
                    deferred.resolve(d);
                }
            });
            return deferred.promise;
        }).then(function (d) {
            var deferred = Q.defer();
            req.models.study.get(d.studyId, function (error, study) {
                if (error) {
                    console.log("addStudy select study error: %s", error);
                    deferred.reject(new Error(error));
                }
                else {
                    d = EXTEND(d, {
                        study: study
                    });
                    deferred.resolve(d);
                }
            });
            return deferred.promise;
        }).then(function (d) {
            console.log("normal %s", d.normal);
            console.log("report %s", d.report);
            var deferred = Q.defer();
            var newImage = {
                originalFileName: req.files.studyFile.name,
                uniqueFileName: d.newFileName,
                filePath: d.newPath,
                study_id: d.study.id,
                study_patient_id: d.study.patient_id,
                normal: d.normal,
                report: d.report
            };
            req.models.image.create(
                [
                    newImage
                ], function (error, items) {
                    if (error) {
                        console.log("addStudy insert image error: %s", err);
                        deferred.reject(new Error(error));
                    } else {
                        //res.json(true);
                        deferred.resolve(newImage);
                    }
                });
            return deferred.promise;
        }).then(function (newImage) {
            console.log("add study success");
            res.json(newImage);
        }).fail(function (error) {
            console.log("add study fail %s", error);
            res.json(false);
        }).done();
}

// PUT
exports.edit = function (req, res) {
    Q.fcall(function () {
        var d = {
            studyId: req.params.studyId,
            imageId: req.params.imageId,
            image: req.body
        };

        var deferred = Q.defer();
        req.models.image.get(d.imageId, function (error, image) {
            if (error) {
                console.log("edit image select image error: %s", error);
                deferred.reject(new Error(error));
            }
            else {
                d = EXTEND(d, {
                    dbRecord: image
                });
                deferred.resolve(d);
            }
        });
        return deferred.promise;
    }).then(function (d) {
            var deferred = Q.defer();
            console.log(d);
            d.dbRecord.save(d.image, function (error) {
                if (error) {
                    console.log("edit image save image error: %s", error);
                    deferred.reject(new Error(error));
                } else {
                    deferred.resolve(d);
                    res.json(true);
                }
            });
            return deferred.promise;
        }).fail(function (error) {
            console.log("edit image fail %s", error);
            res.json(false);
        }).done();
};

// DELETE
exports.delete = function (req, res) {

    Q.fcall(function () {
        var d = {
            studyId: req.params.studyId,
            imageId: req.params.imageId
        };

        var deferred = Q.defer();
        req.models.image.get(d.imageId, function (error, image) {
            if (error) {
                deferred.reject(new Error(error));
            } else {
                // delete image from database
                image.remove(function (error) {
                    if (error) {
                        res.json(false);
                    } else {
                        d = EXTEND(d, {
                            image: image
                        });
                        deferred.resolve(d);
                    }
                });
            }
        });
        return deferred.promise;
    }).then(function (d) {
            var deferred = Q.defer();
            // delete image from filesystem
            console.log("deleting %s", image.fullName());
            fs.unlink(image.fullName(), function (error) {
                if (error) {
                    deferred.reject(new Error(error));
                } else {
                    console.log('successfully deleted %s', image.fullName);
                    deferred.resolve(d);
                    res.json(true);
                }
            });
            return deferred.promise;
        }).fail(function (error) {
            console.log('delete image error %s', error);
            res.json(false);
        }).done();
};
