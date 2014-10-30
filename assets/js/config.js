'use strict';

// Configure Required Paths.
requirejs.config({
    baseUrl: "assets/js",
    paths: {
        //The Libraries
        'jquery': 'vendor/jquery/dist/jquery',
        'backbone': 'vendor/backbone/backbone',
        'underscore': 'vendor/underscore/underscore',
        'handlebars': 'vendor/handlebars/handlebars',
        'text': 'vendor/text/text',
        'templates': 'templates',
        'fastclick': 'plugins/fastclick',
        'iscroll': 'plugins/iscroll-lite',
        'hammerjs': 'vendor/hammerjs/hammer',
        'jquery-hammerjs': 'vendor/jquery-hammerjs/jquery.hammer',
        'backbone-hammer': 'vendor/backbone.hammer/backbone.hammer'
    },

    'shim': {
        'plugins/isvisible': ['jquery'],
        'plugins/photoswipe-si': ['jquery'],
    }
});

// Initialize App
require(['jquery', 'underscore', 'backbone', 'views/app', 'routers/router', 'plugins/isvisible', 'plugins/photoswipe-si'], function ($, _, Backbone, AppView, Workspace) {

    Backbone.View.prototype.close = function () {
        this.remove();
        this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    };

    // Global Namespaced object to communicate between modules
    window.App = {
        Vent: _.extend({}, Backbone.Events),

        container: $('#appMain'),

        panel: $('#panel').find('.panel'),

        stateHistory: [],

        upDate: function () {
            // Takes an ISO time and returns a string representing how
            // long ago the date represents.
            function prettyDate(time) {
                var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ").replace(/\.\d{3}\s/g, "")),
                    diff = (((new Date()).getTime() - date.getTime()) / 1000),
                    day_diff = Math.floor(diff / 86400);
                if (isNaN(day_diff) || day_diff < 0 || day_diff >= 365) {
                    return;
                }
                return ((day_diff === 0 && diff < 60 && "just now") || (diff < 120 && "1 minute ago") || (diff < 3600 && (Math.floor(diff / 60) + " minutes ago")) || (diff < 7200 && "1 hour ago") || (diff < 86400 && Math.floor(diff / 3600) + " hours ago")) || (day_diff === 1 && "Yesterday") || (day_diff < 7 && day_diff + " days ago") || (day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago") || (day_diff < 365 && Math.ceil(day_diff / 12) + " months ago");
            }

            function prettyLinks() {
                var i, pdate, links = document.getElementsByClassName('date');
                for (i = 0; i < links.length; i += 1) {
                    if (links[i].title) {
                        pdate = prettyDate(links[i].title);
                        if (pdate) {
                            links[i].innerHTML = pdate;
                        }
                    }
                }
            }
            prettyLinks();
            setInterval(prettyLinks, 5000);
        },

        moveUp: function (className) {
            $('.' + className).each(function (i, el) {
                el = $(el);
                if (el.visible(true)) {
                    el.addClass('come-in');
                }
            });
            $(window).scroll(function () {
                $('.' + className).each(function (i, el) {
                    el = $(el);
                    if (el.visible(true)) {
                        el.addClass('come-in');
                    }
                });
            });
        },

        photoswipe: function (el) {
            Code.photoSwipe('a', el);
        }
    };

    // jshint nonew:false
    // Initialize routing and start Backbone.history()
    new Workspace();
    Backbone.history.start();

    // Initialize the application view
    //window.App.appView = new AppView();

});