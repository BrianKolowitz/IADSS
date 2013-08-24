'use strict';

describe('Directive: addImage', function () {
  beforeEach(module('iadssWebApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<add-image></add-image>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the addImage directive');
  }));
});
