$(document).ready(function() {
    $(".toggle-button").click(function() {
        var card = $(this).closest(".card");
        var fullContent = card.find(".full-content");
        var preview = card.find(".preview");

        fullContent.toggleClass("show");
        preview.toggleClass("hide");
        $(this).find("i").toggleClass("fa-plus fa-minus");
    });
});
