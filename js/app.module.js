/**
 * Created by dor on 22/04/2016.
 */


var app = angular.module('planner', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/demographics', {
            templateUrl: 'parcitals/demographics.html',
            controller: 'demoCtrl'
        }).when('/instructions', {
            templateUrl: 'parcitals/Instructions.html',
            controller: 'insCtrl'
        }).when('/exp', {
            templateUrl: 'parcitals/experiment.html',
            controller: 'expCtrl'
        }).when('/train', {
            templateUrl: 'parcitals/trainning.html',
            controller: 'trainCtrl'
        }).when('/quiz', {
            templateUrl: 'parcitals/quiz.html',
            controller: 'quizCtrl'
        }).when('/end', {
            templateUrl: 'parcitals/end.html',
            controller: 'endCtrl'
        }).when('/consent', {
            templateUrl: 'parcitals/consent.html',
            controller: 'consentCtrl'
        })
            .when('/calibration', {
                templateUrl: 'parcitals/calibration.html',
                controller: 'calCtrl'
            }).when('/calibrationResult', {
                templateUrl: 'parcitals/calibrationResults.html',
                controller: 'calRasCtrl'
            })
            .when('/calibration2', {
                templateUrl: 'parcitals/calibration2.html',
                controller: 'cal2Ctrl'
            }).when('/calibrationResult2', {
                templateUrl: 'parcitals/calibrationResults2.html',
                controller: 'cal2RasCtrl'
        }).when('/payments', {
                templateUrl: 'parcitals/payments.html',
                controller: 'payCtrl'
            })
            .otherwise({
            redirectTo: '/'

        });
    }]);
