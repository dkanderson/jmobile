define(['backbone', 'handlebars', 'views/navPanel'], function (Backbone, Handlebars, NavPanel) {

    'use strict';

    var Header = Backbone.View.extend({

        className: 'header',

        template: $('#headerTpl').html(),

        events: {
            'click .mobile-trigger': 'openPanel',
            'click #logoBtn': 'goBack',
            'mousedown #logoBtn': 'changeColor',
            'mouseout #logoBtn': 'resetColor'
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
        },

        changeColor: function () {
            $('#logoBtn').css("background-color", "rgba(254, 214, 73, 0.5)");
        },

        resetColor: function () {
            $('#logoBtn').css("background-color", "transparent");
        }
    });

    return Header;

});