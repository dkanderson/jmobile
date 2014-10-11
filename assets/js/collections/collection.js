define([
    'underscore',
    'backbone',
    'models/model'
], function (_, Backbone, Model) {

    'use strict';

    var NewCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: Model,

        url: '/',

    });

    return new NewCollection();
});