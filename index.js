// Across
function conIdToString(id) {
	if (idToString[id]) {
		return idToString[id];
	}
	return id;
}
function addClassName(div, className) {
	if (!div.classList.contains(className)) {
		div.classList.add(className);
	}
}
function addOnClick() {
	for (let location of document.getElementsByClassName("location")) {
		location.onclick = function() {locationOnClick(location);};
		location.onmouseenter = function() {locationOnHover(location);};
		location.onmouseleave = function() {locationOnUnHover(location);};
	}
	for (let item of document.getElementsByClassName("item")) {
		item.onclick = function() {itemOnClick(item);};
		item.onmouseenter = function() {itemOnHover(item);};
		item.onmouseleave = function() {itemOnUnHover();};
	}
	for (let setting of document.getElementsByClassName("setting")) {
		setting.onmouseenter = function() {itemOnHover(setting);};
		setting.onmouseleave = function() {itemOnUnHover();};
	}
	for (let group of document.getElementsByClassName("group")) {
		group.onclick = function() {groupOnClick(group);};
		group.onmouseenter = function() {locationOnHover(group);};
		group.onmouseleave = function() {locationOnUnHover(group);};
	}
}
function isIntLessThan(check, max) {
	let intValue = parseInt(check, 10);
	return Number.isInteger(intValue) && intValue <= max && intValue >= 0;
}

// Locations
function locationOnHover(location) {
	const locationStyle = window.getComputedStyle(location);
	idViewer.style.top = locationStyle.top;
	idViewer.style.display = "block";
	idViewer.innerHTML = conIdToString(location.id);
	const idStyle = window.getComputedStyle(idViewer);
	const kantoStyle = window.getComputedStyle(map);
	if (parseInt(locationStyle.left, 10) > parseInt(kantoStyle.width, 10) / 2) {
		idViewer.style.left = parseInt(locationStyle.left, 10) - parseInt(idStyle.width, 10) - 36 + "px";
	}
	else {
		idViewer.style.left = parseInt(locationStyle.left, 10) + 20 + "px";
	}
}
function locationOnUnHover() {
	idViewer.style.display = "none";
}
function locationOnClick(location) {
	location.classList.toggle("locationchecked");
	if (location.id.includes("EVENT_")) {
		updateLocations();
		updateGroups();
	}
	countchecks();
}
function setLogicClass(div, className) {
	div.classList.remove("locationevent", "locationpossible", "locationlogical", "locationeventpossible", "locationeventlogical");
	div.classList.remove("groupevent", "grouppossible", "grouplogical", "groupeventpossible", "groupeventlogical");
	div.classList.remove("subevent", "subpossible", "sublogical", "subeventpossible", "subeventlogical");
	if (className) {
		div.classList.add(className);
	}
}
function setHighClass(div, className) {
	div.classList.remove("possibleHighlight", "logicalHighlight");
	if (className !== "undefinedHighlight") {
		div.classList.add(className);
	}
}
function updateLocations() {
	if (currentGroup) {
		groupBreakDown.innerHTML = "";
	}
	revaluate();
	for (const locationId in locationLogic) {
		updateLocation(locationId);
	}
	if (currentGroup) {
		groupFocus(document.getElementById(currentGroup));
	}
}
function updateLocation(locationId) {
	let div = document.getElementById(locationId);
	const isSub = div.classList.contains("sub");
	const isEvent = locationId.includes("EVENT_");
	const availablity = locationLogic[locationId]();
	let logicClass = "";
	if (isEvent || availablity) {
		if (isSub) {
			logicClass = "sub";
		}
		else {
			logicClass = "location";
		}
		if (isEvent) {
			logicClass = logicClass + "event";
		}
		if (availablity) {
			logicClass = logicClass + availablity;
		}
	}
	if (Object.hasOwn(locationHighlight, locationId)) {
		const highlight = locationHighlight[locationId]();
		setHighClass(div, highlight + "Highlight");
	}
	setLogicClass(div, logicClass);
}

// Items
function itemOnHover(item) {
	itemHoverDesc.innerHTML = conIdToString(item.id);
}
function itemOnUnHover() {
	if (currentGroup) {
		itemHoverDesc.innerHTML = conIdToString(currentGroup);
	}
	else {
		itemHoverDesc.innerHTML = "&nbsp";
	}
}
function itemOnClick(item) {
	item.classList.toggle("itemchecked");
	updateLocations();
	updateGroups();
	countchecks();
}

//Settings
//Settings - Helper
function settingIterate(setting, max) {
	let count = getSettingState(setting);
	setting.classList.remove("_" + count);
	count = count + 1;
	if (count > max) {
		count = 0;
	}
	setting.classList.add("_" + count);
}
function getSettingState(setting) {
	return parseInt(setting.classList[setting.classList.length - 1].substring(1), 10);
}

//Settings - items in logic
function hideToMatch() {
	let shouldHide = [];
	if (getSettingState(goal) === 0) {
		shouldHide = shouldHide.concat(locationTags["PostE4"]);
	}
	if (getSettingState(johto_only) > 0) {
		shouldHide = shouldHide.concat(kantoLocations);
		if (getSettingState(johto_only) === 1) {
			shouldHide = shouldHide.concat(mtSilverLocations);
		}
	}
	if (getSettingState(saffron_gatehouse_tea_north) === 0 && 
		getSettingState(saffron_gatehouse_tea_east) === 0 && 
		getSettingState(saffron_gatehouse_tea_south) === 0 && 
		getSettingState(saffron_gatehouse_tea_west) === 0) {
		shouldHide = shouldHide.concat(locationTags["RequiresSaffronGatehouses"]);
	}
	if (getSettingState(vanilla_clair) === 0) {
		shouldHide = shouldHide.concat(locationTags["VanillaClairOn"]);
	}
	else {
		shouldHide = shouldHide.concat(locationTags["VanillaClairOff"]);
	}
	if (getSettingState(randomize_badges) === 0) {
		shouldHide = shouldHide.concat(locationTags["Badge"]);
	}
	if (getSettingState(randomize_hidden_items) === 0) {
		shouldHide = shouldHide.concat(locationTags["Hidden"]);
	}
	if (getSettingState(randomize_berry_trees) === 0) {
		shouldHide = shouldHide.concat(locationTags["BerryTree"]);
	}
	if (getSettingState(randomize_pokemon_requests) === 0) {
		shouldHide = shouldHide.concat(locationTags["PokemonRequest"]);
		shouldHide = shouldHide.concat(locationTags["BillsGrandpa"]);
	}
	if (getSettingState(randomize_bug_catching_contest) === 0) {
		shouldHide = shouldHide.concat(locationTags["Contest"]);
	}
	else if (getSettingState(randomize_bug_catching_contest) === 1) {
		shouldHide = shouldHide.concat(locationTags["ContestAllRemoved"]);
	}
	else if (getSettingState(randomize_bug_catching_contest) === 2) {
		shouldHide = shouldHide.concat(locationTags["Contest23Removed"]);
	}
	else {
		shouldHide = shouldHide.concat(locationTags["ContestParticipateRemoved"]);
	}
	if (getSettingState(randomize_phone_call_items) === 0) {
		shouldHide = shouldHide.concat(locationTags["PhoneCalls"]);
	}
	for (let sub of document.getElementsByClassName("sub")) {
		sub.classList.remove("hidden");
		if (shouldHide.includes(sub.id)) {
			sub.classList.add("hidden");
		}
	}
	for (let loc of document.getElementsByClassName("location")) {
		loc.classList.remove("hidden");
		if (shouldHide.includes(loc.id)) {
			loc.classList.add("hidden");
		}
	}
}
function settingLogic(div, count) {
	settingIterate(div, count);
	updateLocations();
	updateGroups();
	countchecks();
}
function settingHide(div, count) {
	settingIterate(div, count);
	hideToMatch();
	updateGroups();
	countchecks();
}
function settingLogicHide(div, count) {
	settingIterate(div, count);
	hideToMatch();
	updateLocations();
	updateGroups();
	countchecks();
}

// Groups
let currentGroup = "";
function groupOnClick(group) {
	currentGroup = group.id;
	itemHoverDesc.innerHTML = conIdToString(group.id);
	groupFocus(group);
}
function groupFocus(group) {
	groupBreakDown.innerHTML = group.innerHTML;
	for (let sub of groupBreakDown.getElementsByTagName("div")) {
		sub.innerHTML = "&nbsp" + conIdToString(sub.id);
		sub.onclick = function() {subOnClick(sub)};
	}
}
function updateGroups() {
	for (let group of document.getElementsByClassName("group")) {
		updateGroup(group);
	}
}
function updateGroupById(id) {
	updateGroup(document.getElementById(id));
}
function updateGroup(group) {
	let hidden = true;
	let logical = false;
	let logicalevent = false;
	let possible = false;
	let possibleevent = false;
	let event = false;
	let checked = true;
	for (let sub of group.getElementsByClassName("sub")) {
		if (!sub.classList.contains("hidden")) {
			hidden = false;
			if (!sub.classList.contains("subchecked")) {
				checked = false;
				if (sub.classList.contains("sublogical")) {
					logical = true;
				}
				if (sub.classList.contains("subeventlogical")) {
					logicalevent = true;
				}
				if (sub.classList.contains("subpossible")) {
					possible = true;
				}
				if (sub.classList.contains("subeventpossible")) {
					possibleevent = true;
				}
				if (sub.classList.contains("subevent")) {
					event = true;
				}
			}
		}
	}
	if (hidden) {
		addClassName(group, "hidden");
	}
	else {
		group.classList.remove("hidden");
	}
	if (checked) {
		addClassName(group, "groupchecked");
	}
	else {
		group.classList.remove("groupchecked");
	}
	if (logicalevent) {
		setLogicClass(group, "groupeventlogical");
	}
	else if (logical) {
		setLogicClass(group, "grouplogical");
	}
	else if (possibleevent) {
		setLogicClass(group, "groupeventpossible");
	}
	else if (possible) {
		setLogicClass(group, "grouppossible");
	}
	else if (event) {
		setLogicClass(group, "groupevent")
	}
	else {
		setLogicClass(group, false);
	}
}

//subs
function subOnClick(sub) {
	groupBreakDown.innerHTML = "";
	let trueSub = document.getElementById(sub.id);
	trueSub.classList.toggle("subchecked");
	if (sub.id.includes("EVENT_")) {
		updateLocations();
	}
	updateGroups();
	countchecks();
	groupFocus(document.getElementById(currentGroup));
}

//Location Counts
function countchecks() {
	let total = 0;
	let checked = 0;
	let logical = 0;
	for (let child of map.children) {
		if (child.classList.contains("group")) {
			for (let sub of child.children) {
				if (!sub.id.includes("EVENT_") && !sub.classList.contains("hidden")) {
					total = total + 1;
					if (sub.classList.contains("subchecked")) {
						checked = checked + 1;
					}
					else if (sub.classList.contains("sublogical") || sub.classList.contains("subeventlogical")) {
						logical = logical + 1;
					}
				}
			}
		}
		else if (child.classList.contains("location")) {
			if (!child.id.includes("EVENT_") && !child.classList.contains("hidden")) {
				total = total + 1;
				if (child.classList.contains("locationchecked")) {
					checked = checked + 1;
				}
				else if (child.classList.contains("locationlogical") || child.classList.contains("locationeventlogical")) {
					logical = logical + 1;
				}
			}
		}
	}
	CHECK_CHECKED.innerHTML = checked;
	CHECK_LOGICAL.innerHTML = logical;
	CHECK_TOTAL.innerHTML = total;
}

//Parse URL inputs
function setSettingClass(div, className) {
	div.classList.remove("_0", "_1", "_2", "_3", "_4", "_5", "_6", "_7", "_8", "_9", "_10", "_11", "_12", "_13", "_14", "_15", "_16");
	if (className) {
		div.classList.add(className);
	}
}
function parseSettings() {
	const urlSearch = new URLSearchParams(window.location.search);
	for (const [key, value] of urlSearch) {
		let div = document.getElementById(key);
		if (div) {
			setSettingClass(div, "_" + value);
		}
	}

	if (urlSearch.get("name") && urlSearch.get("port")) {
		aname = urlSearch.get("name");
		aport = urlSearch.get("port");
		if (urlSearch.get("host")) {
			ahost = urlSearch.get("host");
		}
		if (urlSearch.get("pass")) {
			apass = urlSearch.get("pass");
		}
	}
}