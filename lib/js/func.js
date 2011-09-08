//based on http://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
function strip_tags(str){
    return str.replace(/(<([^>]+)>)/ig,"");
}

//BACKBONE OVERRIDES
Backbone.sync = function(method, model) {
	//return model.changedAttributes(); 
	return method + ": " + JSON.stringify(model);
};

//BACKBONE HELPERS

//set the changed attr on a model
//requires that the model passed has an attribute named 'changed'
bb.setChanged = function(collection, id, attr){
	try {
		var changed = collection.get(id).get('changed');
		if(changed === false || changed.indexOf(attr) == -1){
			var changed_str = changed ? changed : '';
			collection.get(id).set({'changed' : changed_str + attr + ','});
		}
	} catch(e) {
		return false;
	}
};