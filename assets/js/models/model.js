define(['jquery', 'backbone'], function ($, Backbone) {

    'use strict';

    var ModelName = Backbone.Model.extend({
        defaults: {
            assigned: false
        }
    });

    return ModelName;
});