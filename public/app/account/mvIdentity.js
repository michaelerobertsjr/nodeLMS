// store the fact we are logged in and the current user
angular.module('app').factory('mvIdentity', function($window, mvUser){
    var currentUser;
    if(!!$window.bootstrappedUserObject) {
        currentUser = new mvUser;
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        // Method to be able to identify if user is logged in
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        // check user exists and has the role passed
        isAuthorized: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }

})