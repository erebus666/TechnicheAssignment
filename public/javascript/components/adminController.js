var adminController = angular.module('adminController', []);

adminController.controller('populateBookList', function ($scope, $http, $window, sharedBookData) {

    sharedBookData.initializeBookData.then(function (data) {
        console.log(data.data);
        $scope.bookList = data.data;
    }).then(function () {
        $('#bookDetailsContainer').css('display', 'block');
        setTimeout(function () {
            $('#datatable').DataTable();
        }, 1000);
    });

    $scope.refreshDataTable = function () {
        $window.location.href = '/profile';
    };

});


adminController.controller('addBook', function ($scope, $http, $window) {
    $scope.newBook = {};

    $scope.addNewBook = function () {
        $http.post('/addBook', $scope.newBook).then(function (data) {
            console.log(data);
            new PNotify({
                title: "Notification",
                type: "info",
                text: "Book added successfully!",
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
        }, function (err) {
            console.log(err);
        });
    }

    $scope.refreshPage = function () {
        $window.location.href = '/profile';
    };
});

adminController.controller('deleteBook', function ($scope, $http, $window, sharedBookData) {

    sharedBookData.getBookListToDelete.then(function (data) {
        console.log(data.data);
        $scope.bookList = data.data;
        var DataTable;
        $scope.selectedBooks = [];
    }).then(function () {
        $('#deleteBookDetailsContainer').css('display', 'block');
        setTimeout(function () {
            var dataTable = $('#datatable-checkbox');
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

    $('#datatable-checkbox tbody').on('click', 'tr', function () {
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

    $scope.deleteBooks = function () {
        console.log($scope.selectedBooks);
        $http.post('/deleteSelectedBooks', $scope.selectedBooks).then(function (data) {
            console.log(data);
            new PNotify({
                title: "Notification",
                type: "info",
                text: "Book removed successfully!",
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
                $window.location.href = '/profile';
            }, 2000);
        }, function (err) {
            console.log(err);
        });
    };
});

adminController.controller('getIssueRequests', function ($scope, $http, $window, sharedBookData) {
    sharedBookData.getIssueList.then(function (data) {
        console.log(data.data);
        $scope.issueList = data.data;
        $scope.approveNameList = [];
        $scope.approveDateList = [];
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

    $('#datatable-issues tbody').on('click', 'tr', function () {
        console.log(DataTable.row(this).data()[1]);
        // add a book to the list if not already added else remove it from the list
        if ($.inArray(DataTableIssue.row(this).data()[1], $scope.approveDateList) === -1 || $.inArray(DataTableIssue.row(this).data()[3], $scope.approveNameList) === -1) {
            $scope.approveDateList.push(DataTableIssue.row(this).data()[1]);
            $scope.approveNameList.push(DataTableIssue.row(this).data()[3]);
        } else {
            $scope.approveDateList.splice($scope.approveDateList.indexOf(DataTableIssue.row(this).data()[1]), 1);
            $scope.approveNameList.splice($scope.approveNameList.indexOf(DataTableIssue.row(this).data()[3]), 1);
        }
        console.log($scope.approveDateList);
        console.log($scope.approveNameList);

        $(this).toggleClass('selected');
    });

    $scope.approveRequests = function () {
        console.log($scope.approveList);
        $http.post('/approveIssues', {
            nameList: $scope.approveNameList,
            dateList: $scope.approveDateList
        }).then(function (data) {
            console.log(data);
            new PNotify({
                title: "Notification",
                type: "info",
                text: "Issue Requests Approved!",
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
                $window.location.href = '/profile';
            }, 2000);
        }, function (err) {
            console.log(err);
        });

    };
});

adminController.controller('getReturnRequests', function ($scope, $http, $window, sharedBookData) {
    sharedBookData.getReturnList.then(function (data) {
        console.log(data.data);
        $scope.returnList = data.data;
        $scope.returnDateListAdmin = [];
        var DataTableReturn;
    }).then(function () {
        $('#returnDetailsContainer').css('display', 'block');
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
        if ($.inArray(DataTableReturn.row(this).data()[1], $scope.returnDateListAdmin) === -1) {
            $scope.returnDateListAdmin.push(DataTableReturn.row(this).data()[1]);
        } else {
            $scope.returnDateListAdmin.splice($scope.returnDateListAdmin.indexOf(DataTableReturn.row(this).data()[1]), 1);
        }
        console.log($scope.returnDateListAdmin);

        $(this).toggleClass('selected');

    });

    $scope.approveReturns = function () {
        $http.post('/approveReturns', $scope.returnDateListAdmin).then(function (data) {
            console.log(data);
            new PNotify({
                title: "Notification",
                type: "info",
                text: "Return request approved!",
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
                $window.location.href = '/profile';
            }, 2000);
        }, function (err) {
            console.log(err);
        });
    }
});

adminController.factory('sharedBookData', function ($http) {
    return {
        initializeBookData: $http.post('/getBookList'),
        getBookListToDelete: $http.post('/getBookListForDeletion'),
        getIssueList: $http.post('/getIssueListAdmin'),
        getReturnList: $http.post('/getReturnListAdmin')
    }
});