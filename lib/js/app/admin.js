$(window).ready(function(){

    //PARSE JS TEMPLATES INTO SEPERATE TEMPLATES 
    function getJSTemplates(templates){
		var jst = {},
		split_template = templates.split('<!--:SPLIT:-->'),
		start_template_name = '<!--::',
		end_template_name = '::-->';
		
		_.each(split_template, function(template){
			var start_index = template.indexOf(start_template_name),
			end_index = template.indexOf(end_template_name),
			template_name = template.substring(start_index + start_template_name.length, end_index);
			jst[template_name] = template.substring(end_index + end_index.length, template.length).replace(/(\r\n|\n|\r)/gm,"");;
		});
		
		return jst;
	}
	
	function getModelData(){
		//ADD ITEMS (ADDS TO COLLECTION AND USES MODEL)
		
		admin.ArticleList.add({
			id : 1,
			title : 'How to deal with Backbone 1',
			creation_date : 'Feb 11 2010',
			content : 'no content',
			publish : false
		});

		admin.ArticleList.add({
			id : 2,
			title : 'A Different Title',
			creation_date : 'Mar 27 2010',
			content : 'Some test content',
			publish : true
		});
		
		admin.ArticleList.add({
			id : 3,
			title : 'A New Title',
			creation_date : 'May 5 2010',
			content : 'Some test content',
			publish : true
		});
		
		admin.ArticleList.add({
			id : 4,
			title : 'Test Title',
			creation_date : 'Aug 1 2010',
			content : 'More test content, foooooo',
			publish : true
		});
		
		/* Interests */
		admin.InterestList.add({
			id : 0,
			title : 'HTML5'
		});

		admin.InterestList.add({
			id : 1,
			title : 'CSS3'
		});
	}
	
	function setViews(){
		//ITERATE OVER ARTICLE LIST COLLECTION
		$.each(admin.ArticleList.models, function(i){
			new admin.ArticleListView(admin.ArticleList.models[i].get('id'));
		});
		
		$.each(admin.InterestList.models, function(i){
			new admin.InterestListView(admin.InterestList.models[i].get('id'));
		});
	}
	
	//FETCH JS TEMPLATES
	$.ajax({
		url: "templates.js.html",
		dataType : 'text',
		success: function(templates){
			window.jst = getJSTemplates(templates);
			getModelData();
			setViews();
		}
	});
});