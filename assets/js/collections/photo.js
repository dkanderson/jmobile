define([
    'backbone',
    'models/photo'
], function (Backbone, Model) {

    'use strict';

    var NewCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: Model,

        url: 'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&user_id=106946193@N02&format=json&nojsoncallback=1&api_key=cf3f96e93b49ff3332e89e7817b3885e&page=1&per_page=20',
        // url: './data/photos.json',

        parse: function (resp) {
            return resp.photosets.photoset;
        }

    });

    return new NewCollection();
});