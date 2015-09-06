module.exports = function($scope, $http) {
	$scope.test = "Testing...1,2,3";
	$scope.result = "";
	$scope.locationData = [];

	console.log("successfully required!");


	// Simple GET request example :
	$http.jsonp('http://boundaries.tribapps.com/1.0/boundary/?contains=42.02515940000001,-87.6902389&format=jsonp&callback=JSON_CALLBACK').
	  	then(function(response) {
	  		$scope.locationData = response;
	  		console.log($scope.locationData);
	  		console.log($scope.locationData.data.objects[0].name);

			// this callback will be called asynchronously
			// when the response is available
	  	}, function(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
	  	});

};