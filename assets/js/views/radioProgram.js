define(['backbone', 'handlebars'], function (Backbone, Handlebars) {

    'use strict';

    var RadioProgram = Backbone.View.extend({

        tagName: 'li',

        className: 'rp',

        template: Handlebars.compile($('#radioTpl').html()),

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return RadioProgram;
});