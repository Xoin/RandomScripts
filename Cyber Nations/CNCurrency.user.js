// ==UserScript==
// @name         CN Currency
// @namespace    http://boring.stuff/
// @version      0.1
// @description  Dollars are boring, script will do some math to make them conform to exchange rates
// @require      http://code.jquery.com/jquery-2.1.0.min.js
// @copyright    2015+, xoin
// @match        http://www.cybernations.net/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

var CurrencyRate = {
        "Afghani": 1,
        "Austral": 1.2789,
        "Baht": 1,
        "Canadian": 1.2495,
        "Dinar": 1,
        "Dollar": 1,
        "Dong": 1,
        "Euro": 0.8945,
        "Florin": 1.7900,
        "Franc": 5.8679,
        "Kwacha": 1,
        "Kwanza": 1,
        "Kyat": 1,
        "Lari": 1,
        "Mark": 0.5715,
        "Peso": 1,
        "Pound": 0.6479,
        "Riyal": 3.7503,
        "Rouble": 61.5524,
        "Rupee": 61.6440,
        "Shilling": 1,
        "Won": 1101.0500,
        "Yen": 119.7380
};

var CurrencySign = {
        "Afghani": "؋",
        "Austral": "$",
        "Baht": "฿",
        "Canadian": "$",
        "Dinar": "$",
        "Dollar": "$",
        "Dong": "$",
        "Euro": "$",
        "Florin": "Afl.",
        "Franc": "F",
        "Kwacha": "$",
        "Kwanza": "$",
        "Kyat": "$",
        "Lari": "$",
        "Mark": "DM",
        "Peso": "$",
        "Pound": "$",
        "Riyal": "$",
        "Rouble": "&#8381;",
        "Rupee": "$",
        "Shilling": "$",
        "Won": "$",
        "Yen": "$"
};

var UserRate = 1;
var UserSymbol = "$";

if (document.URL.replace('http://www.cybernations.net/','') == $( "a:contains('View My Nation')" ).attr("href"))
{
    var pagecurrency = $('img[src^="images/currency/"]').attr("title");
    if(GM_getValue("Currency") === undefined || pagecurrency != GM_getValue("Currency"))
    {
        GM_setValue("Currency", pagecurrency);
        UserRate = CurrencyRate[GM_getValue("Currency")];
        UserSymbol = CurrencySign[GM_getValue("Currency")];
    }
    
}

if(GM_getValue("Currency") !== undefined)
{
    UserRate = CurrencyRate[GM_getValue("Currency")];
    UserSymbol = CurrencySign[GM_getValue("Currency")];
}

var HTML = document.body.innerHTML;

var Money = HTML.match(/((?:\$)(?:[0-9]*[,|.])*(?:[0-9]*[0-9]))/g);

for (var i = 0; i < Money.length; i++) {
    var MoneySource = parseFloat(Money[i].replace('$', '').replace(/,/g, ''));
    var Moneydajusted;
    if (UserRate < 1) {
        Moneydajusted = MoneySource + (MoneySource * UserRate - MoneySource);
    } else if (UserRate > 1) {
        Moneydajusted = MoneySource * UserRate;
    } else if (UserRate = 1) {
        Moneydajusted = MoneySource;
    }
    HTML = HTML.replace(Money[i], '<span title="'+MoneySource.toLocaleString()+'">'+UserSymbol + Moneydajusted.toLocaleString()+"</span>");
}
document.body.innerHTML = HTML;
