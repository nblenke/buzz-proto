
        var initApp = function() {
            firebase.auth().onAuthStateChanged(function(user) {
                // User is signed in.
                if (user) {
                    // user.getToken().then(function(accessToken) {
                    //     console.log(accessToken)
                    // });
                } else {
                    // window.location = '/signin/';
                    // app.router.navigate('!/', {trigger: true});
                }
            }, function(error) {
                console.log(error);
            });
        };

        window.addEventListener('load', function() {
          initApp();

        });
