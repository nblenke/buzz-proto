app.eventCreateView = Backbone.View.extend({
    initialize: function (options) {

        $(this.el).html(_.template($('#tmpl-event-create').html(), {
            data: {}
        }));

    }
});
