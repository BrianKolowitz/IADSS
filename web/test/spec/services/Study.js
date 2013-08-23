'use strict';

describe('Service: Study', function () {

  // load the service's module
  beforeEach(module('iadssWebApp'));

  // instantiate service
  var Study;
  beforeEach(inject(function(_Study_) {
    Study = _Study_;
  }));

  it('should do something', function () {
    expect(!!Study).toBe(true);
  });

});
