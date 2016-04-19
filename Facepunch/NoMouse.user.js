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

// v Edit here v
var HotForum1 = "";
var HotForum2 = "";
var HotForum3 = "";
var HotForum4 = "";
var HotForum5 = "";

var SelectionColor = "red";
var SelectionPrefix = ">";
var SelectionPostfix = "<";
// ^ Edit here ^

// Locations
var Punch = "https://facepunch.com/";
var ShowThread = "showthread.php";
var ForumDisplay = "forumdisplay.php";
var MainForum = "forum.php";
var Subscribed = "usercp.php";


// Navigation
var Exit = $(".navbit a");
var Pages = $('.pagination_top a');
var PagesThread = $('.threadpagenav a');

// Thread
var CurrenPost = 0;
var Posts = $(".postbitlegacy");
var PostsMax = Posts.length;

// Threads
var Threads = $('a[id*="thread_title_"]');
var CurrentThread = 0;
var MaxThreads = Threads.length;

// Forums
var Forums = $(".forums tr .forumtitle a");
var CurrentForum = 0;
var MaxForums = Forums.length;
var Typing = false;

function PageScroll(ID) {
    $('html, body').animate({
        'scrollTop': $('#' + ID).offset().top
    }, 200);
}

function PageLoad(Page) {
    window.location = Punch + Page;
}

function PageCheck(Page) {
    if (window.location.href.indexOf(Page) != -1) {
        return true;
    }
    else
    {
        return false;
    }
}

$(document).ready(function() {
    console.log(Typing);
    if (PageCheck(ShowThread)) {
        console.log(location.hash);
        if (location.hash !== "") {
            $(Posts).each(function(index) {
                if ($(this).attr('id') == location.hash.replace("#post", "post_")) {
                    CurrenPost = index;

                }
                console.log(CurrenPost+" "+index+" "+$(this).attr('id')+" "+location.hash.replace("#post", "post_"));
            });
        }
        PageScroll($(Posts[CurrenPost]).attr('id'));
    }
    if (PageCheck(ForumDisplay)||PageCheck(Subscribed)) {
        $('a[href="' + $(Threads[CurrentThread]).attr("href") + '"]').css("color", SelectionColor);
        $('a[href="' + $(Threads[CurrentThread]).attr("href") + '"]').prepend('<span class="prepended">'+SelectionPrefix+' </span').append('<span class="prepended"> '+SelectionPostfix+'</span');
    }
    $('a[href="' + $(Forums[CurrentForum]).attr("href") + '"]').css("color", SelectionColor);
    $('a[href="' + $(Forums[CurrentForum]).attr("href") + '"]').prepend('<span class="prepended">'+SelectionPrefix+' </span').append('<span class="prepended"> '+SelectionPostfix+'</span');
});


$(function() {

    $(window).keypress(function(e) {
        var key = e.which;
        console.log(key);
        if (PageCheck(ShowThread)) {
            if (document.activeElement.value !== undefined) {
                Typing = true;
            }
            else
            {
                Typing = false;
            }
        }


        // Unified scroller
        var PositionCurrent;
        var PositionMax;
        var IDList;

        if (PageCheck(ShowThread)) {
            if($('.updatemenu')!== undefined)
            {
                Posts = $(".postbitlegacy");
                PostsMax = Posts.length;
                Pages = $('.pagination_top a');
            }
            
            PositionCurrent = CurrenPost;
            PositionMax = PostsMax;
            IDList = Posts;


        }

        if (PageCheck(MainForum)) {
            PositionCurrent = CurrentForum;
            PositionMax = MaxForums;
            IDList = Forums;
            $('a[href="' + $(Forums[CurrentForum]).attr("href") + '"]').css("color", "");
            $('.prepended').remove();
        }

        if (PageCheck(ForumDisplay)||PageCheck(Subscribed)) {
            PositionCurrent = CurrentThread;
            PositionMax = MaxThreads;
            IDList = Threads;
            $('a[href="' + $(Threads[CurrentThread]).attr("href") + '"]').css("color", "");
            $('.prepended').remove();
        }

        if (Typing == false)
        {
            if (PageCheck(ForumDisplay) || PageCheck(MainForum) || PageCheck(ShowThread)||PageCheck(Subscribed)) {
                console.log(Typing);
                switch (key) {
                        // S
                    case 115:
                        PositionCurrent++;
                        if (PositionCurrent >= PositionMax) {
                            PositionCurrent = 0;
                        }
                        break;
                        // W
                    case 119:
                        PositionCurrent--;
                        if (PositionCurrent < 0) {
                            PositionCurrent = PositionMax - 1;
                        }
                        break;
                        // E
                    case 101:
                        if (PageCheck(ForumDisplay) || PageCheck(MainForum)||PageCheck(Subscribed))
                        {
                            PageLoad($(IDList[PositionCurrent]).attr("href"));
                        }
                        if (PageCheck(ShowThread))
                        {

                            PageLoad($(IDList[PositionCurrent]).find('.postcontrols a').attr("href"));
                        }

                        break;
                        // N
                    case 110:
                        if (PageCheck(ForumDisplay)||PageCheck(Subscribed))
                        {
                            PageLoad($(IDList[PositionCurrent]).attr("href") + "&goto=newpost");
                        }
                        if (PageCheck(ShowThread))
                        {
                            $(IDList).each(function(index) {
                                if ($(this).attr('id') == $(".postbitnew").attr("id")) {
                                    PositionCurrent = index;
                                }
                            });
                        }
                        break;
                }
            }
        }


        if (PageCheck(ShowThread)||PageCheck(ForumDisplay)||PageCheck(Subscribed)) {
            CurrenPost = PositionCurrent;
            PostsMax = PositionMax;

            if (key == 115 || key == 119 || key == 110) {
                PageScroll($(IDList[PositionCurrent]).attr('id'));
            }
        }
        if (PageCheck(MainForum)) {
            CurrentForum = PositionCurrent;
            MaxForums = PositionMax;
            $('a[href="' + $(Forums[CurrentForum]).attr("href") + '"]').css("color", SelectionColor);
            $('a[href="' + $(Forums[CurrentForum]).attr("href") + '"]').prepend('<span class="prepended">'+SelectionPrefix+' </span').append('<span class="prepended"> '+SelectionPostfix+'</span');
        }
        if (PageCheck(ForumDisplay)||PageCheck(Subscribed)) {
            CurrentThread = PositionCurrent;
            MaxThreads = PositionMax;
            $('a[href="' + $(Threads[CurrentThread]).attr("href") + '"]').css("color", SelectionColor);
            $('a[href="' + $(Threads[CurrentThread]).attr("href") + '"]').prepend('<span class="prepended">>'+SelectionPrefix+' </span').append('<span class="prepended"> '+SelectionPostfix+'</span');
        }


        if (PageCheck(ForumDisplay))
        {
            Pages = PagesThread;
        }

        if ( PageCheck("newthread.php") == false && PageCheck("newreply.php") == false) {
            switch (key) {
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
                    // Z
                case 122:
                    $(Pages).each(function(index) {
                        if ($(this).attr('title').indexOf("First Page") != -1) {
                            PageLoad($(this).attr('href'));
                        }
                    });
                    break;
                    // X
                case 120:
                    $(Pages).each(function(index) {
                        if ($(this).attr('title').indexOf("Last Page") != -1) {
                            PageLoad($(this).attr('href'));
                        }
                    });
                    break;
                    // 1
                case 49:
                    PageLoad("usercp.php");
                    break;
                    // 2
                case 50:
                    PageLoad("fp_events.php");
                    break;
                    // 3
                case 51:
                    PageLoad("fp_popular.php");
                    break;
                    // 4
                case 52:
                    PageLoad("fp_read.php");
                    break;
                    // 5
                case 53:
                    PageLoad("search.php");
                    break;
                    // 6
                case 53:
                    PageLoad(HotForum1);
                    break;
                    // 7
                case 53:
                    PageLoad(HotForum2);
                    break;
                    // 8
                case 53:
                    PageLoad(HotForum3);
                    break;
                    // 9
                case 53:
                    PageLoad(HotForum4);
                    break;
                    // 0
                case 53:
                    PageLoad(HotForum5);
                    break;
                    // Q
                case 113:
                    if ($(Exit[Exit.length - 1]).attr("href")!==undefined)
                    {
                        PageLoad($(Exit[Exit.length - 1]).attr("href"));
                    }
                    else
                    {
                        PageLoad("forum.php");
                    }
                    break;
            }
        }
    });
});
