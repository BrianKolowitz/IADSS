'use strict';

describe('Directive: iadssNavBar', function () {
  beforeEach(module('iadssWebApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<iadss-nav-bar></iadss-nav-bar>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the iadssNavBar directive');
  }));
});
