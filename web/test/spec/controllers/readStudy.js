'use strict';

describe('Controller: ReadstudyCtrl', function () {

  // load the controller's module
  beforeEach(module('iadssWebApp'));

  var ReadstudyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReadstudyCtrl = $controller('ReadstudyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
