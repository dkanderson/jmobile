define([
    'backbone',
    'models/radio'
], function (Backbone, Model) {

    'use strict';

    var NewCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: Model,

        // url: 'http://jis.gov.jm/?json=get_posts&post_type=radio_programs',
        url: './data/radio.json',

        parse: function (resp) {
            return resp.posts;
        }

    });

    return new NewCollection();
});