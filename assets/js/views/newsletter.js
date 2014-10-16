define(['backbone'], function (Backbone){

	'use strict';

	var Newsletter = Backbone.View.extend({

		className: 'newsletter-page',

		template: $('#nlTpl').html(),

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(this.template);
			return this;
		}
	});

	return Newsletter;
});