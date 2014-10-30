define(['backbone', 'views/photo'], function (Backbone, PhotoView) {

    'use strict';

    var PhotoList = Backbone.View.extend({

        className: 'photo-gallery page',

        initialize: function () {
            this.renderAll();
            App.moveUp('gallery-item');

        },

        render: function (model) {
            var photo = new PhotoView({
                model: model
            });

            this.$el.append(photo.render().el);
            return this;
        },

        renderAll: function () {
            this.collection.each(this.render, this);
            setTimeout(function () {
                App.photoswipe('.photo-gallery');
            });

            return this;
        }

    });

    return PhotoList;
});