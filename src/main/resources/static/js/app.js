var app = angular.module('app', ['ngRoute','ngResource']);
app.config(function($routeProvider){
    $routeProvider
        .when('/contacts',{
            templateUrl: '/views/contacts.html',
            controller: 'UserCRUDCtrl'
        })
        .otherwise(
            { redirectTo: '/'}
        );
});