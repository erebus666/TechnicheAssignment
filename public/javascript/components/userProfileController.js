var userController = angular.module('userController', ['ngStorage']);

userController.controller('showUserName', function ($scope, $localStorage) {
    $scope.username = $localStorage.user.NAME;
});

userController.controller('getAvailableBooks', function ($scope, $http, $window, $localStorage, sharedBookData) {

    sharedBookData.initializeBookData.then(function (data) {
        console.log(data.data);
        $scope.bookList = data.data;
        var DataTable;
        $scope.selectedBooks = [];
    }).then(function () {
        $('#bookDetailsContainer').css('display', 'block');
        setTimeout(function () {
            var dataTable = $('#datatable-browse');
            DataTable = dataTable.DataTable({
                "processing": true,
                'order': [[1, 'asc']],
                'columnDefs': [
                    {
                        orderable: false,
                        targets: [0]
                    }
                 ],
                'rowCallback': function (row, data) {
                    if ($.inArray(data.DT_RowId, $scope.selectedBooks) !== -1) {
                        $(row).addClass('selected');
                    }
                },
                'select': {
                    style: 'multi'
                }
            });
        }, 1000);
    });

    $scope.refreshDataTable = function () {
        $window.location.href = '/userProfile';
    };

    $('#datatable-browse tbody').on('click', 'tr', function () {
        console.log(DataTable.row(this).data()[0]);
        // add a book to the list if not already added else remove it from the list
        if ($.inArray(DataTable.row(this).data()[0], $scope.selectedBooks) === -1) {
            $scope.selectedBooks.push(DataTable.row(this).data()[0]);
        } else {
            $scope.selectedBooks.splice($scope.selectedBooks.indexOf(DataTable.row(this).data()[0]), 1);
        }
        console.log($scope.selectedBooks);

        $(this).toggleClass('selected');

    });

    $scope.submitIssueRequest = function () {
        console.log($scope.selectedBooks);
        console.log($localStorage.user);
        $http.post('/submitIssueRequest', {
            booklist: $scope.selectedBooks,
            userDetails: $localStorage.user
        }).then(function (data) {
            console.log(data);
            new PNotify({
                title: "Notification",
                type: "info",
                text: "Issue request sent to Admin!",
                delay: 2000,
                nonblock: {
                    nonblock: true
                },
                animate: {
                    animate: true,
                    in_class: 'fadeIn',
                    out_class: 'fadeOut'
                },
                addclass: 'dark',
                styling: 'bootstrap3',
                hide: true,
            });
            setTimeout(function () {
                $window.location.href = '/userProfile';
            }, 2000);
        }, function (err) {
            console.log(err);
        });
    };

});

userController.controller('viewIssues', function ($scope, $http, $window, $localStorage, sharedBookData) {
    sharedBookData.getIssuesData.then(function (data) {
        console.log(data.data);
        $scope.issueList = data.data;
        var DataTableIssue;
    }).then(function () {
        $('#issueDetailsContainer').css('display', 'block');
        setTimeout(function () {
            var dataTable = $('#datatable-issues');
            DataTableIssue = dataTable.DataTable({
                "processing": true,
                'order': [[1, 'asc']],
                'columnDefs': [
                    {
                        orderable: false,
                        targets: [0]
                    }
                 ]
            });
        }, 1000);
    });
});


userController.controller('returnBooks', function ($scope, $http, $window, $localStorage, sharedBookData) {
     sharedBookData.getBooksToReturn.then(function (data) {
        console.log(data.data);
        $scope.issueListToReturn = data.data;
        var DataTableReturn;
        $scope.selectedIssues = [];
    }).then(function () {
        $('#returnBookDetailsContainer').css('display', 'block');
        setTimeout(function () {
            var dataTable = $('#datatable-return');
            DataTableReturn = dataTable.DataTable({
                "processing": true,
                'order': [[1, 'asc']],
                'columnDefs': [
                    {
                        orderable: false,
                        targets: [0]
                    }
                 ],
                'rowCallback': function (row, data) {
                    if ($.inArray(data.DT_RowId, $scope.selectedBooks) !== -1) {
                        $(row).addClass('selected');
                    }
                },
                'select': {
                    style: 'multi'
                }
            });
        }, 1000);
    });
    
    $('#datatable-return tbody').on('click', 'tr', function () {
        console.log(DataTableReturn.row(this).data()[1]);
        // add a book to the list if not already added else remove it from the list
        if ($.inArray(DataTableReturn.row(this).data()[1], $scope.selectedIssues) === -1) {
            $scope.selectedIssues.push(DataTableReturn.row(this).data()[1]);
        } else {
            $scope.selectedIssues.splice($scope.selectedIssues.indexOf(DataTableReturn.row(this).data()[1]), 1);
        }
        console.log($scope.selectedIssues);

        $(this).toggleClass('selected');

    });
    
    $scope.submitForReturn = function(){
        console.log($scope.selectedIssues);
        $http.post('/submitForReturn', {
            returnlist: $scope.selectedIssues,
            userDetails: $localStorage.user
        }).then(function (data) {
            console.log(data);
            new PNotify({
                title: "Notification",
                type: "info",
                text: "Return request sent to Admin!",
                delay: 2000,
                nonblock: {
                    nonblock: true
                },
                animate: {
                    animate: true,
                    in_class: 'fadeIn',
                    out_class: 'fadeOut'
                },
                addclass: 'dark',
                styling: 'bootstrap3',
                hide: true,
            });
            setTimeout(function () {
                $window.location.href = '/userProfile';
            }, 2000);
        }, function (err) {
            console.log(err);
        });
    }
});




userController.factory('sharedBookData', function ($http, $localStorage) {
    return {
        initializeBookData: $http.post('/getAvailableBookList'),
        getIssuesData: $http.post('/getIssueList', {userDetails: $localStorage.user}),
        getBooksToReturn: $http.post('/getBooksToReturn', {userDetails: $localStorage.user})
    }
});