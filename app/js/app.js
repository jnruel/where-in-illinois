(function () {

	'use strict';
	var test = "";

	require('angular');
	require('angular-animate');
	require('angular-loading-bar');
	require('angular-leaflet-directive');
	
	

	var mainController = require('./controllers/maincontroller');
	var mapController = require('./controllers/mapcontroller');

	var app = angular.module('whereInIllinois',['ngAnimate','angular-loading-bar', 'leaflet-directive']);


	app.controller('MainController', ['$scope', '$http', mainController]);
	app.controller('MapController', ['$scope', '$http', mapController]);



}());