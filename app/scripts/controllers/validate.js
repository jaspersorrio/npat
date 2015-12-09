'use strict';

/**
 * @ngdoc function
 * @name npatApp.controller:ValidateCtrl
 * @description
 * # ValidateCtrl
 * Controller of the npatApp
 */
angular.module('npatApp')
  .controller('ValidateCtrl', function ($cookies, $scope, shareStudent) {
    // console.log(shareStudent);
    $scope.stud = $cookies.getObject('stud');

    console.log($scope.stud);

    $scope.stud.stripedNumber = $scope.stud.number.substring(0, $scope.stud.number.length - 1);
  });
