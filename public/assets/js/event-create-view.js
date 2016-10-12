app.eventCreateView = Backbone.View.extend({
    events: {
        'click #create' : 'create',
    },
    create: function () {
        var database = firebase.database();
        var currentUser = firebase.auth().currentUser;
        var attendees = [];

        firebase.database().ref('users/' + currentUser.uid).set({
            displayName: currentUser.displayName
        });

        attendees.push(currentUser.uid);

        database.ref('events/' + utils.guid()).set({
            type: 'party',
            location: '',
            date: '12/22/2016',
            time: '11:00 PM EST',
            attendees: attendees
        });
    },
    initialize: function (options) {
        $(this.el).html(_.template($('#tmpl-event-create').html(), {}));
    }
});
