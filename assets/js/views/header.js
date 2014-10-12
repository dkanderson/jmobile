define(['backbone', 'handlebars', 'views/navPanel'], function (Backbone, Handlebars, NavPanel) {

    'use strict';

    var Header = Backbone.View.extend({

        className: 'header',

        template: $('#headerTpl').html(),

        events: {
            'click .mobile-trigger': 'openPanel',
            'click #logoBtn': 'goBack'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            return this;
        },

        openPanel: function (e) {
            e.preventDefault();
            App.Vent.trigger('toggle:panel');
        },

        goBack: function (e) {
            e.preventDefault();
            Backbone.history.history.back();
        }
    });

    return Header;

});