define(['jquery', 'backbone'], function ($, Backbone) {
	
	'use strict';

	var NavPanel = Backbone.View.extend({

		el: '#right-panel',

        template: $('#navTpl').html(),
        
        events: {
            'click a': 'closePanel'
        },
        
        closePanel: function () {
            this.$el.removeClass('show-panel');
        },
        
        openPanel: function () {
            this.$el.addClass('show-panel');
        },
        
        toggle: function () {
            this.$el.toggleClass('show-panel');
        },
        
        initialize: function () {
            this.render();
        },
        
        render: function () {
            this.$el.html(this.template);
            return this;
        }

	});

	return NavPanel;
});