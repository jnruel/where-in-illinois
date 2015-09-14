module.exports = function($scope, $http) {
	$scope.locationData = [];


	$scope.lat = "0";
	$scope.lng = "0";
	$scope.accuracy = "0";
	$scope.error = "";


	console.log("successfully required!");

	var baseURL = "http://boundaries.tribapps.com/1.0/boundary/?";
	var boundarySetBaseURL = "http://boundaries.tribapps.com/1.0/boundary-set/?";
	var jsonpFormat = "&format=jsonp&callback=JSON_CALLBACK";

	angular.extend($scope, {
		center: {
			lat: 41.8726287,
			lng: -87.6242065,
			zoom: 11
		}
	});


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

		$scope.center.lat = $scope.lat;
		$scope.center.lng = $scope.lng;
		$scope.center.zoom = 12;

		console.log("longitude: " + $scope.lat);
		console.log("latitude: " + $scope.lng);


		requestLocationInfo($scope.lat, $scope.lng);



	};


	$scope.showError = function(error){
		console.log("error");
		console.log(error);
	};


	function constructURL(){

	}

	function requestLocationInfo(latitude, longitude){
		$http.jsonp(baseURL + "contains=" + latitude + "," + longitude + jsonpFormat).
			then(function(response) {
				$scope.locationData = response.data.objects;
				console.log($scope.locationData);
				console.log($scope.locationData[0].name);


				angular.extend($scope,{
					geojson: {
						data: $scope.locationData[0].simple_shape,
						style: {
							fillColor: "green",
							weight: 2,
							opacity: 1,
							color: 'white',
							dashArray: '3',
							fillOpacity: 0.7
						}

					}

				});

				// this callback will be called asynchronously
				// when the response is available
			}, function(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	}


	$scope.getBoundarySet = function(set){
		// set = "/" + set;
		delete $http.defaults.headers.common['X-Requested-With'];
		$http.get("http://boundaries.tribapps.com/1.0/boundary-set/census-places/").
			then(function(response) {
				console.log(response);
				// $scope.locationData = response.data.objects;
				// console.log($scope.locationData);
				// console.log($scope.locationData[0].name);


				// angular.extend($scope,{
				// 	geojson: {
				// 		data: $scope.locationData[0].simple_shape,
				// 		style: {
				// 			fillColor: "green",
				// 			weight: 2,
				// 			opacity: 1,
				// 			color: 'white',
				// 			dashArray: '3',
				// 			fillOpacity: 0.7
				// 		}

				// 	}

				// });

				// this callback will be called asynchronously
				// when the response is available
			}, function(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	};

	$scope.getLocation();	
	// $scope.getBoundarySet("census-places");
	

};