var myNinjaApp = angular.module('myNinjaApp',[/*'ui.bootstrap'*/'ngRoute', 'ngAnimate'])
	.directive('myEnter', function () {
	    return function (scope, element, attrs) {
	        element.bind("keydown keypress", function (event) {
	            if(event.which === 13) {
	                scope.$apply(function (){
	                    scope.$eval(attrs.myEnter);
	                });

	                event.preventDefault();
	            }
	        });
	    };
	});

myNinjaApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'NinjaController'
		})
		.when('/contact', {
			templateUrl: 'views/contact.html',
			controller: 'ContactController',
		})
		.when('/contact-success', {
			templateUrl: 'views/contact-success.html',
			controller: 'ContactController',
		})
		.when('/directory', {
			templateUrl: 'views/directory.html',
			controller: 'NinjaController',			
        })
        .otherwise({
			redirectTo: '/home'
		});		
}]);

myNinjaApp.directive('randomNinja', [function(){
	return {
		restricts: 'E',
		scope: {
			ninjas: '=ninjas',
			title: '=title'
		},
		templateUrl: 'views/random.html',
		transclude: true,
		replace: true,
		controller: function($scope) {
			$scope.random = Math.floor(Math.random() * 4);
		}
	}
}])

myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http) {
    $scope.init = function (myCard, myLang, varfromview) {        
        $scope.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.myCard = myCard;
        $scope.myLang = myLang;        
        $scope.myVarfromView = varfromview;        
        $scope.phoneRegex = /^(?:0[0-9]{2})*-([0-9]{3})*-([0-9]{4})$/;
        $scope.message = "hey you all";        
		$scope.getNinja();
	}
	
	$scope.getNinja = function() {
		$http.get('data/ninjas.json').then(function success(response){
            $scope.ninjas = response.data;
        }, function error(err){
			console.log('error>>', err);
		});
	}

	// Delete ninja on UI
	$scope.removeNinja = function(ninja) {
		var removedNinja = $scope.ninjas.indexOf(ninja);
		$scope.ninjas.splice(removedNinja, 1)
	}

	$scope.removeAll = function() {
		$scope.ninjas = [];
	}

	// Insert ninja on UI
	$scope.addNinja = function() {
		$scope.ninjas.push({
			name: $scope.newninja.name,
			belt: $scope.newninja.belt,
			rate: parseInt($scope.newninja.rate),
			available: true,
		});		
		$scope.newninja.name = "";
		$scope.newninja.belt = "";
		$scope.newninja.rate = "";
	}
}]
/*]*/
);

myNinjaApp.controller('ContactController', ['$scope', '$location', 
	function($scope, $location) {
	
	$scope.sendMessage = function() {
		$location.path('/contact-success');
	}
	
}])