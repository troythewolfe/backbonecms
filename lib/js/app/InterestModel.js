//CREATE BASE MODEL
admin.Interest = Backbone.Model.extend({ 
    defaults : {
		id_prefix : 'interest_list',
		id : null, 
		title : null,
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
admin.Interests = Backbone.Collection.extend({
	model : admin.Interest
});

admin.InterestList = new admin.Interests();