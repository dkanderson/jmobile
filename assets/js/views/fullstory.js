define(['backbone', 'handlebars', 'hammerjs', 'jquery-hammerjs'], function (Backbone, Handlebars) {

    'use strict';

    var FullStory = Backbone.View.extend({
        template: Handlebars.compile($('#fullStoryTpl').html()),

        className: 'page',

        events: {
            'click #next-page': 'getNextPage',
            'click #prev-page': 'getPrevPage',
            'panleft': 'handleSwipe',
            'panright': 'handleSwipe'
        },

        initialize: function () {
            this.render();
        },

        handleSwipe: function (e) {

            if(e.type === 'panleft'){
                this.getNextPage();
                if(this.indexTracker <= 19){
                    this.undelegateEvents();
                }
            } else {
                this.getPrevPage();
                if(this.indexTracker >= 0){
                    this.undelegateEvents();
                }

            }

        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.pagination();
            this.$el.hammer();
            App.upDate();

            return this;
        },
        getCurrentIndex: function () {
            return this.model.collection.indexOf(this.model);
        },

        getNextPage: function () {
            var currentIndex = this.getCurrentIndex(),
                nextPageId;
            if (currentIndex <= 18) {
                this.indexTracker = currentIndex + 1;
                nextPageId = this.model.collection.at(this.indexTracker).get('id');
                App.Vent.trigger('nextpage', {
                    id: nextPageId,
                    direction: 'right'
                });
            }
        },

        getPrevPage: function () {
            var currentIndex = this.getCurrentIndex(),
                prevPageId;
            if (currentIndex >= 1) {
                this.indexTracker = currentIndex - 1;
                prevPageId = this.model.collection.at(this.indexTracker).get('id');
                App.Vent.trigger('prevpage', {
                    id: prevPageId,
                    direction: 'left'
                });
            } else {
                App.Vent.trigger('open:panel');
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