// ==UserScript==
// @name         DumbBeGone
// @namespace    http://your.homepage/
// @version      0.1
// @description  Removes Dumb rating
// @author       Who knows!
// @match        http://facepunch.com/showthread.php?*
// @grant        none
// ==/UserScript==

$("span:contains('Dumb')").find("span:contains('Dumb')").remove()