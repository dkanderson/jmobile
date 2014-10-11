define([
    'jquery',
    'backbone'
], function ($, Backbone) {

    'use strict';

    var Workspace = Backbone.Router.extend({
        routes: {
            '': 'home'
        },

        home: function () {
            // home page functions
            console.log('All systems go!');
        }
    });

    return Workspace;
});