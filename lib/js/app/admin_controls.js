$('document').ready(function(){
    $('#save_admin').bind('click', function(e){
        e.preventDefault();

        alert(JSON.stringify(admin.ArticleList));
        
        admin.ArticleList.each(function(article) {
            //alert(article.save());
        });
        return false;
    })
});