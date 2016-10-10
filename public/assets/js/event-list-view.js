app.eventListView = Backbone.View.extend({
    initialize: function (options) {
        var that = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(user);

                $(that.el).html(_.template($('#tmpl-event-list').html(), {
                    data: {}
                }));

                var database = firebase.database();

                console.log(utils.guid())



            } else {
                window.location = '/signin/';
            }
        }, function(error) {
            console.error(error);
        });
    }
});
