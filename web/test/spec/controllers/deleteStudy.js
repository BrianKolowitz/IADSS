'use strict';

describe('Controller: DeletestudyCtrl', function () {

  // load the controller's module
  beforeEach(module('iadssWebApp'));

  var DeletestudyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeletestudyCtrl = $controller('DeletestudyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
