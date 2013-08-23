var orm = require('orm');
var pw = require('./passwords');

var iadss_map = orm.express(pw.passwords.database_connection, {
            define: function (db, models) {
                db.settings.set('instance.cache', false);

                models.user = db.define("user", {
                    userName: String,
                    password: String,
                    salt: String
                }, {
                    autoFetch: true
                });

                models.patient = db.define("patient", {
                    id: Number,
                    medicalRecordNumber: String,
                    name: String
                }, {
                    autoFetch: true
                    /*, methods: {
                     fullName: function () {
                     return this.name;
                     }
                     },
                     validations: {
                     age: orm.validators.rangeNumber(18, undefined, "under-age")
                     }*/
                });

                models.study = db.define("study",
                    {
                        id: Number,
                        accessionNumber: String,
                        patient_id: Number
                    },
                    {
                        autoFetch: true
                    });

                models.image = db.define("image",
                    {
                        id: Number,
                        originalFileName: String,
                        uniqueFileName: String,
                        filePath: String,
                        study_id: Number,
                        study_patient_id: Number,
                        normal: Boolean,
                        report: String
                    },
                    {
                        autoFetch: true,
                        methods: {
//                        isNormal: function() {
//                            return this.normal == 1 ? true : false;
//                        },
                            fullName: function() {
                                return this.filePath + this.uniqueFileName;
                            }
                        }
                    });

                models.image.hasOne("study", models.study,
                    {
                        required: true,
                        reverse: "images"
                    });

                models.study.hasOne("patient", models.patient,
                    {
                        required: true,
                        reverse: "studies"});
            }
    });
exports.iadss_map = iadss_map;