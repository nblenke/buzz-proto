app.homeView = Backbone.View.extend({
    initialize: function () {
        $(this.el).html(_.template($("#tmpl-home").html(), {}));
    }
});
