'use strict';

describe('Controller: AddstudyCtrl', function () {

  // load the controller's module
  beforeEach(module('iadssWebApp'));

  var AddstudyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddstudyCtrl = $controller('AddstudyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
