'use strict';

describe('Controller: IadsstabbarCtrl', function () {

  // load the controller's module
  beforeEach(module('iadssWebApp'));

  var IadsstabbarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IadsstabbarCtrl = $controller('IadsstabbarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
