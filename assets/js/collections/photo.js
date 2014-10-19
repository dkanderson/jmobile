define([
    'backbone',
    'models/photo'
], function (Backbone, Model) {

    'use strict';

    var NewCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: Model,

        // url: 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&user_id=106946193@N02&format=json&nojsoncallback=1&api_key=cf3f96e93b49ff3332e89e7817b3885e',
        url: './data/photos.json',

        parse: function (resp) {
            return resp.photos.photo;
        }

    });

    return new NewCollection();
});