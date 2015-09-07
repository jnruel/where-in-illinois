module.exports = function($scope, $http) {
	$scope.test = "Testing...1,2,3";
	$scope.result = "";
	$scope.locationData = [];


	$scope.lat = "0";
	$scope.lng = "0";
	$scope.accuracy = "0";
	$scope.error = "";


	console.log("successfully required!");

	var baseURL = "http://boundaries.tribapps.com/1.0/boundary/?";
	var jsonpFormat = "&format=jsonp&callback=JSON_CALLBACK";


	$scope.getLocation = function(){
		if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
        }
        else {
            $scope.error = "Geolocation is not supported by this browser.";
        }
	};

	$scope.showPosition = function(position){
		$scope.lat = position.coords.latitude;
		$scope.lng = position.coords.longitude;
		$scope.accuracy = position.coords.accuracy;
		console.log("hi");
		// $scope.apply();

		console.log("longitude: " + $scope.lat);
		console.log("latitude: " + $scope.lng);

		requestLocationInfo($scope.lat, $scope.lng);

	};


	$scope.showError = function(error){
		console.log("error");
		console.log(error);
	};

	function requestLocationInfo(latitude, longitude){
		// Simple GET request example :
		// 'http://boundaries.tribapps.com/1.0/boundary/?contains=42.02515940000001,-87.6902389&format=jsonp&callback=JSON_CALLBACK'
		$http.jsonp(baseURL + "contains=" + latitude + "," + longitude + jsonpFormat).
		  	then(function(response) {
		  		$scope.locationData = response.data.objects;
		  		console.log($scope.locationData);
		  		console.log($scope.locationData[0].name);

				// this callback will be called asynchronously
				// when the response is available
		  	}, function(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
		  	});
	}

	$scope.getLocation();
	

};