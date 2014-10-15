define([
    'backbone',
    'models/contact'
], function (Backbone, Model) {

    'use strict';

    var NewCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: Model,

        url: './data/contact.json',

        parse: function (resp) {
            return resp.contact;
        }

    });

    return new NewCollection();
});