// Authenticate user
angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser){
    return {
        authenticateUser: function(username, password) {
            var diffd = $q.defer();
            $http.post('/login', {username:username, password:password}).then(function(response) {
                if(response.data.success){
                    var user = new mvUser();
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = user;
                    diffd.resolve(true);
                } else {
                   diffd.resolve(false);
                }
            });
            return diffd.promise;
        },
        logoutUser: function() {
            var diffd = $q.defer();
            $http.post('/logout', {logout:true}).then(function() {
                mvIdentity.currentUser = undefined;
                diffd.resolve();
            });
            return diffd.promise;
        },
        authorizeCurrentUserForRoute: function(role) {
            if(mvIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }
});