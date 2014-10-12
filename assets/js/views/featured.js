define(['backbone', 'handlebars'], function (Backbone, Handlebars) {
    'use strict';

    var FeaturedView = Backbone.View.extend({

        el: '#featured',

        template: Handlebars.compile($('#featuredTpl').html()),

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.collection.at(0).toJSON()));
            return this;
        }

    });

    return FeaturedView;
});