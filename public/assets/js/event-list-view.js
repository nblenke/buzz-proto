app.eventListView = Backbone.View.extend({
    initialize: function (options) {
        var that = this;
        var userId = firebase.auth().currentUser.uid;
        var database = firebase.database();
        var list = [];
        var query = database.ref("events").orderByKey();
        
        query.once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();

                    childData.key = key;

                    list.push(childData)
                });

                console.log(list)
                $(that.el).html(_.template($('#tmpl-event-list').html(), {
                    list: list
                }));
        });



    }
});
