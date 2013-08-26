'use strict';

describe('Directive: iadssTabBar', function () {
  beforeEach(module('iadssWebApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<iadss-side-bar></iadss-side-bar>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the iadssTabBar directive');
  }));
});
