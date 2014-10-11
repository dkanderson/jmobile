define([
    'backbone',
    'models/story'
], function (Backbone, Model) {

    'use strict';

    var NewCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: Model,

        // url: 'http://jis.gov.jm/?json=get_category_posts&category_id=27',
        url: './data/news.json',

        parse: function (resp) {
            return resp.posts;
        }

    });

    return new NewCollection();
});