/*!
 * Project Name: Aprende a usar Git (http://github.com/bl0z/Aprende_git_app)
 * Filename: script.js
 * Author: Jose Tirado
 * Licensed under MIT (https://github.com/bl0z/Aprende_git_app/blob/master/LICENSE)
 * This file contains the script for AngularJS.
 */
'use strict';
var app = angular.module('git-app', ['ngRoute']);
app.config(function($routeProvider){
      $routeProvider
          .when('/01', { templateUrl: 'partials/1.html' })
          .when('/02', { templateUrl: 'partials/2.html' })
          .when('/03', { templateUrl: 'partials/3.html' })
          .when('/04', { templateUrl: 'partials/4.html' })
          .when('/05', { templateUrl: 'partials/5.html' })
          .when('/06', { templateUrl: 'partials/6.html' })
          .when('/07', { templateUrl: 'partials/7.html' })
          .when('/08', { templateUrl: 'partials/8.html' })
          .when('/09', { templateUrl: 'partials/9.html' })
          .when('/10', { templateUrl: 'partials/10.html' })
          .when('/11', { templateUrl: 'partials/11.html' })
          .when('/12', { templateUrl: 'partials/12.html' })
          .when('/13', { templateUrl: 'partials/13.html' })
          .when('/14', { templateUrl: 'partials/14.html' })
          .when('/15', { templateUrl: 'partials/15.html' })
          .when('/16', { templateUrl: 'partials/16.html' })
          .when('/17', { templateUrl: 'partials/17.html' })
          .when('/18', { templateUrl: 'partials/18.html' })
          .when('/19', { templateUrl: 'partials/19.html' })
          .when('/20', { templateUrl: 'partials/20.html' })
          .when('/21', { templateUrl: 'partials/21.html' })
          .when('/22', { templateUrl: 'partials/22.html' })
          .when('/23', { templateUrl: 'partials/23.html' })
          .when('/24', { templateUrl: 'partials/24.html' })
          .when('/25', { templateUrl: 'partials/25.html' })
          .when('/26', { templateUrl: 'partials/26.html' })
          .otherwise({redirectTo: '/01'});
});
app.controller('cfgController',function($scope){ /* Here you can handle controller for specific route as well. */ });