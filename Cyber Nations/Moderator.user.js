// ==UserScript==
// @name       Moderator
// @namespace  http://wot.wot.wot.wot.wot/
// @version    0.1
// @description Automatic script to see how warn and ban appeals are handeled
// @match      http://forums.cybernations.net/index.php?/topic/*
// @require    http://code.jquery.com/jquery-2.1.0.min.js
// @copyright  2014+, xoin
// ==/UserScript==

var WarnAppeals = [
	"warn appeal",
	"warn reduction request",
	"warn level reduction",
	"wlr",
	"wlrr",
	"warning reduction",
	"warn reduction",
	"warn",
	"warn"];

var BanAppeals = [
	"ban appeal",
	"ingame ban appeal",
	"ban",
	"uban",
	"why"];

var NameChange = [
	"name change request",
	"name"];

var Posetive = [
	"granted",
	"unbanned",
	"welcome",
	"done",
	"changed",
	"all set"];

var Negative = [
	"denied",
	"rejected"];

var ModGroups = [
	"admin",
	"senior staff forum policy expert",
	"global moderator",
	"senior staff roleplay expert",
	"game mod team",
	"roleplay moderator",
	"gameplay moderator",
	"senior staff",
	"tournament game mod",
	"roleplay team leader",
	"visual team leader",
	"senior staff gameplay expert",
	"retired moderator"

];

var UserPosts = $("div[id*='post_id_']").map(function () {
	return this;
}).get();


function PostCount() {
	if (UserPosts.length <= 0) {
		return 0;
	} else {
		return UserPosts.length - 1;
	}
}

function GetTitle() {
	return $("h1[itemprop='name']")[0].innerText.toLowerCase();
}

function GetPost(num) {
	var post = UserPosts[num];

	if ($(post).find("span[class='fc']")[1] !== undefined) {
		alliance = $(post).find("span[class='fc']")[1].innerText;
	} else {
		alliance = "none";
	}

	var result = {
		'user': $(post).find("span[itemprop='name']")[0].innerText,
		'post': $(post).find("div[itemprop='commentText']")[0].innerText.toLowerCase(),
		'group': $(post).find("li[class='group_title']")[0].innerText.toLowerCase(),
		'alliance': alliance,
		'date': $(post).find("abbr[itemprop='commentTime']").attr("title")
	};
	return result;
}

function IsWnb() {
	if ($("a[title='Return to Warn &amp; Ban Appeals']").attr("title") !== undefined) {
		return true;
	} else {
		return false;
	}
}

function IsIndex() {
	if ($("a[title='Start New Topic']").attr("title") !== undefined) {
		return true;
	} else {
		return false;
	}
}

function IsLocked() {
	if ($("img[alt='This topic is locked']").attr("alt") !== undefined) {
		return true;
	} else {
		return false;
	}
}

function Reviewed(state) {
	if (state) {
		return "reviewed";
	} else {
		return "ignored";
	}
}

function ResolveTime(TimeA, TimeB) {
	var SplitTimeA = TimeA.split("T");
	var SplitTimeB = TimeB.split("T");

	var SplitTimeA2 = SplitTimeA[1].split("+");
	var SplitTimeB2 = SplitTimeB[1].split("+");

	var TimeA_date = SplitTimeA[0].split("-");
	var TimeB_date = SplitTimeB[0].split("-");

	var TimeA_time = SplitTimeA2[0].split(":");
	var TimeB_time = SplitTimeB2[0].split(":");

	var FirstDate = new Date(parseInt(TimeA_date[0]), parseInt(TimeA_date[1]), parseInt(TimeA_date[2]), parseInt(TimeA_time[0]), parseInt(TimeA_time[1]), parseInt(TimeA_time[2]));
	var SecondDate = new Date(parseInt(TimeB_date[0]), parseInt(TimeB_date[1]), parseInt(TimeB_date[2]), parseInt(TimeB_time[0]), parseInt(TimeB_time[1]), parseInt(TimeB_time[2]));

	Tempdays = parseInt((SecondDate.getTime() - FirstDate.getTime()) / (1000 * 60 * 60 * 24));

	var result = {
		'days': Tempdays,
		'hours': parseInt((SecondDate.getTime() - FirstDate.getTime()) / (1000 * 60 * 60)) - (Tempdays * 24)
	};
	return result;
}

if (IsWnb() == true && IsIndex() == false) {
	var report = {
		'id': parseInt($("div[data-area='topics']").attr("data-relid")),
		'closed': false,
		'user': "None",
		'type': "Other",
		'alliance': "None",
		'mod': "no mod",
		'start': "",
		'end': "",
		'resolve': "No action",
		'resolve_days': 0,
		'resolve_hours': 0
	};

	report['closed'] = IsLocked();

	first_post = GetPost(0);

	report['user'] = first_post['user'];
	report['start'] = first_post['date'];
	report['alliance'] = first_post['alliance'];

	for (var i = WarnAppeals.length - 1; i >= 0; i--) {
		if (GetTitle().indexOf(WarnAppeals[i]) > -1) {
			report['type'] = "warn appeal";
		}
	};

	for (var i = BanAppeals.length - 1; i >= 0; i--) {
		if (GetTitle().indexOf(BanAppeals[i]) > -1) {
			report['type'] = "ban appeal";
		}
	};

	for (var i = NameChange.length - 1; i >= 0; i--) {
		if (GetTitle().indexOf(NameChange[i]) > -1) {
			report['type'] = "name change";
		}
	};

	if (PostCount() > 0) {
		last_post = GetPost(PostCount());
		if ($.inArray(last_post['group'], ModGroups) > -1) {
			report['mod'] = last_post['user'];
			report['end'] = last_post['date'];

			for (var i = Posetive.length - 1; i >= 0; i--) {
				if (last_post['post'].indexOf(Posetive[i]) > -1) {
					report['resolve'] = "granted";
				}
			};

			for (var i = Negative.length - 1; i >= 0; i--) {
				if (last_post['post'].indexOf(Negative[i]) > -1) {
					report['resolve'] = "denied";
				}
			};
			ResolveTimer = ResolveTime(report['start'], report['end']);
			report['resolve_days'] = ResolveTimer['days'];
			report['resolve_hours'] = ResolveTimer['hours'];
		}
	} else {
		if (IsLocked()) {
			report['resolve'] = "refused";
		} else {
			report['resolve'] = "open";
		}
	}
	report_text = report['user'] + "'s (" + report['alliance'] + ") topic was " + Reviewed(report['closed']) + " and handled by " + report['mod'] + " type was " + report['type'] + " ended in " + report['resolve'] + " after " + report['resolve_days'] + " days and " + report['resolve_hours'] + " hours";

	$("div[class='topic hfeed clear clearfix']").prepend(report_text);
}