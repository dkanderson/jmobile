define([
    'backbone',
    'views/storylist',
    'views/featured'
], function (Backbone, StoryList, Featured) {
    'use strict';

    var HomeView = Backbone.View.extend({

        className: 'page',

        initialize: function () {
            //App.helpers.mediator.on('collection:loaded', this.render, this);
            this.render();
        },

        render: function () {
            //ar container = $('#appMain');

            this.stories = new StoryList({
                collection: this.collection
            });
            this.featured = new Featured({
                collection: this.collection
            });

            this.$el.append(this.featured.$el);
            this.$el.append(this.dividerBar());
            this.$el.append(this.stories.$el);

            // imagesLoaded(this.featured.$el, function () {
            //     App.helpers.attachScroll();
            // });

            return this;
        },
        dividerBar: function () {
            return '<h3 class="media-list-title">Featured Stories</h3>';
        }

    });

    return HomeView;
});