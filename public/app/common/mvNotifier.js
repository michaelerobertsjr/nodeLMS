// A service for toastr lib
angular.module('app').value('mvToastr', toastr);

// A notifier service used to display login messages
angular.module('app').factory('mvNotifier', function(mvToastr) {
    return {
        notify:function(msg) {
            mvToastr.success(msg);
            console.log(msg);
        }
    }

})