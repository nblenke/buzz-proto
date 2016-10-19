app.eventDetailView = Backbone.View.extend({
    initialize: function (options) {
        var that = this;
        var database = firebase.database();
        var currentUser = firebase.auth().currentUser;

        return database.ref('/events/' + options.key).once('value').then(function(snapshot) {
            var eventDetail = snapshot.val();
            eventDetail.key = options.key;

            $(that.el).html(_.template($('#tmpl-event-detail').html(), {
                eventDetail: eventDetail
            }));
        });

        //ref.child('users').orderByKey().limitToLast(10).on('child_added', ...)



    }
});
