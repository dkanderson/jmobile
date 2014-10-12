define([
    'backbone',
    'models/photo'
], function (Backbone, Model) {

    'use strict';

    var NewCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: Model,

        // url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&text=portia+simpson+miller&api_key=cf3f96e93b49ff3332e89e7817b3885e',
        url: './data/photos.json',

        parse: function (resp) {
            return resp.posts;
        }

    });

    return new NewCollection();
});