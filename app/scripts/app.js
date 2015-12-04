'use strict';

/**
 * @ngdoc overview
 * @name npatApp
 * @description
 * # npatApp
 *
 * Main module of the application.
 */
angular
  .module('npatApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/funday', {
        templateUrl: 'views/funday.html',
        controller: 'FundayCtrl',
        controllerAs: 'funday'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
