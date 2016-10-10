app.router = Backbone.Router.extend({
    el : $('main'),
    routes: {
        '': 'home',
        '!/': 'home',
        '!/section/:section/': 'section',
        '!/signin/': 'signin',
        '!/event-list/': function (section) {
            app.preRoute(this.el);
            new app.eventListView({ el: this.el });
        },
        '!/event-detail/': function (section) {
            app.preRoute(this.el);
            new app.eventDetailView({ el: this.el });
        },
        '!/event-create/': function (section) {
            app.preRoute(this.el);
            new app.eventCreateView({ el: this.el });
        },
    },
    initialize: function () {
        Backbone.history.start();
        new app.headerView(),
        new app.footerView();
    },
    home: function () {
        app.preRoute(this.el);
        new app.homeView({ el: this.el });
    },
});

$(function () {
    app.router = new app.router();
});
