//VIEW
admin.ArticleListView = Backbone.View.extend({ 
    model : admin.Article, 
	tagName :  'li',
	className : 'article_list_item',
	initialize : function(id) {
		this.template = _.template(jst['nav_list']),
		this.model = admin.ArticleList.get(id);
		this.model.bind('change:title', this.resetTitle, this);
		this.render();
	},
	render: function() {
		var article_list_item = $(this.el).html(this.template({
			'id_prefix' : this.model.get('id_prefix'),
			'id' : this.model.get('id'),
			'title' : this.model.get('title')
		}));

		$('#articles_nav ul').append(article_list_item);
		
		return this;
	},
	resetTitle : function(model){
		//better way
		$('#article_list_' + model.get('id') + ' span').html(model.get('title'));
	},
	events: {
		'click a' : 'openArticleEdit'
	},
	openArticleEdit : function(e){
		e.preventDefault();
		
		$('#nav_panel a span').removeClass('nav_active');
		$(e.target).addClass('nav_active');
		$('.edit_view').html('');

		admin.EditView.render($(e.target).parent().attr('data-id'));
		
		return false;
	}
});