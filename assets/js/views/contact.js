define(['backbone', 'handlebars'], function (Backbone, Handlebars) {

    'use strict';

    var ContactView = Backbone.View.extend({

        className: 'office-location',

        template: Handlebars.compile($('#contactTpl').html()),

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return ContactView;
});