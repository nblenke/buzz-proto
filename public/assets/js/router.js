app.router = Backbone.Router.extend({
    el : $('main'),
    routes: {
        // '': 'home',
        // '!/': 'home',
        '!/event-list/': function () {
            app.preRoute('event-list', this.el);
            new app.eventListView({ el: this.el });
        },
        '!/event-detail/:key': function (key) {
            app.preRoute('event-detail', this.el);
            new app.eventDetailView({ el: this.el, key: key });
        },
        '!/event-create/': function () {
            app.preRoute('event-create', this.el);
            new app.eventCreateView({ el: this.el });
        },
        '!/account/': function () {
            app.preRoute('account', this.el);
            new app.accountView({ el: this.el });
        },
    },
    initialize: function () {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                Backbone.history.start();
                new app.headerView();
                new app.footerView();

                // TODO: hook up email verification
                // if (!user.emailVerified)

                // firebase.auth().currentUser.sendEmailVerification()

                var database = firebase.database();
                var currentUser = firebase.auth().currentUser;

                // add user to database of users
                // TODO: show add photo wizard if no photo
                database.ref('users/' + currentUser.uid).update({
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                });


            } else {
                window.location = '/';
            }
        }, function(error) {
            console.error(error);
        });
    },
    // home: function () {
    //     app.preRoute(this.el);
    //     new app.homeView({ el: this.el });
    // },
});

$(function () {
    app.router = new app.router();
});
