$(document).ready( () => {
    $("#message_post").on("submit", function(){
        let form = $(this);

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            if(data.status) {
                location.reload();
                alert("Successfully post a message");
            }
            else {
                alert(data.error);
            }
        }, "json");

        return false;
    });

    $(".comment_post").on("submit", function(){
        let form = $(this);

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            if(data.status){
                location.reload();
                alert("Successfully post a comment");
            }
            else{
                alert(data.error);
            }
        }, "json");

        return false;
    });

    $(".delete_comment").on("submit", function(){
        let form = $(this);

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            if(data.status){
                location.reload();
                alert("Successfully delete a comment");
            }
            else{
                alert(data.error);
            }
        }, "json");

        return false;
    });

    $(".delete_message").on("submit", function(){
        let form = $(this);

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            if(data.status){
                location.reload();
                alert("Successfully delete a message");
            }
            else{
                alert(data.error);
            }
        }, "json");

        return false;
    });
});