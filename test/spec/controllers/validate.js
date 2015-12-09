'use strict';

describe('Controller: ValidateCtrl', function () {

  // load the controller's module
  beforeEach(module('npatApp'));

  var ValidateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ValidateCtrl = $controller('ValidateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ValidateCtrl.awesomeThings.length).toBe(3);
  });
});
