define(['backbone', 'views/radioProgram'], function (Backbone, RadioProgram) {

    'use strict';

    var RadioPrograms = Backbone.View.extend({

        className: 'page',

        initialize: function () {
            this.$el.html('<ul class="icon-list"></ul>');
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
            this.$el.find('.icon-list').append(radioProgram.render().el);
        }

    });

    return RadioPrograms;
});