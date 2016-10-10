app.footerView = Backbone.View.extend({
        el: $('footer'),
        initialize: function () {
            var date = new Date(),
                year = date.getFullYear();

            $(this.el).html(_.template($('#tmpl-footer').html(), {
                year: year
            }));
        }
});
