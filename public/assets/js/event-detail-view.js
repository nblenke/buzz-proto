app.eventDetailView = Backbone.View.extend({
    initialize: function (options) {

        $(this.el).html(_.template($('#tmpl-event-detail').html(), {
            data: {}
        }));

    }
});
