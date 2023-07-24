angular.module('testAngularJS', ['ngResource'])
  .factory('UserService', ['$resource', function($resource) {
    return $resource('https://64bcf8112320b36433c74a46.mockapi.io/users/:id', { id: '@id' }, {
      update: {
        method: 'PUT'
      }
    });
  }]);
