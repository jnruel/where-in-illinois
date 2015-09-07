(function () {

	'use strict';
	var test = "";

	require('angular');
	require('angular-animate');
	require('angular-loading-bar');
	
	

	var mainController = require('./controllers/maincontroller');

	var app = angular.module('whereInIllinois',['ngAnimate','angular-loading-bar']);

	// app.config(['$httpProvider', function($httpProvider) {
	//         $httpProvider.defaults.useXDomain = true;
	//         delete $httpProvider.defaults.headers.common['X-Requested-With'];
	//     }
	// ]);

	app.controller('MainController', ['$scope', '$http', mainController]);




}());