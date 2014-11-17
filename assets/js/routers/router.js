define([
    'backbone',
    'views/fullstory',
    'views/app',
    'views/radioPrograms',
    'collections/radio',
    'collections/contact',
    'views/contactList',
    'views/newsletter',
    'collections/photo',
    'views/galleries',
    'views/photoList'
], function (Backbone, FullStory, AppView, RadioPrograms, RadioCollection, ContactCollection, ContactList, Newsletter, PhotoCollection, Gallery, PhotoList) {

    'use strict';

    var Workspace = Backbone.Router.extend({
        routes: {
            '': 'home',
            'news': 'home',
            'story/:id': 'singlePage',
            'radio': 'radio',
            'contact': 'contact',
            'newsletter': 'newsletter',
            'photos' : 'photos',
            'gallery/:id': 'gallery'
        },

        initialize: function () {
            App.Vent.on('nextpage', this.gotoPage, this);
            App.Vent.on('prevpage', this.gotoPage, this);
        },

        gotoPage: function (options) {
            this.singlePage(options.id, options.direction);
            //this.navigate('story/' + options.id);
        },

        home: function () {
            if (App.homeView) {
                // Show home view already in memory
                this.slidePage(App.homeView);
                this.navigate('news');

            } else {
                // Instantiate app
                App.appView = new AppView();
                this.navigate('news');
            }
        },

        singlePage: function (id, direction) {
            App.currentStory = new FullStory({
                model: App.newsCollection.get(id)
            });
            this.slidePage(App.currentStory, direction);
        },

        radio: function () {
            var self = this;
            RadioCollection.fetch({
                success: function (data) {
                    App.radioCollection = data;
                    App.radioPrograms = new RadioPrograms({
                        collection: App.radioCollection
                    });
                    self.slidePage(App.radioPrograms);
                }
            });

        },

        contact: function () {
            var self = this;
            ContactCollection.fetch({
                success: function (data) {
                    App.offices = data;
                    App.contactList = new ContactList({
                        collection: App.offices
                    });
                    self.slidePage(App.contactList);
                }
            });
        },

        newsletter: function () {
            App.newsletter = new Newsletter();
            this.slidePage(App.newsletter);
        },

        photos: function () {
            var self = this;
            PhotoCollection.fetch({
                success: function(data){
                    App.photos = data;
                    App.gallery = new Gallery({
                        collection: App.photos
                    });
                    self.slidePage(App.gallery);
                }
            });

        },

        gallery: function (id) {
            var self = this,
                currentGallery = new Backbone.Collection();

            currentGallery.url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=' + id + '&format=json&nojsoncallback=1&api_key=cf3f96e93b49ff3332e89e7817b3885e';
            currentGallery.parse = function (resp) {
                return resp.photoset.photo;
            };
            currentGallery.fetch({
                success: function(data){
                    App.photos = data;
                    App.gallery = new PhotoList({
                        collection: App.photos
                    });
                    self.slidePage(App.gallery);
                }
            });

        },

        slidePage: function (view, direction) {
            //var dir = null || direction;
            var l = App.stateHistory.length,
            state = window.location.hash;

            if (l === 0) {
                App.stateHistory.push(state);
                App.appView.showView(view);
                return;
            }

            if(direction){
                App.appView.showView(view, direction);
                return;
            } else {
               if (state === App.stateHistory[l-2]) {
                    App.stateHistory.pop();
                    App.appView.showView(view, 'left');
                } else {
                    App.stateHistory.push(state);
                    App.appView.showView(view, 'right');
                }
            }

        }
    });

    return Workspace;
});