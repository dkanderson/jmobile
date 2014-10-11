define([
    'jquery',
    'underscore',
    'backbone',
    'models/model',
    'collections/collection'
], function ($, _, Backbone, Model, NewCollection) {

    'use strict';

    var AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#wrapper',

        events: {
            // events heres
        },

        initialize: function () {
            //run initial functions
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            return this;
        }

    });

    return AppView;
});