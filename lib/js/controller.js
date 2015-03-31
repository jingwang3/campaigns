"use strict";

angular.module('campaignApp', [])
.controller('LocationsController', ['$scope', '$http', '$templateCache',
  function($scope, $http, $templateCache) {

  	$scope.filterExp = {city: "fredericksburg"};
    $http({method: 'GET', url: 'data/cardi-locations.json', cache: $templateCache}).
        success(function(data, status) {
          $scope.locations = data;
    }).
      error(function(data, status) {

    });

    $scope.loadDocs = function(exp){
    	$scope.filterExp.city=exp;
    }
  }]);