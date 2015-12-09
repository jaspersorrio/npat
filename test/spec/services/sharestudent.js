'use strict';

describe('Service: shareStudent', function () {

  // load the service's module
  beforeEach(module('npatApp'));

  // instantiate service
  var shareStudent;
  beforeEach(inject(function (_shareStudent_) {
    shareStudent = _shareStudent_;
  }));

  it('should do something', function () {
    expect(!!shareStudent).toBe(true);
  });

});
