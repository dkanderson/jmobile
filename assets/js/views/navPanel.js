define(['jquery', 'backbone'], function ($, Backbone) {
	
	'use strict';

	var NavPanel = Backbone.View.extend({

        className: 'panel panel-left',

        template: $('#navTpl').html(),
        
        events: {
            'click a': 'closePanel'
        },

        initialize: function () {
            this.render();
            App.Vent.on('toggle:panel', this.toggle, this);
        },
        
        closePanel: function () {
            this.$el.removeClass('panel-is-open');
        },
        
        openPanel: function () {
            this.$el.addClass('panel-is-open');
        },
        
        toggle: function () {
            this.$el.toggleClass('panel-is-open');
        },
        
        render: function () {
            this.$el.html(this.template);
            return this;
        }

	});

	return NavPanel;
});