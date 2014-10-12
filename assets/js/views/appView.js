define([
    'jquery',
    'underscore',
    'backbone',
    'models/story',
    'views/header',
    'views/navPanel',
    'collections/newsCollection'
], function ($, _, Backbone, Model, HeaderView, NavPanel, NewsCollection) {

    'use strict';

    var AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#appMain',

        events: {
            // events heres
        },

        initialize: function () {
            //run initial functions
            var navPanel = new NavPanel();
            var header = new HeaderView({ nav: navPanel});

            this.$el.append(header.render().el);
            this.$el.append(navPanel.render().el);

            NewsCollection.fetch({
                success: function (data) {
                    console.log(data);
                }
            });

            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            return this;
        }

    });

    return AppView;
});