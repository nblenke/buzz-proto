app.eventDetailView = Backbone.View.extend({
    initialize: function (options) {
        var that = this;
        var userId = firebase.auth().currentUser.uid;
        var database = firebase.database();

        return database.ref('/events/' + options.key).once('value').then(function(snapshot) {
            var obj = snapshot.val();
            obj.key = options.key;

            $(that.el).html(_.template($('#tmpl-event-detail').html(), {
                item: obj
            }));
        });

        //ref.child('users').orderByKey().limitToLast(10).on('child_added', ...)



    }
});
