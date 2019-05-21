$(document).on("click", "#scrape", function() {
    $.get("/scrape",function(req,res){});
});

$(document).on("click", "#archive", function(event) {
    const clickedElm = event.currentTarget;
    const box= $(clickedElm).parent().parent().parent();
    var article={
        title: box.find('h3.title').text(),
        link: box.find('p.link').text()
    }
    $.post("/save",article);
    alert("Archived!");
    $(this).hide();
});

$(document).on("click", "#submit", function(event){
   let note= $('#note').val();
   let id= $('#submit').data("key");

   let pass={
       id: id,
       note: note
   }

   $.post("/add",pass,function(res,req){
       location.reload();
   });
});

$(document).on("click", ".delete", function(event){
    let id= $(event.currentTarget).data("key");
    $.ajax("/notes/delete/"+id,{
        type: "DELETE"
    }).then(function(req,res){
    });
    location.reload();
});

$(document).on("click", ".delarch", function(event){
    let id= $(event.currentTarget).data("key");
    $.ajax("/article/delete/"+id,{
        type: "DELETE"
    }).then(function(req,res){
    });
    location.reload();
});