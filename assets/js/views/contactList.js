define(['backbone', 'views/contact'], function (Backbone, ContactView) {

    'use strict';

    var ContactList = Backbone.View.extend({

        className: 'media-box-list',

        initialize: function () {
            this.renderAll();
            App.moveUp('office-location');

        },

        render: function (model) {
            var office = new ContactView({model: model});

            this.$el.append(office.render().el);
            return this;
        },

        renderAll: function () {
            this.collection.each(this.render, this);
            return this;
        }

    });

    return ContactList;
});