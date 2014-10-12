define([
    'backbone',
    'handlebars'
], function (Backbone, Handlebars) {

    'use strict';

    var StoryView = Backbone.View.extend({

        tagName: 'li',

        template: Handlebars.compile($('#storyTpl').html()),

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return StoryView;
});