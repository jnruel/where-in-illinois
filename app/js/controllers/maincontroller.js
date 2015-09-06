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

	};


	$scope.showError = function(error){
		console.log("error");
		console.log(error);
	};



	// function getLocation() {
	// 	console.log("getting location");
	//     if (navigator.geolocation) {
	//     	console.log("location get?");
	//         navigator.geolocation.getCurrentPosition(function(position){
	//         	console.log("location got");
	//         });
	        
	//     } else {
	//         console.log("Geolocation is not supported by this browser.");
	//     }
	// }
	
	// function showPosition(position) {
		
	//    	console.log("longitude: " + position.coords.longitude);
	//    	console.log("latitude: " + position.coords.latitude);
	//    	requestLocationInfo();
	// }


	function requestLocationInfo(){
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
	}

	$scope.getLocation();
	

};