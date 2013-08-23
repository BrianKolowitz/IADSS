'use strict';

describe('Controller: EditstudyCtrl', function () {

  // load the controller's module
  beforeEach(module('iadssWebApp'));

  var EditstudyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditstudyCtrl = $controller('EditstudyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
