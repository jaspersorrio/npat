'use strict';

describe('Controller: FundayCtrl', function () {

  // load the controller's module
  beforeEach(module('npatApp'));

  var FundayCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FundayCtrl = $controller('FundayCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FundayCtrl.awesomeThings.length).toBe(3);
  });
});
