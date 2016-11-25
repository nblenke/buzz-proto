app.eventCreateView = Backbone.View.extend({
    events: {
        'click #create' : 'create',
    },
    // test data
    create: function () {
        var database = firebase.database();
        var currentUser = firebase.auth().currentUser;
        var attendees = [];

        attendees.push({
            displayName: currentUser.displayName,
            uid: currentUser.uid
        });

        database.ref('events/' + utils.guid()).set({
            type: 'party',
            location: '',
            date: '12/22/2016',
            time: '11:00 PM EST',
            attendees: attendees
        });

        database.ref('events/' + utils.guid()).set({
            type: 'study',
            location: '',
            date: '2/22/2017',
            time: '11:00 PM EST',
            attendees: attendees
        });
    },
    initialize: function (options) {
        $(this.el).html(_.template($('#tmpl-event-create').html(), {}));
    }
});
