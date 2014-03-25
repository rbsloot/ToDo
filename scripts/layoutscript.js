/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    $("#schedule-toggler").click(function(e) {
        e.preventDefault();
        $(".schedule-today").toggleClass("transition-delay").toggleClass("zero-height");
        $(".board-container").toggleClass("transition-delay").toggleClass("full-width");
    });
    
    $("#logged-users-toggler").click(function(e) {
        e.preventDefault();
        
    });
    
    $(".main-content").on("click", ".schedule-board-name, .schedule-list-name", function() {
        $(this).toggleClass("closed");
        if($(this).hasClass("schedule-board-name")) {
            $(this).parent().find(".schedule-list-group").toggle();
//            $(this).parent().find(".schedule-list-name").toggleClass("closed");
        }
        else if($(this).hasClass("schedule-list-name")) {
            $(this).parent().find(".task").toggle();
        }
        
    });
    
//    $("#board2").isotope({
//        itemSelector:"#board2 > .task-list"
//    });
    
//    $(".task-list").on('dragstart', function(e) {
//        //e.originalEvent.dataTransfer.setData("task-id", e.target.id);
//    }).on("dragover", function(e) {
//        e.preventDefault();
//        $(this).css("border", "3px dashed");
//    }).on("drop", function(e) {
//        e.preventDefault();
//        //$(this).append(document.getElementById(e.originalEvent.dataTransfer.getData("geo-content-id")));
//        $(this).css("border", "none");
//    }).on("dragleave", function() {
//        $(this).css("border", "none");
//    });
});
