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
            App.Vent.on('close:panel', this.closePanel, this);
            App.Vent.on('swiped:left', this.closePanel, this);
            App.Vent.on('swiped:right', this.openPanel, this);
        },
        
        closePanel: function () {
            this.$el.removeClass('panel-is-open');
            App.Vent.trigger('panel:closed');
        },
        
        openPanel: function () {
            this.$el.addClass('panel-is-open');
        },
        
        toggle: function () {
            this.$el.toggleClass('panel-is-open');
            if(!(this.$el.hasClass('panel-is-open'))) {
                App.Vent.trigger('panel:closed');
            }
        },
        
        render: function () {
            this.$el.html(this.template);
            return this;
        }

	});

	return NavPanel;
});