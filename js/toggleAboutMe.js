$(document).ready(function() {
    $(".toggle-button").click(function() {
        var fullContent = $(this).closest(".card").find(".full-content");
        fullContent.toggleClass("show");
        $(this).find("i").toggleClass("fa-plus fa-minus");
    });
});
