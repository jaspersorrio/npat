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
    'ngMaterial',
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');

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
      .when('/funday/2', {
        templateUrl: 'views/funday/2.html',
        controller: 'Funday2Ctrl',
        controllerAs: 'funday/2'
      })
      .when('/validate', {
        templateUrl: 'views/validate.html',
        controller: 'ValidateCtrl',
        controllerAs: 'validate'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
