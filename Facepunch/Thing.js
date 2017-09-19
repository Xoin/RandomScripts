// ==UserScript==
// @name         Thing
// @namespace    Thing
// @version      0.1
// @description  Thing
// @author       You
// @include     https://facepunch.com/showthread.php*
// @include     https://facepunch.com/forumdisplay.php*
// @grant        none
// ==/UserScript==

var hide = true;
var blur = false;
var blurpost = false;

var ShutUpList = ["Tudd"];

$(".postbitlegacy").each(function( index ) {
    
    var poster = $(this).find(".username_container").text().trim();
    if ( ShutUpList.indexOf(poster) > -1 )
    {
        
        if (hide)
        {
            $(this).remove();
        }
        
        if (blur||blurpost)
        {
            $(this).find(".postdetails, .postfoot").css("-webkit-filter","blur(2px)");
           
        }
        $(this).find(".postcontrols").remove();
    }
    
    $(".quote").each(function( index ) {
        var posterquote = $(this).find(".information").text().trim();
        if ( ShutUpList.indexOf(posterquote.replace(" posted:","")) > -1 )
        {
            if (hide)
            {
                $(this).find(".message").html("This user is ignored");
            }
            
            if (blur)
            {
                $(this).find(".message").css("-webkit-filter","blur(2px)");
            }
        }
    });
});

$(".threadbit").each(function( index ) {
    var poster = $(this).find(".author a").text().trim();
    console.log(poster);
    if ( ShutUpList.indexOf(poster.replace("Mark Unread","")) > -1 )
    {
        if (hide)
        {
            $(this).remove();
        }
    }
});
