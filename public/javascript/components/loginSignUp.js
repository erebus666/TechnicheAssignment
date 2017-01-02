var loginSignup = angular.module('loginSignup', ['ngStorage']);

loginSignup.controller('register', function ($scope, $http, $location) {
    $scope.newUser = {};

    $scope.register = function () {
        console.log($scope.newUser);
        $http.post('/register', $scope.newUser).then(function (data) {
            console.log(data);
            $("a[href='#login']")[0].click();
        }, function (err) {
            console.log(err);
        });
    }
});

loginSignup.controller('login', function ($scope, $http, $window, $localStorage) {
    $scope.loginDetails = {};

    $scope.signIn = function () {
        console.log($scope.loginDetails)
        $http.post('/login', {
            username: $scope.loginDetails.username,
            password: $scope.loginDetails.password
        }).then(function (data) {
            console.log('logged in');
            console.log(data.data);
            // set the user in local storage;
            $localStorage.$default({
                user: data.data.user
            });
            $window.location.href = data.data.url;
        }, function (err) {
            console.log(err);
            new PNotify({
                title: "Notification",
                type: "info",
                text: "Username or password is incorrect",
                delay: 3000,
                nonblock: {
                    nonblock: true
                },
                animate: {
                    animate: true,
                    in_class: 'fadeIn',
                    out_class: 'fadeOut'
                },
                styling: 'bootstrap3',
                hide: true,
            });
        });
    }
});