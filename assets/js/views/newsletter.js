define(['backbone'], function (Backbone){

	'use strict';

	var Newsletter = Backbone.View.extend({

		className: 'page',

		template: '<div class="newsletter-page">' + $('#nlTpl').html() + '</div>',

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