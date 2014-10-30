define(['backbone', 'views/contact'], function (Backbone, ContactView) {

    'use strict';

    var ContactList = Backbone.View.extend({

        className: 'page',

        initialize: function () {
            this.wrapper = this.$el.html('<div class="media-box-list"></div>');
            this.renderAll();
            App.moveUp('office-location');

        },

        render: function (model) {
            var office = new ContactView({model: model});

            this.$el.find('.media-box-list').append(office.render().el);
            return this;
        },

        renderAll: function () {
            this.collection.each(this.render, this);
            return this;
        }

    });

    return ContactList;
});