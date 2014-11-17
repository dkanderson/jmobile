define([
    'backbone',
    'handlebars'
], function (Backbone, Handlebars) {

    'use strict';

    var PhotoView = Backbone.View.extend({
        tagName: 'li',
        
        className: 'gl',

        template: Handlebars.compile($('#galleryTpl').html()),

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return PhotoView;
});