//CREATE BASE MODEL
admin.Article = Backbone.Model.extend({ 
    defaults : {
		id_prefix : 'article_list',
		id : null, 
		title : null,
		creation_date : null,
		content : null,
		publish : false,
		changed : false
	},
	initialize : function(){
		this.bind('change:title', this.checkTitle, this);
	},
	checkTitle: function(){
		if(this.get('title').length < 1){
			this.set({'title': 'untitled'});
		}
	}
});

//CREATE MODEL COLLECTION
admin.Articles = Backbone.Collection.extend({
	model : admin.Article
});

admin.ArticleList = new admin.Articles();