//VIEW
admin.InterestListView = Backbone.View.extend({ 
    model : admin.Interest,
	tagName :  'li',
	className : 'interest_list_item',
	initialize : function(id) {
		this.template = _.template(jst['nav_list']),
		this.model = admin.InterestList.get(id);
		this.model.bind('change:title', this.resetTitle, this);
		this.render();
	},
	render: function() {
		var article_list_item = $(this.el).html(this.template({
			'id_prefix' : this.model.get('id_prefix'),
			'id' : this.model.get('id'),
			'title' : this.model.get('title')
		}));

		$('#interests_nav ul').append(article_list_item);
		
		return this;
	},
	resetTitle : function(model){
		$('#interest_list_' + model.get('id') + ' span').html(model.get('title'));
	},
	events: {
		'click a' : 'openEdit'
	},
	openEdit : function(e){
		e.preventDefault();
		$('#nav_panel a span').removeClass('nav_active');
		$(e.target).addClass('nav_active');
		$('.edit_view').html('');
		new admin.InterestEditView($(e.target).parent().attr('data-id'), jst);
		return false;
	}
});