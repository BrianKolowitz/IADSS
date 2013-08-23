'use strict';

describe('Directive: iadssImageList', function () {
  beforeEach(module('iadssWebApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<iadss-image-list></iadss-image-list>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the iadssImageList directive');
  }));
});
