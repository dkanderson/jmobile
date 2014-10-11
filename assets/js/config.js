'use strict';

// Configure Required Paths.
requirejs.config({
    baseUrl: "assets/js",
    paths: {
        //The Libraries
        jquery: 'vendor/jquery/dist/jquery',
        backbone: 'vendor/backbone/backbone',
        underscore: 'vendor/underscore/underscore',
        handlebars: 'vendor/handlebars/handlebars',
        text: 'vendor/text/text',
        templates: 'templates',
        hammer: 'plugins/hammer',
        fastclick: 'plugins/fastclick',
        iscroll: 'plugins/iscroll-lite'
    },
});

// Initialize App
require(['underscore', 'backbone', 'views/appView', 'routers/router'], function (_, Backbone, AppView, Workspace) {
    // jshint nonew:false
    // Initialize routing and start Backbone.history()
    new Workspace();
    Backbone.history.start();

    // Initialize the application view
    new AppView();
});