define([
    'jquery',
    'backbone',
    'views/fullstory',
    'views/app',
    'views/radioPrograms',
    'collections/radio',
    'collections/contact',
    'views/contactList',
    'views/newsletter'
], function ($, Backbone, FullStory, AppView, RadioPrograms, RadioCollection, ContactCollection, ContactList, Newsletter) {

    'use strict';

    var Workspace = Backbone.Router.extend({
        routes: {
            '': 'home',
            'news': 'home',
            'story/:id': 'singlePage',
            'radio': 'radio',
            'contact': 'contact',
            'newsletter': 'newsletter'
        },

        home: function () {
            if (App.homeView) {
                // Show home view already in memory
                App.appView.showView(App.homeView);

            } else {
                // Instantiate app
                App.appView = new AppView();

            }
        },

        singlePage: function (id) {
            App.currentStory = new FullStory({
                model: App.newsCollection.get(id)
            });
            App.appView.showView(App.currentStory);
        },

        radio: function () {
            RadioCollection.fetch({
                success: function (data) {
                    App.radioCollection = data;
                    App.radioPrograms = new RadioPrograms({
                        collection: App.radioCollection
                    });
                    App.appView.showView(App.radioPrograms);
                }
            });

        },

        contact: function () {
            ContactCollection.fetch({
                success: function (data) {
                    console.log(data);
                    App.offices = data;
                    App.contactList = new ContactList({
                        collection: App.offices
                    });
                    App.appView.showView(App.contactList);
                }
            });
        },

        newsletter: function () {
            App.newsletter = new Newsletter();
            App.appView.showView(App.newsletter);
        }
    });

    return Workspace;
});