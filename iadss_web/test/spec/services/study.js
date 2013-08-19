'use strict';

describe('Service: study', function () {

  // load the service's module
  beforeEach(module('iadssWebApp'));

  // instantiate service
  var study;
  beforeEach(inject(function(_study_) {
    study = _study_;
  }));

  it('should do something', function () {
    expect(!!study).toBe(true);
  });

});
