$(document).ready( () => {
    $("#login_form").on("submit", function(){
        let form = $(this);

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            if(data.status) {
                window.location = "/wall";
            }
            else {
                alert(data.error);
            }
        }, "json");

        return false;
    });

    $("#registration_form").on("submit", function(){
        let form = $(this);

        $.post(form.attr("action"), $(form).serialize(), (data) => {
            if(data.status){
                location.reload();
                alert("Successfully created");
            }
            else{
                alert(data.error);
            }
        }, "json");

        return false;
    });
});