angular.module('campaignApp', [])
.controller('LocationsController', ['$scope', '$http', '$templateCache',
  function($scope, $http, $templateCache) {

      $http({method: 'GET', url: 'data/cardi-locations.json', cache: $templateCache}).
        success(function(data, status) {
          $scope.locations = data;
          $scope.loc = $scope.locations[3];
          console.log($scope.loc);
        }).
        error(function(data, status) {

      });

    $scope.loadDocs = function(v){
    	$scope.loc = $scope.locations[v];
    }
  }]);