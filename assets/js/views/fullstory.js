define(['backbone', 'handlebars'], function (Backbone, Handlebars) {

    'use strict';

    var FullStory = Backbone.View.extend({
        template: Handlebars.compile($('#fullStoryTpl').html()),

        className: 'page',

        events: {
            'click #next-page': 'getNextPage',
            'click #prev-page': 'getPrevPage',
            'swipeleft': 'handleSwipe',
            'swiperight': 'handleSwipe'
        },

        initialize: function () {
            this.render();
        },

        handleSwipe: function (e) {
            var panel = $('#right-panel');
            if (panel.hasClass('show-panel')) {
                if (e.type === 'swipeleft') {
                    panel.removeClass('show-panel');
                }
            } else {
                if (e.type === 'swipeleft') {
                    this.getNextPage();
                } else {
                    this.getPrevPage();
                }
            }
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.pagination();
            //this.$el.hammer();
            App.upDate();

            $('html,body').animate({
                scrollTop: 0
            }, 'slow');

            // imagesLoaded(this.$el, function () {
            //     App.helpers.attachScroll();
            // });

            return this;
        },
        getCurrentIndex: function () {
            return this.model.collection.indexOf(this.model);
        },

        getNextPage: function () {
            var currentIndex = this.getCurrentIndex(),
                nextPageId;
            if (currentIndex <= 18) {
                nextPageId = this.model.collection.at(currentIndex + 1).get('id');
                App.Vent.trigger('nextpage', nextPageId);
            }
        },

        getPrevPage: function () {
            var currentIndex = this.getCurrentIndex(),
                prevPageId;
            if (currentIndex >= 1) {
                prevPageId = this.model.collection.at(currentIndex - 1).get('id');
                App.Vent.trigger('prevpage', prevPageId);
            } else {
                App.Vent.tigger('open:panel');
            }
        },

        pagination: function () {
            var index = this.getCurrentIndex() + 1,
                length = this.model.collection.length;
            this.$el.find('.pagenav').html('<span class="current-index">' + index + '</span> of <span class="total-pages">' + length + '</span>');
        }
    });

    return FullStory;
});