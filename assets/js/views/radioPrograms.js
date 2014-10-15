define(['backbone', 'views/radioProgram'], function (Backbone, RadioProgram) {

    'use strict';

    var RadioPrograms = Backbone.View.extend({

        tagName: 'ul',

        className: 'icon-list',

        initialize: function () {
            this.render();
            App.upDate();
            App.moveUp('rp');

        },

        render: function () {
            this.collection.each(this.populate, this);
            return this;
        },

        populate: function (radioModel) {
            var radioProgram = new RadioProgram({
                model: radioModel
            });
            this.$el.append(radioProgram.render().el);
        }

    });

    return RadioPrograms;
});