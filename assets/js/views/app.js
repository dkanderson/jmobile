define([
    'jquery',
    'backbone',
    'views/header',
    'views/navPanel',
    'views/home',
    'collections/news'
], function ($, Backbone, HeaderView, NavPanel, HomeView, NewsCollection) {

    'use strict';

    var AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: 'body',

        events: {
            // events heres
        },

        initialize: function () {
            //run initial functions
            var self = this,
                navPanel = new NavPanel(),
                header = new HeaderView();
            

            $('#header').append(header.render().el);
            $('#panel').append(navPanel.render().el);

            NewsCollection.fetch({
                success: function (data) {
                    App.newsCollection = data;
                    App.homeView = new HomeView({collection: App.newsCollection});
                    self.showView(App.homeView);
                }
            });

            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            return this;
        },

        showView: function (view) {

            var container = $('#appMain');

            if (this.currentView) {
                this.currentView.close();
            }
            this.currentView = view;
            
            container.html(this.currentView.$el);

        }

    });

    return AppView;
});