(function () {

	'use strict';
	var test = "";

	require('angular');
	// require('angular-sanitize');
	

	var mainController = require('./controllers/maincontroller');

	var app = angular.module('whereInIllinois',[]);//,['ngSanitize']);

	app.config(['$httpProvider', function($httpProvider) {
	        $httpProvider.defaults.useXDomain = true;
	        delete $httpProvider.defaults.headers.common['X-Requested-With'];
	    }
	]);

	app.controller('MainController', ['$scope', '$http', mainController]);




}());