// ==UserScript==
// @name         Deleted message be gone
// @namespace    http://your.homepage/
// @version      0.1
// @description  Removes message that are deleted from profile
// @author       You
// @match        http://facepunch.com/member.php?u=*
// @grant        none
// ==/UserScript==

$("li:contains('This message has been deleted by')").remove();