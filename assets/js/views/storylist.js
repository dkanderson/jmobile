define([
    'backbone',
    'views/story'
], function (Backbone, Story) {

    'use strict';

    var StoryList = Backbone.View.extend({

        tagName: 'ul',

        className: 'list-media-items',

        initialize: function () {
            this.render();
            // App.upDate();
        },

        render: function () {
            var newCollection = _(this.collection.rest(1));
            newCollection.each(this.populate, this);
            return this;
        },

        populate: function (stories) {
            var story = new Story({
                model: stories
            });
            this.$el.append(story.render().el);
        }

    });

    return StoryList;
});