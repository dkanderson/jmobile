define(['backbone', 'views/gallery'], function (Backbone, Gallery) {

    'use strict';

    var RadioPrograms = Backbone.View.extend({

        className: 'page',

        initialize: function () {
            this.$el.html('<ul class="icon-list"></ul>');
            this.render();
            App.moveUp('gl');

        },

        render: function () {
            this.collection.each(this.populate, this);
            return this;
        },

        populate: function (galleryModel) {
            var gallery = new Gallery({
                model: galleryModel
            });
            this.$el.find('.icon-list').append(gallery.render().el);
        }

    });

    return RadioPrograms;
});