angular.module('app').controller('mvMainCtrl', function($scope) {
    $scope.courses = [
        {name: 'MongoDB basics', featured: true, published: new Date('1/1/2014')},
        {name: 'Getting Started with Express', featured: true, published: new Date('1/1/2014')},
        {name: 'Angular Single Page Apps', featured: true, published: new Date('1/1/2014')},
        {name: 'NodeJS server side coding basics', featured: true, published: new Date('1/1/2014')}
    ]
});