/**
 * Created by dor on 22/04/2016.
 */


app.controller("demoCtrl", ["$scope", "$rootScope",
    function ($scope, $rootScope) {
        $rootScope.user = {
            'age': 0,
            'gender': "",
            'education': ""
        };
        $rootScope.numberOftimeInQuiz = 1;

        $scope.changeRoute = function (url, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                window.location = url;
            } else {
                $location.path(url);
                $scope.$apply();
            }
        };
        //$rootScope.userInfo=$scope.user;
        $scope.ok = function () {
            $scope.changeRoute('#/instructions');
        }

    }]);


app.controller("endCtrl", ["$scope", "$rootScope", "$http",
    function ($scope, $rootScope, $http) {
        $scope.randString = function (x) {

            var text = "";
            var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < x; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;

        };


        $scope.init = function () {
            $rootScope.user["userId"] = $scope.randString(10);
            $scope.userCode = $rootScope.user["userId"];

            $http({
                method: 'POST',
                //url: 'http://localhost:5000/json',
                url: 'http://q2a.ise.bgu.ac.il:5000/json',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param($rootScope.user)
            }).success(function (data) {
                console.log("posted successfully");

            }).error(function (data) {
                console.error["error in posting"];

            })
        };
        $scope.init();




    }]);

app.controller("insCtrl", ["$scope", "$rootScope",
    function ($scope, $rootScope) {
        var start = new Date();
        $scope.changeRoute = function (url, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                window.location = url;
            } else {
                $location.path(url);
                $scope.$apply();
            }
        };

        //$scope.userInfo=$rootScope.userInfo;
        $scope.continue = function () {
            $rootScope.user["DurationInstruction"] = new Date - start;
            $rootScope.user["NumberOfTimeInQuiz"] = $rootScope.numberOftimeInQuiz
            $scope.changeRoute('#/quiz');
        }
    }]);


app.controller("consentCtrl", ["$scope", "$rootScope",
    function ($scope, $rootScope) {
        $scope.changeRoute = function (url, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                window.location = url;
            } else {
                $location.path(url);
                $scope.$apply();
            }
        };

        //$scope.userInfo=$rootScope.userInfo;
        $scope.continue = function () {
            $scope.changeRoute('#/demographics');
        }
    }]);

app.controller("quizCtrl", ["$scope", "$rootScope",
    function ($scope, $rootScope) {
        var start = new Date();
        $scope.changeRoute = function (url, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                window.location = url;
            } else {
                $location.path(url);
                $scope.$apply();
            }
        };
        $scope.q1 = "";
        $scope.q2 = "";
        $scope.q3 = "";
        $scope.q4 = "";
        $scope.q5 = "";
        //$scope.userInfo=$rootScope.userInfo;
        $scope.continue = function () {
            if ($scope.q1 == "ans3" && $scope.q2 == "ans1" && $scope.q3 == "ans4" && $scope.q4 == "ans1"&& $scope.q5 == "ans2") {
                $rootScope.user["DurationQuiz"] = new Date - start;
                $rootScope.user["numberOftimesInQuiz"] = $rootScope.numberOftimeInQuiz;
                $scope.changeRoute('#/train');
            }
            else {
                alert("You Failed The Quiz, Read The Instruction And Try Again");
                $rootScope.numberOftimeInQuiz += 1;
                $scope.changeRoute('#/instructions');

            }


        }
    }]);


app.controller("expCtrl", ["$scope", "$rootScope", '$timeout',
    function ($scope, $rootScope, $timeout) {

        //$scope.userInfo=$rootScope.userInfo;
        $scope.start = {
            up: 0,
            down: 0,
            right: 0,
            left: 0
        };
        $scope.middle = {
            up: 0,
            down: 0,
            right: 0,
            left: 0
        };
        $scope.end = {
            up: 0,
            down: 0,
            right: 0,
            left: 0
        };

        $scope.counter = 300;

        $scope.states = [
            ['startPic', 'middlePic', 'endPic'],
            ['middlePic', 'startPic', 'endPic'],
            ['middlePic', 'endPic', 'startPic'],
            ['startPic', 'endPic', 'middlePic'],
            ['endPic', 'startPic', 'middlePic'],
            ['endPic', 'middlePic', 'startPic'],
        ];

        $scope.init = function () {
            var i = Math.floor(Math.random() * 6);
            console.log("the index is:" + i);
            if (i < 0 || i > 6) {
                i = 5;
            }
            $scope.activeState = $scope.states[i];
            $scope.index = 0;
            $(".pic").hide();
            $("#" + $scope.activeState[$scope.index]).show();
            $scope.countdown();
        };


        $scope.countdown = function () {
            stopped = $timeout(function () {
                //console.log($scope.counter);
                if ($scope.counter === 0) {
                    //TODO: Alert
                    alert("Time is Up");
                    $timeout.cancel(stopped);
                    $scope.continue();
                }
                $scope.counter--;
                $scope.countdown();
            }, 1000);
        };

        $scope.init();

        var start = new Date();
        $scope.changeRoute = function (url, forceReload) {
            $scope = $scope || angular.element(document).scope();
            if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                window.location = url;
            } else {
                $location.path(url);
                $scope.$apply();
            }
        };

        $scope.continue = function () {
            if ($scope.index >= $scope.activeState.length - 1) {
                // move to end of expeirment
                $timeout.cancel(stopped);
                $rootScope.user['startUp'] =$scope.start.up;
                $rootScope.user['startDown'] =$scope.start.down;
                $rootScope.user['startLeft'] =$scope.start.left;
                $rootScope.user['startRight'] =$scope.start.right;
                $rootScope.user['startScore'] =$scope.start.right+$scope.start.left+$scope.start.up+$scope.start.down*3;

                $rootScope.user['middleUp'] =$scope.middle.up;
                $rootScope.user['middleDown'] =$scope.middle.down;
                $rootScope.user['middleLeft'] =$scope.middle.left;
                $rootScope.user['middleRight'] =$scope.middle.right;
                $rootScope.user['middleScore'] =$scope.middle.right+$scope.middle.left+$scope.middle.up+$scope.middle.down*3;


                $rootScope.user['endUp'] =$scope.end.up;
                $rootScope.user['endDown'] =$scope.end.down;
                $rootScope.user['endLeft'] =$scope.end.left;
                $rootScope.user['endRight'] =$scope.end.right;
                $rootScope.user['endScore'] =$scope.end.right+$scope.end.left+$scope.end.up+$scope.end.down*3;

                $scope.changeRoute('#/end');

            }
            else {
                $timeout.cancel(stopped);

                $scope.index += 1;
                $(".pic").hide();

                $("#" + $scope.activeState[$scope.index]).show();
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                $scope.counter = 300;

                $scope.countdown();


            }
        }
    }]);