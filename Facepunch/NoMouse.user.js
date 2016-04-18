// ==UserScript==
// @name         NoMouse
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Keyboard FP browsing
// @author       You
// @match        https://facepunch.com/*
// @grant        none
// ==/UserScript==
//(function() {
//    'use strict';
//
//    // Your code here...
//})();
var Punch = "https://facepunch.com/";

var Exit = $(".navbit a");


// Thread
var CurrenPost = 0;
var Pages = $(".prev_next a");
var Posts = $(".postbitlegacy");
var PostsMax = $(".postbitlegacy").length;

// Threads
var Threads = $('a[id*="thread_title_"]');
var CurrentThread = 0;
var MaxThreads = $('a[id*="thread_title_"]').length;

// Forums
var Forums = $(".forums tr .forumtitle a");
var CurrentForum = 0;
var MaxForums = $(".forums tr .forumtitle a").length;

function PageScroll(ID) {
    $('html, body').animate({
        'scrollTop': $('#' + ID).offset().top
    }, 200);
}

function PageLoad(Page) {
    window.location = Punch + Page;
}


$(document).ready(function() {
    if (window.location.href.indexOf("showthread.php") != -1) {
        if (location.hash !== "") {
            $(Posts).each(function(index) {
                if ($(this).attr('id') == location.hash.replace("#post", "post_")) {
                    CurrenPost = index;
                }
            });
        }
        PageScroll($(Posts[CurrenPost]).attr('id'));
    }
    if (window.location.href.indexOf("forumdisplay.php") != -1) {
        $('a[href="' + $(Threads[CurrentThread]).attr("href") + '"]').css("color", "red");
    }
    $('a[href="' + $(Forums[CurrentForum]).attr("href") + '"]').css("color", "red");
});


$(function() {

    $(window).keypress(function(e) {
        var key = e.which;
        console.log(key);
        var Typing = false;
        if ($(document.activeElement).find("textarea").length == 0) {
            Typing = true;
        };
        if (window.location.href.indexOf("showthread.php") != -1 && Typing == false) {

            switch (key) {
                // Q
                case 113:
                    PageLoad($(Exit[Exit.length - 1]).attr("href"));
                    break;
                    // D
                case 100:
                    $(Pages).each(function(index) {
                        if ($(this).attr('title').indexOf("Next Page") != -1) {
                            PageLoad($(this).attr('href'));
                        }
                    });
                    break;
                    // A
                case 97:
                    $(Pages).each(function(index) {
                        if ($(this).attr('title').indexOf("Prev Page") != -1) {
                            PageLoad($(this).attr('href'));
                        }
                    });
                    break;
                    // S
                case 115:
                    CurrenPost++;
                    if (CurrenPost > PostsMax || CurrenPost == PostsMax) {
                        CurrenPost = 0;
                    }
                    break;
                    // W
                case 119:
                    CurrenPost--;
                    if (CurrenPost < 0) {
                        CurrenPost = PostsMax - 1;
                    }
                    break;
                    // N
                case 110:
                    $(Posts).each(function(index) {
                        if ($(this).attr('id') == $(".postbitnew").attr("id")) {
                            CurrenPost = index;
                        }
                    });
                    break;
            }
            console.log(CurrenPost);
            if (key == 115 || key == 119 || key == 110) {
                PageScroll($(Posts[CurrenPost]).attr('id'));
            }
        }
        if (window.location.href.indexOf("forumdisplay.php") != -1) {
            $('a[href="' + $(Threads[CurrentThread]).attr("href") + '"]').css("color", "");
            switch (key) {
                // Return
                case 13:
                    PageLoad($(Threads[CurrentThread]).attr("href"));
                    break;
                    // S
                case 115:
                    CurrentThread++;
                    if (CurrentThread > MaxThreads || CurrentThread == MaxThreads) {
                        CurrentThread = 0;
                    }
                    break;
                    // W
                case 119:
                    CurrentThread--;
                    if (CurrentThread < 0) {
                        CurrentThread = MaxThreads - 1;
                    }
                    break;
                    // D
                case 100:
                    $(Pages).each(function(index) {
                        if ($(this).attr('title').indexOf("Next Page") != -1) {
                            PageLoad($(this).attr('href'));
                        }
                    });
                    break;
                    // A
                case 97:
                    $(Pages).each(function(index) {
                        if ($(this).attr('title').indexOf("Prev Page") != -1) {
                            PageLoad($(this).attr('href'));
                        }
                    });
                    break;
                    // N
                case 110:
                    PageLoad($(Threads[CurrentThread]).attr("href") + "&goto=newpost");
                    break;

            }
            $('a[href="' + $(Threads[CurrentThread]).attr("href") + '"]').css("color", "red");
            console.log(CurrentThread + " " + $(Threads[CurrentThread]).attr("href"));
            if (key == 97 || key == 113) {
                PageLoad($(Exit[Exit.length - 1]).attr("href"));
            }
        }

        if (window.location.href.indexOf("forum.php") != -1 || window.location.href == "https://facepunch.com/" && Typing == false) {
            $('a[href="' + $(Forums[CurrentForum]).attr("href") + '"]').css("color", "");
            switch (key) {
                // Return
                case 13:
                    PageLoad($(Forums[CurrentForum]).attr("href"));
                    break;
                    // S
                case 115:
                    CurrentForum++;
                    if (CurrentForum > MaxForums || CurrentForum == MaxForums) {
                        CurrentForum = 0;
                    }
                    break;
                    // W
                case 119:
                    CurrentForum--;
                    if (CurrentForum < 0) {
                        CurrentForum = MaxForums - 1;
                    }
                    break;
            }
            $('a[href="' + $(Forums[CurrentForum]).attr("href") + '"]').css("color", "red");
            console.log(CurrentForum + " " + $(Forums[CurrentForum]).attr("href"));
        }
    });
});
