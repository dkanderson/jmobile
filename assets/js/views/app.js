define([
    'jquery',
    'underscore',
    'backbone',
    'views/header',
    'views/navPanel',
    'views/home',
    'collections/news',
    'vendor/imagesloaded/imagesloaded.pkgd'

], function ($, _, Backbone, HeaderView, NavPanel, HomeView, NewsCollection, imagesLoaded) {

    'use strict';

    var AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: 'body',

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
                    App.homeView = new HomeView({
                        collection: App.newsCollection
                    });
                    self.showView(App.homeView);
                    App.stateHistory.push(window.location.hash);
                }
            });

            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            return this;
        },

        showView: function (view, direction) {
            App.appView.delegateEvents();

            var that = this;

            App.panel.removeClass('panel-is-open');

            // If first View dont transition
            if (!this.currentView) {
                this.currentView = view;
                App.container.html('<div class="loading"></div>');
                imagesLoaded(App.container, function(){
                    App.container.html(view.$el.addClass('center'));
                });

                return;
            }

            // append view and position at the start of the animation
            App.container.append(view.$el.addClass(direction));

            // destroy previous view after transition ends
            this.currentView.$el.one('transitionend', function (e) {
                that.currentView.remove();
                that.currentView.unbind();
                that.currentView = view;
            });

            // animate new page in and previous page out
            var animateIn = function () {
                view.$el.removeClass(direction).addClass('center');
                that.currentView.$el.removeClass('center').addClass(direction === 'left' ? 'right' : 'left');
            };

            _.delay(animateIn, 20);

        }

    });

    return AppView;
});