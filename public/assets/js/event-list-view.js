app.eventListView = Backbone.View.extend({
    initialize: function (options) {
        var that = this;
        var list = [];
        var database = firebase.database();
        var currentUser = firebase.auth().currentUser;
        var query = database.ref("events").orderByKey();

        query.once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var snapshot = childSnapshot.val();

                    snapshot.key = key;

                    // check if current user is attendee
                    $.each(snapshot.attendees, function (index, attendee) {
                        if (currentUser.uid === attendee.uid) {
                            list.push(snapshot)
                        }
                    });
                    // if ($.inArray(currentUser.uid, snapshot.attendees) !== -1) {
                    //
                    // }
                });

                $(that.el).html(_.template($('#tmpl-event-list').html(), {
                    list: list
                }));
        });



    }
});
