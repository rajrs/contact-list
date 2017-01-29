var myapp = angular.module("myapp", []);
myapp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    //console.log(' in ctrl')
       
    var refresh = function() {
        $http({
            method: 'GET',
            url: '/contactlist'
        }).then(function(success) {
            $scope.contactlist = success.data;

        });
        $scope.contact = null;
    }
    refresh();
    $scope.addContact = function() {
        // console.log($scope.contact);
        $http({
                url: '/contactlist',
                method: "POST",
                data: $scope.contact
            })
            .then(function(response) {
                // success
                console.log("send correctly");
                refresh();
            });
    }
    $scope.remove = function(id) {
        console.log(id);
        $http({
                method: 'DELETE',
                url: '/contactlist/' + id
            })
            .then(function(response) {

                refresh();
            }, function(rejection) {
                console.log(rejection.data);
            });
    }

    $scope.edit = function(id) {
        //console.log(id);
        $http({
                method: 'GET',
                url: '/contactlist/' + id
            })
            .then(function(response) {
                //console.log("response back from mongo db") ;
                //console.log(response);
                $scope.contact = response.data;

            }, function(rejection) {
                console.log(rejection.data);
            });
    }
    $scope.update =function () {
        //console.log($scope.contact._id);
        $http({
                method: 'PUT',
                url: '/contactlist/' + $scope.contact._id,
                data: $scope.contact
            })
            .then(function(response) {
               // console.log("response back from mongo db") ;
                //console.log(response);
                //$scope.contact = response.data;
                 refresh();

            }, function(rejection) {
                console.log(rejection.data);
            });
    }
    $scope.deselect = function() {
  $scope.contact = null;
}
}]);
