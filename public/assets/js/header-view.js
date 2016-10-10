window.app = {
    preRoute: function (el) {
        el.unbind().empty();
    },
    config: {
        apiKey: "AIzaSyBAJ0hAVxv9FQVGTOf7LG5cjVuoaiqpT8s",
        authDomain: "buzz-proto.firebaseapp.com",
        databaseURL: "https://buzz-proto.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "471035708539"
    }
};

window.firebase.initializeApp(app.config);

app.headerView = Backbone.View.extend({
    el: $('header'),
    events: {
        'click #signout' : 'signout',
        'click #sidr a': 'menuItem'
    },
    menuItem: function () {
        $.sidr('close', 'sidr');
    },
    signout: function (ev) {
        ev.preventDefault();

        firebase.auth().signOut().then(function() {
            app.router.navigate('!/signin/', {trigger: true});
        }, function(error) {
            console.error(error);
        });
    },
    initialize: function () {
        var signedIn = false;
        var that = this;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                signedIn = true;
            } else {
                signedIn = false;
            }

            $(that.el).html(_.template($('#tmpl-header').html(), {
                signedIn: signedIn
            }));

            $('#hamburger').sidr();

        }, function(error) {
            console.error(error);
        });
    }
});
