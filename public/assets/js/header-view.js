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
            app.router.navigate('/', {trigger: true});
        }, function(error) {
            console.error(error);
        });
    },
    initialize: function () {

        $(this.el).html(_.template($('#tmpl-header').html(), {}));

        $('#hamburger').sidr();

    }
});
