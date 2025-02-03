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
const hiddenClasses = ["hiddenhidden", "victoryhidden", "kantohidden"];

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
function ishidden(div) {
	for (let i of hiddenClasses) {
		if (div.classList.contains(i)) {
			return true;
		}
	}
	return false;
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
	let count = parseInt(setting.classList[1].substring(1), 10);
	setting.classList.remove(setting.classList[1]);
	count = count + 1;
	if (count > max) {
		count = 0;
	}
	setting.classList.add("_" + count);
}
function ifTrueAddClass(div, shouldAddClass, className) {
	if (shouldAddClass) {
		addClassName(div, className);
	}
	else {
		div.classList.remove(className);
	}
}

//Settings - items in logic
function hideToMatch(div, prefix) {
	let show = parseInt(div.classList[1].substring(1), 10);
	for (let location of document.getElementsByClassName("location")) {
		if (location.id.includes(prefix)) {
			ifTrueAddClass(location, !show, hiddenClasses[0]);
		}
	}
	for (let sub of document.getElementsByClassName("sub")) {
		//TM10_HIDDEN_POWER is not "hidden" despite the name
		if (sub.id.includes(prefix) && sub.id !== "TM10_HIDDEN_POWER") {
			ifTrueAddClass(sub, !show, hiddenClasses[0]);
		}
	}
	//CERULEAN_CITY_BERSERK_GENE is a "hidden" item
	if ("_HIDDEN_" === prefix) {
		ifTrueAddClass(CERULEAN_CITY_BERSERK_GENE, !show, hiddenClasses[0]);
	}
}
function settingOnClick(div, prefix) {
	settingIterate(div, 1);
	hideToMatch(div, prefix);
	updateGroups();
	countchecks();
}
function settingIterateOnClick(div, count) {
	settingIterate(div, count);
	updateLocations();
	updateGroups();
	countchecks();
}
function hideToMatchKanto(div) {
	const set = parseInt(div.classList[1].substring(1), 10);
	let showKanto = true;
	let showSilver = true;
	if (set) {
		showKanto = false;
		if (set === 1) {
			setSettingClass(Goal, "_0");
			hideToMatchGoal(Goal);
			showSilver = false;
		}
	}
	for (let id of kantoLocations) {
		ifTrueAddClass(document.getElementById(id), !showKanto, hiddenClasses[2]);
	}
	for (let id of mtSilverLocations) {
		ifTrueAddClass(document.getElementById(id), !showSilver, hiddenClasses[2]);
	}
}
function ranomizeKantoOnClick(div) {
	settingIterate(div, 2);
	groupBreakDown.innerHTML = "";
	hideToMatchKanto(div);
	updateLocations();
	updateGroups();
	countchecks();
	if (currentGroup) {
		groupFocus(document.getElementById(currentGroup));
	}
}
function hideToMatchGoal(div) {
	const isRed = parseInt(div.classList[1].substring(1), 10);
	for (let id of postE4Locations) {
		ifTrueAddClass(document.getElementById(id), !isRed, hiddenClasses[1]);
	}
}
function goalOnClick(div) {
	if (parseInt(RandomizeKanto.classList[1].substring(1), 10) == 1) {
		return;
	}
	settingIterate(div, 1);
	groupBreakDown.innerHTML = "";
	hideToMatchGoal(div);
	updateGroups();
	countchecks();
	if (currentGroup) {
		groupFocus(document.getElementById(currentGroup));
	}
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
		if (!ishidden(sub)) {
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
				if (!sub.id.includes("EVENT_") && !ishidden(sub)) {
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
			if (!child.id.includes("EVENT_") && !ishidden(child)) {
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
	if (isIntLessThan(urlSearch.get("bt"), 1)) {
		setSettingClass(RandomizeBerryTrees, "_" + urlSearch.get("bt"));
	}
	if (isIntLessThan(urlSearch.get("hi"), 1)) {
		setSettingClass(RandomizeHiddenItems, "_" + urlSearch.get("hi"));
	}
	if (isIntLessThan(urlSearch.get("jo"), 2)) {
		setSettingClass(RandomizeKanto, "_" + urlSearch.get("jo"));
	}
	if (isIntLessThan(urlSearch.get("vr"), 16)) {
		setSettingClass(EliteFourBadges, "_" + urlSearch.get("vr"));
	}
	if (isIntLessThan(urlSearch.get("ms"), 16)) {
		setSettingClass(RedBadges, "_" + urlSearch.get("ms"));
	}
	if (isIntLessThan(urlSearch.get("g"), 1)) {
		setSettingClass(Goal, "_" + urlSearch.get("g"));
	}

	if (urlSearch.get("name") && urlSearch.get("port")) {
		pname = urlSearch.get("name");
		aport = urlSearch.get("port");
	}
}