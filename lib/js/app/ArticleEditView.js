admin.ArticleEditView = Backbone.View.extend({
    el : '#article_edit_view',
	template : _.template('<input type="hidden" name="article_id" value="<%= id %>"><p><input type="text" name="date" value="<%= creation_date %>"><span class="right"><label>published</label> <input type="checkbox" name="publish" <%= publish %>></span></p><p><input type="text" name="title" value="<%= title %>"></p><p><textarea><%= content %></textarea></p>'),
	initialize : function() {},
	render: function(id) {
		var m = admin.ArticleList.get(id); 
		
		$(this.el).html(this.template({
			'id' : m.get('id'),
			'title' : m.get('title'),
			'creation_date' : m.get('creation_date'),
			'content' : m.get('content'),
			'publish' : this.checkInput(m.get('publish'))
		}));
		
		//why doesn't this work?
		//l(JSON.stringify(m));
		//$(this.el).html(this.template(JSON.stringify(m)));
		
		return this;
	},
	checkInput: function(check){
		return check ? 'checked' : '';
	},
	events: {
		'change input[name="publish"]' : 'setPublished',
		'blur input[name="title"]' : 'setTitle',
		'blur input[name="date"]' : 'setDate',
		'blur textarea' : 'setContent'
	},
	setPublished: function(e){
		var publish = $(e.target).attr('checked') ? true : false;
		admin.ArticleList.get(this.getId()).set({'publish' : publish});
		bb.setChanged(admin.ArticleList, this.getId(), 'publish');
	},
	setTitle: function(e){
		l('set title');
		admin.ArticleList.get(this.getId()).set({'title' : $(e.target).val()});
		bb.setChanged(admin.ArticleList, this.getId(), 'title');
	},
	setDate: function(e){
		admin.ArticleList.get(this.getId()).set({'creation_date' : $(e.target).val()});
		bb.setChanged(admin.ArticleList, this.getId(), 'creation_date');
	},
	setContent: function(e){
		console.log('set content');
		admin.ArticleList.get(this.getId()).set({'content' : $(e.target).val()});
		bb.setChanged(admin.ArticleList, this.getId(), 'content');
	},
	getId: function(e){
		return parseInt($('input[name="article_id"]').val());
	}
});

$(window).ready(function(){
	admin.EditView = new admin.ArticleEditView();
});