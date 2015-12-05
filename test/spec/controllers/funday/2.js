'use strict';

describe('Controller: Funday2Ctrl', function () {

  // load the controller's module
  beforeEach(module('npatApp'));

  var Funday2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Funday2Ctrl = $controller('Funday2Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Funday2Ctrl.awesomeThings.length).toBe(3);
  });
});
