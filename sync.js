let ahost = "archipelago.gg";
let aport = false;
let aname = false;
let apass = "";

function connect() {
	if (!aport || !aname) {
		return;
	}
	socket = new WebSocket("wss://" + ahost + ":" + aport);

	socket.addEventListener('open', function (event) {
		socket.send(`[{
			"cmd" : "Connect",
			"password" : "` + apass + `",
			"game" : "Pokemon Crystal",
			"name" : "` + aname + `",
			"tags" : ["Tracker"],
			"version" : {
				"major": 0,
				"minor": 6,
				"build": 7,
				"class": "Version"
			},
			"items_handling" : 7,
			"uuid" : "a1c0aac5-01e5-4957-99fe-6ae9edeafa78"
		}]`);
	});

	let slot = -1;
	socket.addEventListener('message', function (event) {
		const message = JSON.parse(event.data);
		console.log(message);
		let commands = [];
		for (let command of message) {
			commands.push(command.cmd);
		}

		// seems to be an initial connect response
		if (commands.includes("Connected")) {
			for (let command of message) {
				if (command.cmd === "Connected") {
					// Save slot for later
					slot = command.slot;
					// for each "checked_location"
					if (currentGroup) {
						groupBreakDown.innerHTML = "";
					}
					for (let location of command.checked_locations) {
						gotLocation(location);
					}
					if (currentGroup) {
						groupFocus(document.getElementById(currentGroup));
					}
					settingsFromSlotData(command.slot_data);
					updateLocations();
					updateGroups();
					countchecks();
				}
				// For each recieved item
				else if (command.cmd === "ReceivedItems") {
					if (currentGroup) {
						groupBreakDown.innerHTML = "";
					}
					for (let item of command.items) {
						gotItem(item.item);
					}
					if (currentGroup) {
						groupFocus(document.getElementById(currentGroup));
					}
					updateLocations();
					updateGroups();
					countchecks();
				}
			}
		}
		// on the fly
		else if (commands.includes("PrintJSON")) {
			for (let command of message) {
				if (command.cmd === "PrintJSON" && command.type === "ItemSend") {
					if (currentGroup) {
						groupBreakDown.innerHTML = "";
					}
					//I checked the location
					if (command.item.player === slot) {
						gotLocation(command.item.location);
					}
					//I recieved the item
					if (command.receiving === slot) {
						gotItem(command.item.item);
					}
					if (currentGroup) {
						groupFocus(document.getElementById(currentGroup));
					}
					updateLocations();
					updateGroups();
					countchecks();
				}
			}
		}
	});
}

function gotItem(id) {
	let itemName = idToItem[id];
	if (itemName) {
		let itemDiv = document.getElementById(itemName);
		if (itemDiv) {
			addClassName(document.getElementById(itemName), "itemchecked");
		}
		else {
			console.log("Unknown Item: " + itemName);
		}
	}
}

function gotLocation(id) {
	let locationName = idToLocation[id];
	if (locationName) {
		let div = document.getElementById(locationName);
		if (div.classList.contains("sub")) {
			addClassName(document.getElementById(locationName), "subchecked");
		}
		else {
			addClassName(document.getElementById(locationName), "locationchecked");
		}
	}
	let eventName = idToEvent[id];
	if (eventName) {
		let div = document.getElementById(eventName);

		if (div.classList.contains("sub")) {
			addClassName(document.getElementById(eventName), "subchecked");
		}
		else {
			addClassName(document.getElementById(eventName), "locationchecked");
		}

	}
}

function settingsFromSlotData(slotData) {
	for (const setting of document.getElementsByClassName("setting")) {
		if (slotData[setting.id] != null) {
			setSettingClass(setting, "_" + slotData[setting.id]);
		}
	}
	setSettingClass(saffron_gatehouse_tea_north, "_" + slotData["tea_north"]);
	setSettingClass(saffron_gatehouse_tea_east, "_" + slotData["tea_east"]);
	setSettingClass(saffron_gatehouse_tea_south, "_" + slotData["tea_south"]);
	setSettingClass(saffron_gatehouse_tea_west, "_" + slotData["tea_west"]);
	if (slotData["hiddenitem_logic"] < 3) {
		setSettingClass(randomize_hidden_items, "_0");
	}
	else {
		setSettingClass(randomize_hidden_items, "_1");
	}
	if (slotData["hiddenitem_logic"] === 0 || slotData["hiddenitem_logic"] === 3) {
		setSettingClass(require_itemfinder, "_0");
	}
	else if (slotData["hiddenitem_logic"] === 1 || slotData["hiddenitem_logic"] === 4) {
		setSettingClass(require_itemfinder, "_1");
	}
	else if (slotData["hiddenitem_logic"] === 2 || slotData["hiddenitem_logic"] === 5) {
		setSettingClass(require_itemfinder, "_2");
	}
	if (slotData["goal"] > 1) {
		setSettingClass(goal, "_1");
	}
	if (slotData["randomize_badges"] > 1) {
		setSettingClass(randomize_badges, "_1");
	}
	if (slotData["randomize_pokedex"] > 1) {
		setSettingClass(randomize_pokedex, "_1");
	}
	if (slotData["randomize_pokemon_requests"] === 2) {
		setSettingClass(randomize_pokemon_requests, "_0");
	}
	else if (slotData["randomize_pokemon_requests"] === 3) {
		setSettingClass(randomize_pokemon_requests, "_1");
	}
	if (slotData["randomize_phone_call_items"] > 1) {
		setSettingClass(randomize_phone_call_items, "_1");
	}
	hideToMatch();
}