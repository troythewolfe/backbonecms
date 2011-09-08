admin.InterestEditView = Backbone.View.extend({
    el : '#interest_edit_view',
	initialize : function(id) {
		this.template = _.template(jst['field_edit']);
		this.model = admin.InterestList.get(id);
		this.render();
	},
	render: function() {
		$(this.el).html(this.template({
			'id' : this.model.get('id'),
			'title' : this.model.get('title'),
			'published' : this.checkInput(this.model.get('publish'))
		}));

		return this;
	},
	checkInput: function(check){
		var checked = '';
		
		if(check){ 
			checked = 'checked';
		}

		return checked;
	},
	events: {
		'change input[name="publish"]' : 'setPublished',
		'change input[name="title"]' : 'setTitle'
	},
	setPublished: function(e){
		var publish = $(e.target).attr('checked') ? true : false;
		admin.InterestList.get(this.getId()).set({'publish' : publish});
		bb.setChanged(admin.InterestList, this.getId(), 'publish');
	},
	setTitle: function(e){
		admin.InterestList.get(this.getId()).set({'title' : $(e.target).val()});
		bb.setChanged(admin.InterestList, this.getId(), 'title');
	},
	getId: function(e){
		return parseInt($('input[name="field_id"]').val());
	}
});