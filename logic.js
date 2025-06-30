function has(item) {
	const itemdiv = document.getElementById(item);
	if (!itemdiv) {
		return false;
	}
	if (itemdiv.classList.contains("locationchecked") || 
		   itemdiv.classList.contains("itemchecked") ||
		   itemdiv.classList.contains("subchecked")) {
		return "logical";
	}
}

function count_badges() {
	let count = 0;
	const badges = ["THUNDER_BADGE", "MARSH_BADGE", "CASCADE_BADGE", "RAINBOW_BADGE", "SOUL_BADGE", "BOULDER_BADGE", "VOLCANO_BADGE", "EARTH_BADGE",
					"ZEPHYR_BADGE", "HIVE_BADGE", "PLAIN_BADGE", "FOG_BADGE", "STORM_BADGE", "MINERAL_BADGE", "GLACIER_BADGE", "RISING_BADGE"];
	for (const badge of badges) {
		if (has(badge)) {
			count += 1;
		}
	}
	return count;
}
function count_gyms() {
	let count = 0;
	const badges = ["EVENT_DEFEAT_FALKNER", "EVENT_DEFEAT_BUGSY", "EVENT_DEFEAT_WHITNEY", "EVENT_DEFEAT_MORTY", "EVENT_DEFEAT_JASMINE", "EVENT_DEFEAT_CHUCK", "EVENT_DEFEAT_PRYCE",
					"EVENT_DEFEAT_BLUE", "EVENT_DEFEAT_BROCK", "EVENT_DEFEAT_MISTY", "EVENT_DEFEAT_BLAINE", "EVENT_DEFEAT_SURGE", "EVENT_DEFEAT_ERIKA", "EVENT_DEFEAT_SABRINA", "EVENT_DEFEAT_JANINE"];
	for (const badge of badges) {
		if (has(badge)) {
			count += 1;
		}
	}
	if (has("EVENT_DEFEAT_CLAIR_GYM") || has("EVENT_DEFEAT_CLAIR_SHRINE")) {
		count += 1;
	}
	return count;
}

function can_hm_region(hm, badgeJohto, badgeKanto, region) {
	if (has(hm)) {
		const badgeReq = getSettingState(hm_badge_requirements);
		if (badgeReq === 1) {
			return "logical";
		}
		else if (badgeReq === 0) {
			return has(badgeJohto);
		}
		else if (badgeReq === 2) {
			if (has(badgeJohto) || has(badgeKanto)) {
				return "logical";
			}
		}
		else {
			if (region === "johto") {
				return has(badgeJohto);
			}
			return has(badgeKanto);
		}
	}
}
function can_flash(region) {
	if (can_hm_region("HM_FLASH", "ZEPHYR_BADGE", "BOULDER_BADGE", region)) {
		return "logical";
	}
	return "possible";
}
function can_cut(region) {
	return can_hm_region("HM_CUT", "HIVE_BADGE", "CASCADE_BADGE", region)
}
function can_strength(region) {
	return can_hm_region("HM_STRENGTH", "PLAIN_BADGE", "RAINBOW_BADGE", region)
}
function can_surf(region) {
	return can_hm_region("HM_SURF", "FOG_BADGE", "SOUL_BADGE", region)
}
function can_whirlpool(region) {
	if (can_surf(region)) {
		return can_hm_region("HM_WHIRLPOOL", "GLACIER_BADGE", "VOLCANO_BADGE", region)
	}
}
function can_waterfall(region) {
	if (can_surf(region)) {
		return can_hm_region("HM_WATERFALL", "RISING_BADGE", "EARTH_BADGE", region)
	}
}

function hidden_logic() {
	const finderState = getSettingState(require_itemfinder);
	if (finderState === 0) {
		return "logical";
	}
	if (has("ITEM_ITEMFINDER")) {
		return "logical";
	}
	if (finderState === 1) {
		return "possible";
	}
}
function min(logicA, logicB) {
	if (!logicA || !logicB) {
		return;
	}
	if (logicA === "possible" || logicB === "possible") {
		return "possible";
	}
	return "logical";
}
function assess_count(req_div, count_div) {
	const req = getSettingState(req_div);
	const count = getSettingState(count_div);
	if (req === 0) {
		if (count_badges() >= count) {
			return "logical";
		}
	}
	else {
		if (count_gyms() >= count) {
			return "logical";
		}
	}
}
function saffron_tea(direction) {
	if (getSettingState(document.getElementById("saffron_gatehouse_tea_" + direction)) === 0) {
		return "logical";
	}
	return has("ITEM_TEA");
}

// Region Graph
const regions = {
	"New Bark Town": {
		"Azalea Town": function() {
			const r32 = getSettingState(route_32_condition);
			if (r32 === 4) {
				return "logical";
			}
			if (r32 === 0) {
				return has("EVENT_GET_EGG");
			}
			if (r32 === 3) {
				return has("ZEPHYR_BADGE");
			}
			if (r32 === 1 && count_badges() > 0) {
				return "logical";
			}
			if (r32 === 2 && count_gyms() > 0) {
				return "logical";
			}
		},
		"Ecruteak City": function() {
			return has("ITEM_SQUIRTBOTTLE");
		},
		"Goldenrod City": function() {
			return has("ITEM_SQUIRTBOTTLE");
		},
		"Blackthorn City": function() {
			if (getSettingState(blackthorn_dark_cave_access) === 1) {
				if (can_waterfall("johto")) {
					return can_flash("johto");
				}
			}
		},
		"Tohjo": function() {
			return can_waterfall("johto");
		},
		"Route 46": function() {
			if (has("ITEM_TM_ROCK_SMASH")) {
				return can_flash("johto");
			}
		}
	},
	"Azalea Town": {
		"New Bark Town": function() {
			return "logical";
		},
		"Goldenrod City": function() {
			if (getSettingState(remove_ilex_cut_tree) === 1) {
				return "logical";
			}
			return can_cut("johto");
		}
	},
	"Goldenrod City": {
		"New Bark Town": function() {
			return has("ITEM_SQUIRTBOTTLE");
		},
		"Ecruteak City": function() {
			return has("ITEM_SQUIRTBOTTLE");
		},
		"Azalea Town": function() {
			if (getSettingState(remove_ilex_cut_tree) === 1) {
				return "logical";
			}
			return can_cut("johto");
		},
		"Saffron City": function() {
			if (getSettingState(johto_only) === 0) {
				return has("ITEM_PASS");
			}
		}
	},
	"Ecruteak City": {
		"New Bark Town": function() {
			return has("ITEM_SQUIRTBOTTLE");
		},
		"Goldenrod City": function() {
			return has("ITEM_SQUIRTBOTTLE");
		},
		"Cianwood City": function() {
			return can_surf("johto");
		},
		"Route 44": function() {
			return assess_count(route_44_access_requirement, route_44_access_count);
		},
		"Vermilion City": function() {
			if (getSettingState(johto_only) === 0) {
				return has("ITEM_S_S_TICKET");
			}
		}
	},
	"Cianwood City": {
		"Ecruteak City": function() {
			return can_surf("johto");
		}
	},
	"Route 44": {
		"Ecruteak City": function() {
			return "logical";
		},
		"Blackthorn City": function() {
			return can_strength("johto");
		}
	},
	"Blackthorn City": {
		"Ecruteak City": function() {
			return "logical";
		},
		"New Bark Town": function() {
			return "logical";
		},
		"Route 44": function() {
			return can_strength("johto");
		},
		"Route 46": function() {
			return "logical";
		}
	},
	"Route 46": {
		"New Bark Town": function() {
			return "logical";
		}
	},
	"Tohjo": {
		"New Bark Town": function() {
			return can_waterfall("johto");
		},
		"Viridian City": function() {
			if (getSettingState(johto_only) === 0) {
				const req = getSettingState(kanto_access_requirement);
				if (req === 0) {
					// TODO - do we need to talk to Oak or just Wake Snorlax?
					return false;
				}
				if (req === 3) {
					return has("EVENT_DEFEAT_LANCE");
				}
				const count = getSettingState(kanto_access_count);
				if (req === 1) {
					if (count_badges() >= count) {
						return "logical";
					}
				}
				else {
					if (count_gyms() >= count) {
						return "logical";
					}
				}
			}
		},
		"Mt Silver": function() {
			const johtoOnly = getSettingState(johto_only);
			if (johtoOnly === 0 || johtoOnly === 2) {
				return assess_count(mt_silver_requirement, mt_silver_count);
			}
		},
		"Elite Four": function() {
			return assess_count(elite_four_requirement, elite_four_count);
		}
	},
	"Mt Silver": {
		"Tohjo": function() {
			return "logical";
		}
	},
	"Elite Four": {
		"Tohjo": function() {
			return "logical";
		}
	},
	"Viridian City": {
		"Tohjo": function() {
			return "logical";
		},
		"Cinnabar Island": function() {
			return can_surf("kanto");
		},
		"Diglett Cave": function() {
			if (getSettingState(route_2_access) === 2) {
				return "logical";
			}
			return can_cut("kanto");
		}
	},
	"Cinnabar Island": {
		"Viridian City": function() {
			return can_surf("kanto");
		},
		"Fuchsia City": function() {
			return can_surf("kanto");
		}
	},
	"Fuchsia City": {
		"Cinnabar Island": function() {
			// Maybe add a "already been" check?
			return false;
		},
		"Celadon City": function() {
			if (has("ITEM_BICYCLE")) {
				return "logical";
			}
			if (getSettingState(east_west_underground) === 1) {
				const power = getSettingState(undergrounds_require_power);
				if (power === 1 || power === 3) {
					return "logical";
				}
				return has("EVENT_RESTORED_POWER");
			}
		},
		"Saffron City": function() {
			return saffron_tea("east");
		},
		"Vermilion City": function() {
			if (has("ITEM_RADIO_CARD") && has("ITEM_EXPN_CARD") && has("ITEM_POKE_GEAR")) {
				return "logical";
			}
		},
		"Route 10": function() {
			return can_flash("kanto");
		}
	},
	"Celadon City": {
		"Fuchsia City": function() {
			if (has("ITEM_BICYCLE")) {
				return "logical";
			}
			if (getSettingState(east_west_underground) === 1) {
				const power = getSettingState(undergrounds_require_power);
				if (power === 1 || power === 3) {
					return "logical";
				}
				return has("EVENT_RESTORED_POWER");
			}
		},
		"Saffron City": function() {
			return saffron_tea("west");
		}
	},
	"Saffron City": {
		"Cerulean City": function() {
			return saffron_tea("north");
		},
		"Fuchsia City": function() {
			return saffron_tea("east");
		},
		"Vermilion City": function() {
			return saffron_tea("south");
		},
		"Celadon City": function() {
			return saffron_tea("west");
		},
		"Goldenrod City": function() {
			return has("ITEM_PASS");
		}
	},
	"Vermilion City": {
		"Cerulean City": function() {
			const power = getSettingState(undergrounds_require_power);
			if (power === 2 || power === 3) {
				return "logical";
			}
			return has("EVENT_RESTORED_POWER");
		},
		"Saffron City": function() {
			return saffron_tea("north");
		},
		"Diglett Cave": function() {
			if (has("ITEM_RADIO_CARD") && has("ITEM_EXPN_CARD") && has("ITEM_POKE_GEAR")) {
				return "logical";
			}
		},
		"Fuchsia City": function() {
			if (has("ITEM_RADIO_CARD") && has("ITEM_EXPN_CARD") && has("ITEM_POKE_GEAR")) {
				return "logical";
			}
		}
	},
	"Diglett Cave": {
		"Vermilion City": function() {
			if (has("ITEM_RADIO_CARD") && has("ITEM_EXPN_CARD") && has("ITEM_POKE_GEAR")) {
				return "logical";
			}
		},
		"Viridian City": function() {
			if (getSettingState(route_2_access) === 0) {
				return can_cut("kanto");
			}
			return "logical";
		}
	},
	"Route 10": {
		"Fuchsia City": function() {
			return can_flash("kanto");
		},
		"Cerulean City": function() {
			return can_cut("kanto");
		}
	},
	"Cerulean City": {
		"Route 10": function() {
			return can_cut("kanto");
		},
		"Saffron City": function() {
			return saffron_tea("north");
		},
		"Vermilion City": function() {
			const power = getSettingState(undergrounds_require_power);
			if (power === 2 || power === 3) {
				return "logical";
			}
			return has("EVENT_RESTORED_POWER");
		}
	}
};
function evaluate_graph_logical() {
	const startingRegion = "New Bark Town";
	let tobe = [startingRegion];
	let been = [startingRegion];
	while (tobe.length > 0) {
		const nextRegion = tobe.pop();
		if (regions[nextRegion]) {
			for (const [key, value] of Object.entries(regions[nextRegion])) {
				if (value() === "logical" && !been.includes(key)) {
					tobe.push(key);
					been.push(key);
				}
			}
		}
	}
	return been;
}
function evaluate_graph_possible() {
	const startingRegion = "New Bark Town";
	let tobe = [startingRegion];
	let been = [startingRegion];
	while (tobe.length > 0) {
		const nextRegion = tobe.pop();
		if (regions[nextRegion]) {
			for (const [key, value] of Object.entries(regions[nextRegion])) {
				if (value() && !been.includes(key)) {
					tobe.push(key);
					been.push(key);
				}
			}
		}
	}
	return been;
}
let logicalRegions = [];
let possibleRegions = [];
function revaluate() {
	logicalRegions = evaluate_graph_logical();
	possibleRegions = evaluate_graph_possible();
}
function can_reach(region) {
	if (logicalRegions.includes(region)) {
		return "logical";
	}
	if (possibleRegions.includes(region)) {
		return "possible"
	}
}

// Quick helpers
function can_tin_tower() {
	if (has("ITEM_CLEAR_BELL") && has("ITEM_RAINBOW_WING")) {
		return can_reach("Ecruteak City");
	}
}
function can_rocket_hideout() {
	if (has("EVENT_AGREED_TO_ASSIST_LANCE")) {
		return can_reach("Ecruteak City");
	}
}
function can_dragons_den() {
	if (can_surf("johto")) {
		if (getSettingState(vanilla_clair) === 1) {
			if (can_strength("johto")) {
				return can_reach("Blackthorn City");
			}
		}
		if (has("EVENT_DEFEAT_CLAIR_GYM")) {
			return can_reach("Blackthorn City");
		}
	}
}
function can_whirl_islands() {
	if (can_whirlpool("johto")) {
		return min(can_flash("johto"), can_reach("Ecruteak City"));
	}
}

const locationHighlight = {}

const locationLogic = {
	// ////////////////////
	// Cities
	// ////////////////////
	// New Bark Town
	"MASTER_BALL_FROM_ELM": function() {
		if (has("RISING_BADGE")) {
			return can_reach("New Bark Town");
		}
	},
	"SS_TICKET_FROM_ELM": function() {
		if (has("EVENT_DEFEAT_LANCE")) {
			return can_reach("New Bark Town");
		}
	},
	"POTION_FROM_ELMS_AIDE": function() {
		return can_reach("New Bark Town");
	},
	"POKE_BALL_FROM_ELMS_AIDE": function() {
		if (has("ITEM_MYSTERY_EGG")) {
			return can_reach("New Bark Town");
		}
	},
	"POKEGEAR": function() {
		return can_reach("New Bark Town");
	},
	// Cherrygrove
	"MYSTIC_WATER_IN_CHERRYGROVE": function() {
		if (can_surf("johto")) {
			return can_reach("New Bark Town");
		}
	},
	"MAP_CARD": function() {
		return can_reach("New Bark Town");
	},
	// Violet City
	"SPROUT_TOWER_1F_PARLYZ_HEAL": function() {
		return can_reach("New Bark Town");
	},
	"SPROUT_TOWER_2F_X_ACCURACY": function() {
		return can_reach("New Bark Town");
	},
	"SPROUT_TOWER_3F_ESCAPE_ROPE": function() {
		return can_reach("New Bark Town");
	},
	"SPROUT_TOWER_3F_POTION": function() {
		return can_reach("New Bark Town");
	},
	"HM05_FLASH": function() {
		return can_reach("New Bark Town");
	},
	"FRUITTREE_VIOLET_CITY": function() {
		return can_reach("New Bark Town");
	},
	"VIOLET_CITY_HIDDEN_HYPER_POTION": function() {
		return min(hidden_logic(), can_reach("New Bark Town"));
	},
	"VIOLET_CITY_PP_UP": function() {
		if (can_surf("johto")) {
			return can_reach("New Bark Town");
		}
	},
	"VIOLET_CITY_RARE_CANDY": function() {
		if (can_surf("johto")) {
			return can_reach("New Bark Town");
		}
	},
	"EVENT_DEFEAT_FALKNER": function() {
		return can_reach("New Bark Town");
	},
	"ZEPHYR_BADGE_FROM_FALKNER": function() {
		return can_reach("New Bark Town");
	},
	"TM31_MUD_SLAP": function() {
		return can_reach("New Bark Town");
	},
	"EVENT_GET_EGG": function() {
		return can_reach("New Bark Town");
	},
	// Azalea Town
	"EVENT_DEFEAT_BUGSY": function() {
		if (has("EVENT_HELP_KURT")) {
			return can_reach("Azalea Town");
		}
	},
	"HIVE_BADGE_FROM_BUGSY": function() {
		if (has("EVENT_HELP_KURT")) {
			return can_reach("Azalea Town");
		}
	},
	"TM49_FURY_CUTTER": function() {
		if (has("EVENT_HELP_KURT")) {
			return can_reach("Azalea Town");
		}
	},
	"FRUITTREE_AZALEA_TOWN": function() {
		return can_reach("Azalea Town");
	},
	"EVENT_HELP_KURT": function() {
		return can_reach("Azalea Town");
	},
	"KURT_GAVE_YOU_LURE_BALL": function() {
		return can_reach("Azalea Town");
	},
	"CHARCOAL_IN_CHARCOAL_KILN": function() {
		return can_reach("Azalea Town");
	},
	"AZALEA_TOWN_HIDDEN_FULL_HEAL": function() {
		return min(hidden_logic(), can_reach("Azalea Town"));
	},
	"SLOWPOKE_WELL_B1F_SUPER_POTION": function() {
		return can_reach("Azalea Town");
	},
	"SLOWPOKE_WELL_B2F_TM_RAIN_DANCE": function() {
		if (can_surf("johto") && can_strength("johto")) {
			return can_reach("Azalea Town");
		}
	},
	"KINGS_ROCK_IN_SLOWPOKE_WELL": function() {
		if (can_surf("johto") && can_strength("johto")) {
			return can_reach("Azalea Town");
		}
	},
	// Goldenrod City
	"BICYCLE": function() {
		return can_reach("Goldenrod City");
	},
	"TM27_RETURN": function() {
		return can_reach("Goldenrod City");
	},
	"TM21_FRUSTRATION": function() {
		return can_reach("Goldenrod City");
	},
	"GOLDENROD_DEPT_STORE_B1F_BURN_HEAL": function() {
		return can_reach("Goldenrod City");
	},
	"GOLDENROD_DEPT_STORE_B1F_ETHER": function() {
		return can_reach("Goldenrod City");
	},
	"GOLDENROD_DEPT_STORE_B1F_ULTRA_BALL": function() {
		return can_reach("Goldenrod City");
	},
	"GOLDENROD_DEPT_STORE_B1F_AMULET_COIN": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return can_reach("Goldenrod City");
		}
	},
	"SQUIRTBOTTLE": function() {
		if (has("PLAIN_BADGE")) {
			return can_reach("Goldenrod City");
		}
	},
	"EVENT_DEFEAT_WHITNEY": function() {
		return can_reach("Goldenrod City");
	},
	"PLAIN_BADGE_FROM_WHITNEY": function() {
		return can_reach("Goldenrod City");
	},
	"TM45_ATTRACT": function() {
		return can_reach("Goldenrod City");
	},
	"GOLDENROD_UNDERGROUND_COIN_CASE": function() {
		return can_reach("Goldenrod City");
	},
	"GOLDENROD_UNDERGROUND_HIDDEN_ANTIDOTE": function() {
		return min(hidden_logic(), can_reach("Goldenrod City"));
	},
	"GOLDENROD_UNDERGROUND_HIDDEN_PARLYZ_HEAL": function() {
		return min(hidden_logic(), can_reach("Goldenrod City"));
	},
	"GOLDENROD_UNDERGROUND_HIDDEN_SUPER_POTION": function() {
		return min(hidden_logic(), can_reach("Goldenrod City"));
	},
	"GOLDENROD_UNDERGROUND_SWITCH_ROOM_ENTRANCES_FULL_HEAL": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return can_reach("Goldenrod City");
		}
	},
	"GOLDENROD_UNDERGROUND_SWITCH_ROOM_ENTRANCES_HIDDEN_MAX_POTION": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return min(hidden_logic(), can_reach("Goldenrod City"));
		}
	},
	"GOLDENROD_UNDERGROUND_SWITCH_ROOM_ENTRANCES_HIDDEN_REVIVE": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return min(hidden_logic(), can_reach("Goldenrod City"));
		}
	},
	"GOLDENROD_UNDERGROUND_SWITCH_ROOM_ENTRANCES_SMOKE_BALL": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return can_reach("Goldenrod City");
		}
	},
	"GOLDENROD_UNDERGROUND_WAREHOUSE_MAX_ETHER": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return can_reach("Goldenrod City");
		}
	},
	"GOLDENROD_UNDERGROUND_WAREHOUSE_TM_SLEEP_TALK": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return can_reach("Goldenrod City");
		}
	},
	"GOLDENROD_UNDERGROUND_WAREHOUSE_ULTRA_BALL": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return can_reach("Goldenrod City");
		}
	},
	"RECEIVED_CARD_KEY": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return can_reach("Goldenrod City");
		}
	},
	"RADIO_CARD": function() {
		return can_reach("Goldenrod City");
	},
	"BUENA_BLUE_CARD": function() {
		return can_reach("Goldenrod City");
	},
	"SUNNY_DAY_FROM_RADIO_TOWER": function() {
		if (has("EVENT_CLEARED_RADIO_TOWER")) {
			return can_reach("Goldenrod City");
		}
	},
	"PINK_BOW_FROM_MARY": function() {
		if (has("EVENT_CLEARED_RADIO_TOWER")) {
			return can_reach("Goldenrod City");
		}
	},
	"BEAT_ROCKET_EXECUTIVEM_3": function() {
		if (can_reach("Goldenrod City")) {
			return assess_count(radio_tower_requirement, radio_tower_count);
		}
	},
	"RADIO_TOWER_5F_ULTRA_BALL": function() {
		if (has("ITEM_CARD_KEY") && can_reach("Goldenrod City")) {
			return assess_count(radio_tower_requirement, radio_tower_count);
		}
	},
	"CLEAR_BELL": function() {
		if (has("ITEM_CARD_KEY") && can_reach("Goldenrod City")) {
			return assess_count(radio_tower_requirement, radio_tower_count);
		}
	},
	"EVENT_CLEARED_RADIO_TOWER": function() {
		if (has("ITEM_CARD_KEY") && can_reach("Goldenrod City")) {
			return assess_count(radio_tower_requirement, radio_tower_count);
		}
	},
	"GS_BALL_FROM_GOLDENROD_POKEMON_CENTER": function() {
		if (has("EVENT_DEFEAT_LANCE")) {
			return can_reach("Goldenrod City");
		}
	},
	// Ecruteak City
	"BURNED_TOWER_1F_HIDDEN_ETHER": function() {
		return min(hidden_logic(), can_reach("Ecruteak City"));
	},
	"BURNED_TOWER_1F_HIDDEN_ULTRA_BALL": function() {
		return min(hidden_logic(), can_reach("Ecruteak City"));
	},
	"BURNED_TOWER_1F_HP_UP": function() {
		if (has("ITEM_TM_ROCK_SMASH")) {
			return can_reach("Ecruteak City");
		}
	},
	"BURNED_TOWER_B1F_TM_ENDURE": function() {
		if (can_strength("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"HM03_SURF": function() {
		return can_reach("Ecruteak City");
	},
	"ECRUTEAK_CITY_HIDDEN_HYPER_POTION": function() {
		return min(hidden_logic(), can_reach("Ecruteak City"));
	},
	"EVENT_DEFEAT_MORTY": function() {
		return can_reach("Ecruteak City");
	},
	"FOG_BADGE_FROM_MORTY": function() {
		return can_reach("Ecruteak City");
	},
	"TM30_SHADOW_BALL": function() {
		return can_reach("Ecruteak City");
	},
	"ITEMFINDER": function() {
		return can_reach("Ecruteak City");
	},
	"TIN_TOWER_3F_FULL_HEAL": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_4F_ESCAPE_ROPE": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_4F_HIDDEN_MAX_POTION": function() {
		return min(hidden_logic(), can_tin_tower());
	},
	"TIN_TOWER_4F_PP_UP": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_4F_ULTRA_BALL": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_5F_HIDDEN_CARBOS": function() {
		return min(hidden_logic(), can_tin_tower());
	},
	"TIN_TOWER_5F_HIDDEN_FULL_RESTORE": function() {
		return min(hidden_logic(), can_tin_tower());
	},
	"TIN_TOWER_5F_RARE_CANDY": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_6F_MAX_POTION": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_7F_MAX_REVIVE": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_8F_FULL_RESTORE": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_8F_MAX_ELIXER": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_8F_NUGGET": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_9F_HP_UP": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_1F_RAINBOW_WING": function() {
		if (has("EVENT_DEFEAT_LANCE")) {
			return can_tin_tower();
		}
	},
	// Olivine City
	"METAL_COAT_FROM_GRANDPA_ON_SS_AQUA": function() {
		if (has("ITEM_S_S_TICKET")) {
			return can_reach("Ecruteak City");
		}
	},
	"HM04_STRENGTH": function() {
		return can_reach("Ecruteak City");
	},
	"GOOD_ROD": function() {
		return can_reach("Ecruteak City");
	},
	"EVENT_DEFEAT_JASMINE": function() {
		if (has("ITEM_SECRETPOTION")) {
			return can_reach("Ecruteak City");
		}
	},
	"MINERAL_BADGE_FROM_JASMINE": function() {
		if (has("ITEM_SECRETPOTION")) {
			return can_reach("Ecruteak City");
		}
	},
	"TM23_IRON_TAIL": function() {
		if (has("ITEM_SECRETPOTION")) {
			return can_reach("Ecruteak City");
		}
	},
	"OLIVINE_LIGHTHOUSE_3F_ETHER": function() {
		return can_reach("Ecruteak City");
	},
	"OLIVINE_LIGHTHOUSE_5F_RARE_CANDY": function() {
		return can_reach("Ecruteak City");
	},
	"OLIVINE_LIGHTHOUSE_5F_SUPER_REPEL": function() {
		return can_reach("Ecruteak City");
	},
	"OLIVINE_LIGHTHOUSE_5F_TM_SWAGGER": function() {
		return can_reach("Ecruteak City");
	},
	"OLIVINE_LIGHTHOUSE_5F_HIDDEN_HYPER_POTION": function() {
		return min(hidden_logic(), can_reach("Ecruteak City"));
	},
	"OLIVINE_LIGHTHOUSE_6F_SUPER_POTION": function() {
		return can_reach("Ecruteak City");
	},
	"OLIVINE_PORT_HIDDEN_PROTEIN": function() {
		if (can_surf("johto") && has("ITEM_S_S_TICKET")) {
			return min(hidden_logic(), can_reach("Ecruteak City"));
		}
	},
	// Cianwood City
	"CIANWOOD_CITY_HIDDEN_MAX_ETHER": function() {
		if (has("ITEM_TM_ROCK_SMASH")) {
			return min(hidden_logic(), can_reach("Cianwood City"));
		}
	},
	"CIANWOOD_CITY_HIDDEN_REVIVE": function() {
		if (has("ITEM_TM_ROCK_SMASH")) {
			return min(hidden_logic(), can_reach("Cianwood City"));
		}
	},
	"EVENT_DEFEAT_CHUCK": function() {
		if (can_strength("johto")) {
			return can_reach("Cianwood City");
		}
	},
	"STORM_BADGE_FROM_CHUCK": function() {
		if (can_strength("johto")) {
			return can_reach("Cianwood City");
		}
	},
	"TM01_DYNAMICPUNCH": function() {
		if (can_strength("johto")) {
			return can_reach("Cianwood City");
		}
	},
	"HM02_FLY": function() {
		if (has("EVENT_DEFEAT_CHUCK")) {
			return can_reach("Cianwood City");
		}
	},
	"SECRETPOTION_FROM_PHARMACY": function() {
		return can_reach("Cianwood City");
	},
	// Mahogany Town
	"EVENT_DEFEAT_PRYCE": function() {
		if (has("EVENT_CLEARED_ROCKET_HIDEOUT")) {
			return can_reach("Ecruteak City");
		}
	},
	"GLACIER_BADGE_FROM_PRYCE": function() {
		if (has("EVENT_CLEARED_ROCKET_HIDEOUT")) {
			return can_reach("Ecruteak City");
		}
	},
	"TM16_ICY_WIND": function() {
		if (has("EVENT_CLEARED_ROCKET_HIDEOUT")) {
			return can_reach("Ecruteak City");
		}
	},
	"TEAM_ROCKET_BASE_B1F_GUARD_SPEC": function() {
		return can_rocket_hideout();
	},
	"TEAM_ROCKET_BASE_B1F_HIDDEN_REVIVE": function() {
		return min(hidden_logic(), can_rocket_hideout());
	},
	"TEAM_ROCKET_BASE_B1F_HYPER_POTION": function() {
		return can_rocket_hideout();
	},
	"TEAM_ROCKET_BASE_B1F_NUGGET": function() {
		return can_rocket_hideout();
	},
	"TEAM_ROCKET_BASE_B2F_HIDDEN_FULL_HEAL": function() {
		return min(hidden_logic(), can_rocket_hideout());
	},
	"TEAM_ROCKET_BASE_B2F_TM_THIEF": function() {
		return can_rocket_hideout();
	},
	"HM06_WHIRLPOOL": function() {
		return can_rocket_hideout();
	},
	"EVENT_CLEARED_ROCKET_HIDEOUT": function() {
		return can_rocket_hideout();
	},
	"TEAM_ROCKET_BASE_B3F_FULL_HEAL": function() {
		return can_rocket_hideout();
	},
	"TEAM_ROCKET_BASE_B3F_ICE_HEAL": function() {
		return can_rocket_hideout();
	},
	"TEAM_ROCKET_BASE_B3F_PROTEIN": function() {
		return can_rocket_hideout();
	},
	"TEAM_ROCKET_BASE_B3F_ULTRA_BALL": function() {
		return can_rocket_hideout();
	},
	"TEAM_ROCKET_BASE_B3F_X_SPECIAL": function() {
		return can_rocket_hideout();
	},
	// Blackthorn City
	"SPELL_TAG_FROM_SANTOS": function() {
		return can_reach("Blackthorn City");
	},
	"EVENT_DEFEAT_CLAIR_GYM": function() {
		if (has("EVENT_CLEARED_RADIO_TOWER") && can_strength("johto")) {
			return can_reach("Blackthorn City");
		}
	},
	"RISING_BADGE_FROM_CLAIR_GYM": function() {
		if (has("EVENT_CLEARED_RADIO_TOWER") && can_strength("johto")) {
			return can_reach("Blackthorn City");
		}
	},
	"TM24_DRAGONBREATH_GYM": function() {
		if (has("EVENT_CLEARED_RADIO_TOWER") && can_strength("johto")) {
			return can_reach("Blackthorn City");
		}
	},
	"EVENT_DEFEAT_CLAIR_SHRINE": function() {
		if (has("EVENT_CLEARED_RADIO_TOWER") && can_strength("johto") && can_whirlpool("johto")) {
			return can_reach("Blackthorn City");
		}
	},
	"RISING_BADGE_FROM_CLAIR_SHRINE": function() {
		if (has("EVENT_CLEARED_RADIO_TOWER") && can_strength("johto") && can_whirlpool("johto")) {
			return can_reach("Blackthorn City");
		}
	},
	"TM24_DRAGONBREATH_SHRINE": function() {
		if (has("EVENT_CLEARED_RADIO_TOWER") && can_strength("johto") && can_whirlpool("johto")) {
			return can_reach("Blackthorn City");
		}
	},
	"DRAGONS_DEN_B1F_CALCIUM": function() {
		return can_dragons_den();
	},
	"DRAGONS_DEN_B1F_HIDDEN_MAX_POTION": function() {
		return min(hidden_logic(), can_dragons_den());
	},
	"DRAGONS_DEN_B1F_MAX_ELIXER": function() {
		return can_dragons_den();
	},
	"DRAGONS_DEN_B1F_DRAGON_FANG": function() {
		if (can_whirlpool("johto")) {
			return can_dragons_den();
		}
	},
	"DRAGONS_DEN_B1F_HIDDEN_MAX_ELIXER": function() {
		if (can_whirlpool("johto")) {
			return min(hidden_logic(), can_dragons_den());
		}
	},
	"DRAGONS_DEN_B1F_HIDDEN_REVIVE": function() {
		if (can_whirlpool("johto")) {
			return min(hidden_logic(), can_dragons_den());
		}
	},

	// KANTO //
	// Pallet Town
	
	// Viridian City
	"TM42_DREAM_EATER": function() {
		if (can_surf("kanto") || can_cut("kanto")) {
			return can_reach("Viridian City");
		}
	},
	"EVENT_DEFEAT_BLUE": function() {
		return can_reach("Cinnabar Island");
	},
	"EARTH_BADGE_FROM_BLUE": function() {
		return can_reach("Cinnabar Island");
	},
	// Pewter City
	"SILVER_WING": function() {
		return can_reach("Viridian City");
	},
	"FRUITTREE_PEWTER_CITY_1": function() {
		return can_reach("Viridian City");
	},
	"FRUITTREE_PEWTER_CITY_2": function() {
		return can_reach("Viridian City");
	},
	"EVENT_DEFEAT_BROCK": function() {
		return can_reach("Viridian City");
	},
	"BOULDER_BADGE_FROM_BROCK": function() {
		return can_reach("Viridian City");
	},
	// Cerulean City
	"CERULEAN_CITY_BERSERK_GENE": function() {
		if (can_surf("kanto")) {
			return min(hidden_logic(), can_reach("Cerulean City"));
		}
	},
	"CERULEAN_GYM_MACHINE_PART": function() {
		return can_reach("Cerulean City");
	},
	"EVENT_DEFEAT_MISTY": function() {
		return can_reach("Cerulean City");
	},
	"CASCADE_BADGE_FROM_MISTY": function() {
		return can_reach("Cerulean City");
	},
	// Vermilion City
	"LISTENED_TO_FAN_CLUB_PRESIDENT": function() {
		return can_reach("Vermilion City");
	},
	"LOST_ITEM_FROM_FAN_CLUB": function() {
		if (has("EVENT_RESTORED_POWER")) {
			return can_reach("Vermilion City");
		}
	},
	"VERMILION_CITY_HIDDEN_FULL_HEAL": function() {
		if (can_surf("kanto") || can_cut("kanto")) {
			return can_reach("Vermilion City");
		}
	},
	"EVENT_DEFEAT_SURGE": function() {
		if (can_surf("kanto") || can_cut("kanto")) {
			return can_reach("Vermilion City");
		}
	},
	"THUNDER_BADGE_FROM_LTSURGE": function() {
		if (can_surf("kanto") || can_cut("kanto")) {
			return can_reach("Vermilion City");
		}
	},
	"HP_UP_FROM_VERMILION_GUY": function() {
		if (count_badges() > 15) {
			return can_reach("Vermilion City");
		}
	},
	"VERMILION_PORT_HIDDEN_IRON": function() {
		if (has("ITEM_S_S_TICKET") && can_surf("kanto")) {
			return min(hidden_logic(), can_reach("Vermilion City"));
		}
	},
	// Lavender Town
	"EXPN_CARD": function() {
		if (has("EVENT_RESTORED_POWER")) {
			return can_reach("Fuchsia City");
		}
	},
	// Celadon City
	"CELADON_CITY_HIDDEN_PP_UP": function() {
		return min(hidden_logic(), can_reach("Celadon City"));
	},
	"EVENT_DEFEAT_ERIKA": function() {
		if (can_cut("kanto")) {
			return can_reach("Celadon City");
		}
	},
	"RAINBOW_BADGE_FROM_ERIKA": function() {
		if (can_cut("kanto")) {
			return can_reach("Celadon City");
		}
	},
	"TM19_GIGA_DRAIN": function() {
		if (can_cut("kanto")) {
			return can_reach("Celadon City");
		}
	},
	"CELADON_MANSION_1F_TEA": function() {
		return can_reach("Celadon City");
	},
	"TM03_CURSE": function() {
		return can_reach("Celadon City");
	},
	"CELADON_CAFE_LEFTOVERS": function() {
		return min(hidden_logic(), can_reach("Celadon City"));
	},
	// Saffron City
	"PASS_FROM_COPYCAT": function() {
		if (has("ITEM_LOST_ITEM")) {
			return can_reach("Saffron City");
		}
	},
	"PICKED_UP_FOCUS_BAND": function() {
		return can_reach("Saffron City");
	},
	"TM29_PSYCHIC": function() {
		return can_reach("Saffron City");
	},
	"EVENT_DEFEAT_SABRINA": function() {
		return can_reach("Saffron City");
	},
	"MARSH_BADGE_FROM_SABRINA": function() {
		return can_reach("Saffron City");
	},
	"UP_GRADE": function() {
		return can_reach("Saffron City");
	},
	// Fuchsia City
	"FRUITTREE_FUCHSIA_CITY": function() {
		if (can_cut("kanto")) {
			return can_reach("Fuchsia City");
		}
	},
	"EVENT_DEFEAT_JANINE": function() {
		return can_reach("Fuchsia City");
	},
	"SOUL_BADGE_FROM_JANINE": function() {
		return can_reach("Fuchsia City");
	},
	"TM06_TOXIC": function() {
		return can_reach("Fuchsia City");
	},
	// Cinnabar Island
	"CINNABAR_ISLAND_HIDDEN_RARE_CANDY": function() {
		return min(hidden_logic(), can_reach("Cinnabar Island"));
	},
	// ////////////////////
	// Routes
	// ////////////////////
	// 1
	"FRUITTREE_ROUTE_1": function() {
		return can_reach("Viridian City");
	},
	// 2
	"ROUTE_2_DIRE_HIT": function() {
		return can_reach("Viridian City");
	},
	"ROUTE_2_HIDDEN_FULL_HEAL": function() {
		return min(hidden_logic(), can_reach("Viridian City"));
	},
	"ROUTE_2_HIDDEN_FULL_RESTORE": function() {
		return min(hidden_logic(), can_reach("Viridian City"));
	},
	"ROUTE_2_HIDDEN_MAX_ETHER": function() {
		return min(hidden_logic(), can_reach("Viridian City"));
	},
	"ROUTE_2_HIDDEN_REVIVE": function() {
		return min(hidden_logic(), can_reach("Viridian City"));
	},
	"ROUTE_2_MAX_POTION": function() {
		return can_reach("Viridian City");
	},
	"FRUITTREE_ROUTE_2": function() {
		return can_reach("Viridian City");
	},
	"ROUTE_2_CARBOS": function() {
		return can_reach("Diglett Cave");
	},
	"ROUTE_2_ELIXER": function() {
		if (can_cut("kanto")) {
			return can_reach("Diglett Cave");
		}
	},
	"NUGGET_FROM_GUY": function() {
		return can_reach("Diglett Cave");
	},
	// 3
	"MOUNT_MOON_SQUARE_HIDDEN_MOON_STONE": function() {
		if (has("ITEM_TM_ROCK_SMASH")) {
			if (getSettingState(route_3_access) === 0 || has("BOULDER_BADGE")) {
				return min(hidden_logic(), can_reach("Viridian City"))
			}
		}
	},
	// 4
	"ROUTE_4_HIDDEN_ULTRA_BALL": function() {
		if (getSettingState(route_3_access) === 0 || has("BOULDER_BADGE")) {
			return min(hidden_logic(), can_reach("Viridian City"))
		}
	},
	"ROUTE_4_HP_UP": function() {
		if (getSettingState(route_3_access) === 0 || has("BOULDER_BADGE")) {
			return can_reach("Viridian City");
		}
	},
	// 5
	"CLEANSE_TAG": function() {
		return can_reach("Cerulean City");
	},
	// 6
	"UNDERGROUND_PATH_HIDDEN_FULL_RESTORE": function() {
		if (can_reach("Vermilion City")) {
			const power = getSettingState(undergrounds_require_power);
			if (power === 2 || power === 3) {
				return hidden_logic();
			}
			return min(hidden_logic(), has("EVENT_RESTORED_POWER"));
		}
	},
	"UNDERGROUND_PATH_HIDDEN_X_SPECIAL": function() {
		if (can_reach("Vermilion City")) {
			const power = getSettingState(undergrounds_require_power);
			if (power === 2 || power === 3) {
				return hidden_logic();
			}
			return min(hidden_logic(), has("EVENT_RESTORED_POWER"));
		}
	},
	// 8
	"FRUITTREE_ROUTE_8": function() {
		return can_reach("Fuchsia City");
	},
	// 9
	"ROUTE_9_HIDDEN_ETHER": function() {
		return min(hidden_logic(), can_reach("Route 10"));
	},
	// 10
	"TM07_ZAP_CANNON": function() {
		if (has("ITEM_MACHINE_PART") && can_surf("kanto")) {
			return can_reach("Route 10");
		}
	},
	"EVENT_RESTORED_POWER": function() {
		if (has("ITEM_MACHINE_PART") && can_surf("kanto")) {
			return can_reach("Route 10");
		}
	},
	"ROCK_TUNNEL_1F_ELIXER": function() {
		return min(can_flash("kanto"), can_reach("Route 10"));
	},
	"ROCK_TUNNEL_1F_HIDDEN_X_ACCURACY": function() {
		if (can_reach("Route 10")) {
			return min(hidden_logic(), can_flash("kanto"));
		}
	},
	"ROCK_TUNNEL_1F_HIDDEN_X_DEFEND": function() {
		if (can_reach("Route 10")) {
			return min(hidden_logic(), can_flash("kanto"));
		}
	},
	"ROCK_TUNNEL_1F_TM_STEEL_WING": function() {
		return min(can_flash("kanto"), can_reach("Route 10"));
	},
	"ROCK_TUNNEL_B1F_HIDDEN_MAX_POTION": function() {
		if (can_reach("Route 10")) {
			return min(hidden_logic(), can_flash("kanto"));
		}
	},
	"ROCK_TUNNEL_B1F_IRON": function() {
		return min(can_flash("kanto"), can_reach("Route 10"));
	},
	"ROCK_TUNNEL_B1F_PP_UP": function() {
		return min(can_flash("kanto"), can_reach("Route 10"));
	},
	"ROCK_TUNNEL_B1F_REVIVE": function() {
		return min(can_flash("kanto"), can_reach("Route 10"));
	},
	// 11
	"DIGLETTS_CAVE_HIDDEN_MAX_REVIVE": function() {
		return min(hidden_logic(), can_reach("Diglett Cave"));
	},
	"ROUTE_11_HIDDEN_REVIVE": function() {
		return min(hidden_logic(), can_reach("Fuchsia City"));
	},
	"FRUITTREE_ROUTE_11": function() {
		return can_reach("Fuchsia City");
	},
	// 12
	"ROUTE_12_CALCIUM": function() {
		if (can_cut("kanto")) {
			return can_reach("Fuchsia City");
		}
	},
	"ROUTE_12_HIDDEN_ELIXER": function() {
		if (can_surf("kanto")) {
			return min(hidden_logic(), can_reach("Fuchsia City"));
		}
	},
	"ROUTE_12_NUGGET": function() {
		if (can_cut("kanto") && can_surf("kanto")) {
			return can_reach("Fuchsia City");
		}
	},
	"SUPER_ROD": function() {
		return can_reach("Fuchsia City");
	},
	// 13
	"ROUTE_13_HIDDEN_CALCIUM": function() {
		return min(hidden_logic(), can_reach("Fuchsia City"));
	},
	// 15
	"ROUTE_15_PP_UP": function() {
		if (can_cut("kanto")) {
			return can_reach("Fuchsia City");
		}
	},
	// 17
	"ROUTE_17_HIDDEN_MAX_ELIXER": function() {
		if (has("ITEM_BICYCLE")) {
			return min(hidden_logic(), can_reach("Fuchsia City"));
		}
	},
	"ROUTE_17_HIDDEN_MAX_ETHER": function() {
		if (has("ITEM_BICYCLE")) {
			return min(hidden_logic(), can_reach("Fuchsia City"));
		}
	},
	// 20
	"EVENT_DEFEAT_BLAINE": function() {
		return can_reach("Cinnabar Island");
	},
	"VOLCANO_BADGE_FROM_BLAINE": function() {
		return can_reach("Cinnabar Island");
	},
	// 23
	"VICTORY_ROAD_FULL_HEAL": function() {
		return can_reach("Elite Four");
	},
	"VICTORY_ROAD_FULL_RESTORE": function() {
		return can_reach("Elite Four");
	},
	"VICTORY_ROAD_HIDDEN_FULL_HEAL": function() {
		return min(hidden_logic(), can_reach("Elite Four"));
	},
	"VICTORY_ROAD_HIDDEN_MAX_POTION": function() {
		return min(hidden_logic(), can_reach("Elite Four"));
	},
	"VICTORY_ROAD_HP_UP": function() {
		return can_reach("Elite Four");
	},
	"VICTORY_ROAD_MAX_REVIVE": function() {
		return can_reach("Elite Four");
	},
	"VICTORY_ROAD_TM_EARTHQUAKE": function() {
		return can_reach("Elite Four");
	},
	// 25
	"ROUTE_25_HIDDEN_POTION": function() {
		return min(hidden_logic(), can_reach("Cerulean City"));
	},
	"ROUTE_25_PROTEIN": function() {
		if (can_cut("kanto")) {
			return can_reach("Cerulean City");
		}
	},
	"CLEARED_NUGGET_BRIDGE": function() {
		return can_reach("Cerulean City");
	},
	// JOHTO //
	// 26
	"ROUTE_26_MAX_ELIXER": function() {
		return can_reach("Tohjo");
	},
	"FRUITTREE_ROUTE_26": function() {
		return can_reach("Tohjo");
	},
	// 27
	"ROUTE_27_RARE_CANDY": function() {
		if (can_surf("johto")) {
			return can_reach("New Bark Town");
		}
	},
	"ROUTE_27_TM_SOLARBEAM": function() {
		if (can_whirlpool("johto")) {
			return can_reach("Tohjo");
		}
	},
	"TM37_SANDSTORM": function() {
		if (can_surf("johto")) {
			return can_reach("Tohjo");
		}
	},
	"TOHJO_FALLS_MOON_STONE": function() {
		if (can_surf("johto")) {
			return can_reach("New Bark Town");
		}
	},
	// 28
	"ROUTE_28_HIDDEN_RARE_CANDY": function() {
		if (can_cut("johto")) {
			return min(hidden_logic(), can_reach("Mt Silver"));
		}
	},
	"TM47_STEEL_WING": function() {
		if (can_cut("johto")) {
			return can_reach("Mt Silver");
		}
	},
	"SILVER_CAVE_OUTSIDE_HIDDEN_FULL_RESTORE": function() {
		if (can_surf("johto")) {
			return min(hidden_logic(), can_reach("Mt Silver"));
		}
	},
	"SILVER_CAVE_ITEM_ROOMS_FULL_RESTORE": function() {
		if (can_waterfall("johto")) {
			return min(can_flash("johto"), can_reach("Mt Silver"));
		}
	},
	"SILVER_CAVE_ITEM_ROOMS_MAX_REVIVE": function() {
		if (can_waterfall("johto")) {
			return min(can_flash("johto"), can_reach("Mt Silver"));
		}
	},
	"SILVER_CAVE_ROOM_1_ESCAPE_ROPE": function() {
		if (can_waterfall("johto")) {
			return min(can_flash("johto"), can_reach("Mt Silver"));
		}
	},
	"SILVER_CAVE_ROOM_1_HIDDEN_DIRE_HIT": function() {
		if (can_reach("Mt Silver")) {
			return min(hidden_logic(), can_flash("johto"));
		}
	},
	"SILVER_CAVE_ROOM_1_HIDDEN_ULTRA_BALL": function() {
		if (can_reach("Mt Silver")) {
			return min(hidden_logic(), can_flash("johto"));
		}
	},
	"SILVER_CAVE_ROOM_1_MAX_ELIXER": function() {
		return min(can_flash("johto"), can_reach("Mt Silver"));
	},
	"SILVER_CAVE_ROOM_1_PROTEIN": function() {
		return min(can_flash("johto"), can_reach("Mt Silver"));
	},
	"SILVER_CAVE_ROOM_1_ULTRA_BALL": function() {
		return min(can_flash("johto"), can_reach("Mt Silver"));
	},
	"SILVER_CAVE_ROOM_2_CALCIUM": function() {
		if (can_waterfall("johto")) {
			return min(can_flash("johto"), can_reach("Mt Silver"));
		}
	},
	"SILVER_CAVE_ROOM_2_HIDDEN_MAX_POTION": function() {
		return min(can_flash("johto"), can_reach("Mt Silver"));
	},
	"SILVER_CAVE_ROOM_2_PP_UP": function() {
		if (can_waterfall("johto")) {
			return min(can_flash("johto"), can_reach("Mt Silver"));
		}
	},
	"SILVER_CAVE_ROOM_2_ULTRA_BALL": function() {
		return min(can_flash("johto"), can_reach("Mt Silver"));
	},
	"EVENT_DEFEAT_RED": function() {
		if (assess_count(red_requirement, red_count)) {
			return min(can_flash("johto"), can_reach("Mt Silver"));
		}
	},
	// 29
	"ROUTE_29_POTION": function() {
		return can_reach("New Bark Town");
	},
	"PINK_BOW_FROM_TUSCANY": function() {
		if (has("ZEPHYR_BADGE")) {
			return can_reach("New Bark Town");
		}
	},
	"FRUITTREE_ROUTE_29": function() {
		return can_reach("New Bark Town");
	},
	// 30
	"MYSTERY_EGG": function() {
		return can_reach("New Bark Town");
	},
	"EXP_SHARE": function() {
		if (has("ITEM_RED_SCALE")) {
			return can_reach("New Bark Town");
		}
	},
	"ROUTE_30_HIDDEN_POTION": function() {
		return min(hidden_logic(), can_reach("New Bark Town"));
	},
	"FRUITTREE_ROUTE_30_2": function() {
		return can_reach("New Bark Town");
	},
	"FRUITTREE_ROUTE_30_1": function() {
		return can_reach("New Bark Town");
	},
	"BERRY_FROM_ROUTE_30_HOUSE": function() {
		return can_reach("New Bark Town");
	},
	"ROUTE_30_ANTIDOTE": function() {
		return can_reach("New Bark Town");
	},
	// 31
	"DARK_CAVE_VIOLET_ENTRANCE_DIRE_HIT": function() {
		if (has("ITEM_TM_ROCK_SMASH")) {
			return min(can_flash("johto"), can_reach("New Bark Town"));
		}
	},
	"DARK_CAVE_VIOLET_ENTRANCE_FULL_HEAL": function() {
		if (has("ITEM_TM_ROCK_SMASH")) {
			return min(can_flash("johto"), can_reach("New Bark Town"));
		}
	},
	"DARK_CAVE_VIOLET_ENTRANCE_HIDDEN_ELIXER": function() {
		if (has("ITEM_TM_ROCK_SMASH") && can_reach("New Bark Town")) {
			return min(hidden_logic(), can_flash("johto"));
		}
	},
	"DARK_CAVE_VIOLET_ENTRANCE_HYPER_POTION": function() {
		if (has("ITEM_TM_ROCK_SMASH")) {
			return min(can_flash("johto"), can_reach("New Bark Town"));
		}
	},
	"DARK_CAVE_VIOLET_ENTRANCE_POTION": function() {
		return min(can_flash("johto"), can_reach("New Bark Town"));
	},
	"ROUTE_31_POKE_BALL": function() {
		return can_reach("New Bark Town");
	},
	"ROUTE_31_POTION": function() {
		return can_reach("New Bark Town");
	},
	"TM50_NIGHTMARE": function() {
		return min(can_reach("Goldenrod City"), can_reach("New Bark Town"));
	},
	"EVENT_DELIVERED_KENYA": function() {
		return min(can_reach("Goldenrod City"), can_reach("New Bark Town"));
	},
	"FRUITTREE_ROUTE_31": function() {
		return can_reach("New Bark Town");
	},
	// 32
	"ROUTE_32_GREAT_BALL": function() {
		return can_reach("Azalea Town");
	},
	"ROUTE_32_HIDDEN_SUPER_POTION": function() {
		return min(hidden_logic(), can_reach("Azalea Town"));
	},
	"ROUTE_32_REPEL": function() {
		return can_reach("Azalea Town");
	},
	"TM05_ROAR": function() {
		if (can_cut("johto")) {
			return can_reach("Azalea Town");
		}
	},
	"MIRACLE_SEED_IN_ROUTE_32": function() {
		if (has("ZEPHYR_BADGE")) {
			return can_reach("New Bark Town");
		}
	},
	"OLD_ROD": function() {
		return can_reach("Azalea Town");
	},
	"POISON_BARB_FROM_FRIEDA": function() {
		return can_reach("Azalea Town");
	},
	"ROUTE_32_HIDDEN_GREAT_BALL": function() {
		return min(hidden_logic(), can_reach("Azalea Town"));
	},
	"UNION_CAVE_1F_AWAKENING": function() {
		return can_reach("Azalea Town");
	},
	"UNION_CAVE_1F_GREAT_BALL": function() {
		return can_reach("Azalea Town");
	},
	"UNION_CAVE_1F_POTION": function() {
		return can_reach("Azalea Town");
	},
	"UNION_CAVE_1F_X_ATTACK": function() {
		return can_reach("Azalea Town");
	},
	"UNION_CAVE_B1F_TM_SWIFT": function() {
		return can_reach("Azalea Town");
	},
	"UNION_CAVE_B1F_X_DEFEND": function() {
		return can_reach("Azalea Town");
	},
	"UNION_CAVE_B2F_ELIXER": function() {
		if (can_surf("johto")) {
			return can_reach("Azalea Town");
		}
	},
	"UNION_CAVE_B2F_HYPER_POTION": function() {
		if (can_surf("johto")) {
			return can_reach("Azalea Town");
		}
	},
	// 33
	"FRUITTREE_ROUTE_33": function() {
		return can_reach("Azalea Town");
	},
	// 34
	"ILEX_FOREST_ANTIDOTE": function() {
		return can_reach("Goldenrod City");
	},
	"ILEX_FOREST_ETHER": function() {
		return can_reach("Goldenrod City");
	},
	"ILEX_FOREST_HIDDEN_ETHER": function() {
		return min(hidden_logic(), can_reach("Goldenrod City"));
	},
	"ILEX_FOREST_HIDDEN_FULL_HEAL": function() {
		return min(hidden_logic(), can_reach("Goldenrod City"));
	},
	"ILEX_FOREST_HIDDEN_SUPER_POTION": function() {
		return min(hidden_logic(), can_reach("Goldenrod City"));
	},
	"ILEX_FOREST_REVIVE": function() {
		return can_reach("Azalea Town");
	},
	"ILEX_FOREST_X_ATTACK": function() {
		return can_reach("Goldenrod City");
	},
	"HM01_CUT": function() {
		return can_reach("Azalea Town");
	},
	"TM02_HEADBUTT": function() {
		return can_reach("Goldenrod City");
	},
	// 34
	"ROUTE_34_HIDDEN_SUPER_POTION": function() {
		return min(hidden_logic(), can_reach("Goldenrod City"));
	},
	"SOFT_SAND_FROM_KATE": function() {
		if (can_surf("johto")) {
			return can_reach("Goldenrod City");
		}
	},
	"TM12_SWEET_SCENT": function() {
		return can_reach("Goldenrod City");
	},
	"ROUTE_34_NUGGET": function() {
		if (can_surf("johto")) {
			return can_reach("Goldenrod City");
		}
	},
	"ROUTE_34_HIDDEN_RARE_CANDY": function() {
		if (can_surf("johto")) {
			return min(hidden_logic(), can_reach("Goldenrod City"));
		}
	},
	// 35
	"NATIONAL_PARK_HIDDEN_FULL_HEAL": function() {
		if (getSettingState(national_park_access) === 0 || has("ITEM_BICYCLE")) {
			return min(hidden_logic(), can_reach("Goldenrod City"));
		}
	},
	"NATIONAL_PARK_PARLYZ_HEAL": function() {
		if (getSettingState(national_park_access) === 0 || has("ITEM_BICYCLE")) {
			return can_reach("Goldenrod City");
		}
	},
	"NATIONAL_PARK_TM_DIG": function() {
		if (getSettingState(national_park_access) === 0 || has("ITEM_BICYCLE")) {
			return can_reach("Goldenrod City");
		}
	},
	"QUICK_CLAW": function() {
		if (getSettingState(national_park_access) === 0 || has("ITEM_BICYCLE")) {
			return can_reach("Goldenrod City");
		}
	},
	"ROUTE_35_TM_ROLLOUT": function() {
		return can_reach("Goldenrod City");
	},
	"FRUITTREE_ROUTE_35": function() {
		if (can_surf("johto")) {
			return can_reach("Goldenrod City");
		}
	},
	"HP_UP_FROM_RANDY": function() {
		if (has("EVENT_DELIVERED_KENYA")) {
			return can_reach("Goldenrod City");
		}
	},
	// 36
	"TM08_ROCK_SMASH": function() {
		if (has("ITEM_SQUIRTBOTTLE")) {
			return can_reach("New Bark Town");
		}
	},
	"HARD_STONE_FROM_ARTHUR": function() {
		return can_reach("New Bark Town");
	},
	"FRUITTREE_ROUTE_36": function() {
		return can_reach("Goldenrod City");
	},
	"PICKED_UP_ENERGY_ROOT_FROM_AERODACTYL_ITEM_ROOM": function() {
		if (can_surf("johto") && can_flash("johto")) {
			return can_reach("New Bark Town");
		}
	},
	"PICKED_UP_GOLD_BERRY_FROM_AERODACTYL_ITEM_ROOM": function() {
		if (can_surf("johto") && can_flash("johto")) {
			return can_reach("New Bark Town");
		}
	},
	"PICKED_UP_HEAL_POWDER_FROM_AERODACTYL_ITEM_ROOM": function() {
		if (can_surf("johto") && can_flash("johto")) {
			return can_reach("New Bark Town");
		}
	},
	"PICKED_UP_MOON_STONE_FROM_AERODACTYL_ITEM_ROOM": function() {
		if (can_surf("johto") && can_flash("johto")) {
			return can_reach("New Bark Town");
		}
	},
	"PICKED_UP_BERRY_FROM_KABUTO_ITEM_ROOM": function() {
		if (has("ITEM_ESCAPE_ROPE")) {
			return can_reach("New Bark Town");
		}
	},
	"PICKED_UP_ENERGYPOWDER_FROM_KABUTO_ITEM_ROOM": function() {
		if (has("ITEM_ESCAPE_ROPE")) {
			return can_reach("New Bark Town");
		}
	},
	"PICKED_UP_HEAL_POWDER_FROM_KABUTO_ITEM_ROOM": function() {
		if (has("ITEM_ESCAPE_ROPE")) {
			return can_reach("New Bark Town");
		}
	},
	"PICKED_UP_PSNCUREBERRY_FROM_KABUTO_ITEM_ROOM": function() {
		if (has("ITEM_ESCAPE_ROPE")) {
			return can_reach("New Bark Town");
		}
	},
	"PICKED_UP_MYSTERYBERRY_FROM_OMANYTE_ITEM_ROOM": function() {
		if (can_surf("kanto") && can_strength("kanto") && has("ITEM_WATER_STONE")) {
			return can_reach("Azalea Town");
		}
	},
	"PICKED_UP_MYSTIC_WATER_FROM_OMANYTE_ITEM_ROOM": function() {
		if (can_surf("kanto") && can_strength("kanto") && has("ITEM_WATER_STONE")) {
			return can_reach("Azalea Town");
		}
	},
	"PICKED_UP_STAR_PIECE_FROM_OMANYTE_ITEM_ROOM": function() {
		if (can_surf("kanto") && can_strength("kanto") && has("ITEM_WATER_STONE")) {
			return can_reach("Azalea Town");
		}
	},
	"PICKED_UP_STARDUST_FROM_OMANYTE_ITEM_ROOM": function() {
		if (can_surf("kanto") && can_strength("kanto") && has("ITEM_WATER_STONE")) {
			return can_reach("Azalea Town");
		}
	},
	"PICKED_UP_GOLD_BERRY_FROM_HO_OH_ITEM_ROOM": function() {
		if (can_surf("kanto") && has("ITEM_RAINBOW_WING")) {
			return can_reach("New Bark Town");
		}
	},
	"PICKED_UP_MYSTERYBERRY_FROM_HO_OH_ITEM_ROOM": function() {
		if (can_surf("kanto") && has("ITEM_RAINBOW_WING")) {
			return can_reach("New Bark Town");
		}
	},
	"PICKED_UP_REVIVAL_HERB_FROM_HO_OH_ITEM_ROOM": function() {
		if (can_surf("kanto") && has("ITEM_RAINBOW_WING")) {
			return can_reach("New Bark Town");
		}
	},
	"PICKED_UP_CHARCOAL_FROM_HO_OH_ITEM_ROOM": function() {
		if (can_surf("kanto") && has("ITEM_RAINBOW_WING")) {
			return can_reach("New Bark Town");
		}
	},
	// 37
	"ROUTE_37_HIDDEN_ETHER": function() {
		return min(hidden_logic(), can_reach("Ecruteak City"));
	},
	"MAGNET_FROM_SUNNY": function() {
		return can_reach("Ecruteak City");
	},
	"FRUITTREE_ROUTE_37_1": function() {
		return can_reach("Ecruteak City");
	},
	"FRUITTREE_ROUTE_37_2": function() {
		return can_reach("Ecruteak City");
	},
	"FRUITTREE_ROUTE_37_3": function() {
		return can_reach("Ecruteak City");
	},
	// 38
	"FRUITTREE_ROUTE_38": function() {
		return can_reach("Ecruteak City");
	},
	// 39
	"ROUTE_39_HIDDEN_NUGGET": function() {
		return min(hidden_logic(), can_reach("Ecruteak City"));
	},
	"FRUITTREE_ROUTE_39": function() {
		return can_reach("Ecruteak City");
	},
	"TM13_SNORE_FROM_MOOMOO_FARM": function() {
		return can_reach("Ecruteak City");
	},
	// 40
	"SHARP_BEAK_FROM_MONICA": function() {
		return can_reach("Ecruteak City");
	},
	"ROUTE_40_HIDDEN_HYPER_POTION": function() {
		return min(hidden_logic(), can_reach("Ecruteak City"));
	},
	// 41
	"WHIRL_ISLAND_B1F_CALCIUM": function() {
		return can_whirl_islands();
	},
	"WHIRL_ISLAND_B1F_CARBOS": function() {
		return can_whirl_islands();
	},
	"WHIRL_ISLAND_B1F_ESCAPE_ROPE": function() {
		return can_whirl_islands();
	},
	"WHIRL_ISLAND_B1F_FULL_RESTORE": function() {
		return can_whirl_islands();
	},
	"WHIRL_ISLAND_B1F_HIDDEN_FULL_RESTORE": function() {
		return min(hidden_logic(), can_whirl_islands());
	},
	"WHIRL_ISLAND_B1F_HIDDEN_RARE_CANDY": function() {
		return min(hidden_logic(), can_whirl_islands());
	},
	"WHIRL_ISLAND_B1F_HIDDEN_ULTRA_BALL": function() {
		return min(hidden_logic(), can_whirl_islands());
	},
	"WHIRL_ISLAND_B1F_NUGGET": function() {
		return can_whirl_islands();
	},
	"WHIRL_ISLAND_B2F_FULL_RESTORE": function() {
		return can_whirl_islands();
	},
	"WHIRL_ISLAND_B2F_MAX_ELIXER": function() {
		return can_whirl_islands();
	},
	"WHIRL_ISLAND_B2F_MAX_REVIVE": function() {
		return can_whirl_islands();
	},
	"WHIRL_ISLAND_NE_ULTRA_BALL": function() {
		return can_whirl_islands();
	},
	"WHIRL_ISLAND_SW_ULTRA_BALL": function() {
		return can_whirl_islands();
	},
	"ROUTE_41_HIDDEN_MAX_ETHER": function() {
		if (can_whirlpool("johto")) {
			return min(hidden_logic(), can_reach("Ecruteak City"));
		}
	},
	// 42
	"MOUNT_MORTAR_1F_INSIDE_ESCAPE_ROPE": function() {
		if (can_strength("johto") && can_waterfall("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_HYPER_POTION": function() {
		if (can_strength("johto") && can_waterfall("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_NUGGET": function() {
		if (can_strength("johto") && can_waterfall("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_ULTRA_BALL": function() {
		if (can_strength("johto") && can_waterfall("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_IRON": function() {
		if (can_waterfall("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_MAX_POTION": function() {
		if (can_waterfall("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_MAX_REVIVE": function() {
		if (can_strength("johto") && can_waterfall("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_HIDDEN_MAX_REPEL": function() {
		if (can_waterfall("johto")) {
			return min(hidden_logic(), can_reach("Ecruteak City"));
		}
	},
	"MOUNT_MORTAR_1F_OUTSIDE_HIDDEN_HYPER_POTION": function() {
		return min(hidden_logic(), can_reach("Ecruteak City"));
	},
	"MOUNT_MORTAR_1F_OUTSIDE_ETHER": function() {
		return can_reach("Ecruteak City");
	},
	"MOUNT_MORTAR_1F_OUTSIDE_REVIVE": function() {
		return can_reach("Ecruteak City");
	},
	"MOUNT_MORTAR_2F_INSIDE_DRAGON_SCALE": function() {
		if (can_waterfall("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_2F_INSIDE_ELIXER": function() {
		if (can_waterfall("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_2F_INSIDE_ESCAPE_ROPE": function() {
		if (can_waterfall("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_2F_INSIDE_MAX_POTION": function() {
		if (can_waterfall("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_2F_INSIDE_RARE_CANDY": function() {
		if (can_waterfall("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_2F_INSIDE_TM_DEFENSE_CURL": function() {
		if (can_waterfall("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_2F_INSIDE_HIDDEN_FULL_RESTORE": function() {
		if (can_waterfall("johto")) {
			return min(hidden_logic(), can_reach("Ecruteak City"));
		}
	},
	"MOUNT_MORTAR_B1F_CARBOS": function() {
		if (can_surf("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_B1F_FULL_RESTORE": function() {
		if (can_surf("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_B1F_HYPER_POTION": function() {
		if (can_surf("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_B1F_MAX_ETHER": function() {
		if (can_surf("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_B1F_PP_UP": function() {
		if (can_surf("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"MOUNT_MORTAR_B1F_HIDDEN_MAX_REVIVE": function() {
		if (can_surf("johto")) {
			return min(hidden_logic(), can_reach("Ecruteak City"));
		}
	},
	"ROUTE_42_HIDDEN_MAX_POTION": function() {
		if (can_surf("johto")) {
			return min(hidden_logic(), can_reach("Ecruteak City"));
		}
	},
	"ROUTE_42_ULTRA_BALL": function() {
		return can_reach("Ecruteak City");
	},
	"ROUTE_42_SUPER_POTION": function() {
		if (can_surf("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"FRUITTREE_ROUTE_42_1": function() {
		if (can_surf("johto") && can_cut("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"FRUITTREE_ROUTE_42_2": function() {
		if (can_surf("johto") && can_cut("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"FRUITTREE_ROUTE_42_3": function() {
		if (can_surf("johto") && can_cut("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	// 43
	"LAKE_OF_RAGE_HIDDEN_FULL_RESTORE": function() {
		return min(hidden_logic(), can_reach("Ecruteak City"));
	},
	"LAKE_OF_RAGE_HIDDEN_MAX_POTION": function() {
		return min(hidden_logic(), can_reach("Ecruteak City"));
	},
	"RED_SCALE": function() {
		if (can_whirlpool("johto") || (getSettingState(red_gyarados_access) == 0 && can_surf("johto"))) {
			return can_reach("Ecruteak City");
		}
	},
	"EVENT_AGREED_TO_ASSIST_LANCE": function() {
		if (can_whirlpool("johto") || (getSettingState(red_gyarados_access) == 0 && can_surf("johto"))) {
			return can_reach("Ecruteak City");
		}
	},
	"LAKE_OF_RAGE_TM_DETECT": function() {
		if (can_cut("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"ROUTE_43_MAX_ETHER": function() {
		return can_reach("Ecruteak City");
	},
	"FRUITTREE_ROUTE_43": function() {
		if (can_surf("johto") && can_cut("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"TM36_SLUDGE_BOMB": function() {
		if (has("EVENT_CLEARED_ROCKET_HIDEOUT")) {
			return can_reach("Ecruteak City");
		}
	},
	"BLACKBELT_FROM_WESLEY": function() {
		if (can_cut("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"LAKE_OF_RAGE_HIDDEN_RARE_CANDY": function() {
		if (can_cut("johto")) {
			return min(hidden_logic(), can_reach("Ecruteak City"));
		}
	},
	"TM10_HIDDEN_POWER": function() {
		if (can_cut("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	"LAKE_OF_RAGE_ELIXER": function() {
		if (can_cut("johto")) {
			return can_reach("Ecruteak City");
		}
	},
	// 44
	"HM07_WATERFALL": function() {
		return can_reach("Route 44");
	},
	"ICE_PATH_1F_PP_UP": function() {
		return can_reach("Blackthorn City");
	},
	"ICE_PATH_1F_PROTEIN": function() {
		return can_reach("Blackthorn City");
	},
	"ICE_PATH_B1F_HIDDEN_MAX_POTION": function() {
		return min(hidden_logic(), can_reach("Blackthorn City"));
	},
	"ICE_PATH_B1F_IRON": function() {
		return can_reach("Blackthorn City");
	},
	"ICE_PATH_B2F_BLACKTHORN_SIDE_HIDDEN_ICE_HEAL": function() {
		return min(hidden_logic(), can_reach("Route 44"));
	},
	"ICE_PATH_B2F_BLACKTHORN_SIDE_TM_REST": function() {
		return can_reach("Route 44");
	},
	"ICE_PATH_B2F_MAHOGANY_SIDE_HIDDEN_CARBOS": function() {
		return min(hidden_logic(), can_reach("Route 44"));
	},
	"ICE_PATH_B2F_MAHOGANY_SIDE_MAX_POTION": function() {
		return can_reach("Route 44");
	},
	"ICE_PATH_B2F_MAHOGANY_SIDE_FULL_HEAL": function() {
		return can_reach("Blackthorn City");
	},
	"ICE_PATH_B3F_NEVERMELTICE": function() {
		return can_reach("Blackthorn City");
	},
	"ROUTE_44_MAX_REPEL": function() {
		return can_reach("Route 44");
	},
	"ROUTE_44_ULTRA_BALL": function() {
		return can_reach("Route 44");
	},
	"FRUITTREE_ROUTE_44": function() {
		return can_reach("Route 44");
	},
	"ROUTE_44_MAX_REVIVE": function() {
		if (can_surf("johto")) {
			return can_reach("Route 44");
		}
	},
	"ROUTE_44_HIDDEN_ELIXER": function() {
		if (can_surf("johto")) {
			return min(hidden_logic(), can_reach("Route 44"));
		}
	},
	// 45
	"DARK_CAVE_BLACKTHORN_ENTRANCE_REVIVE": function() {
		if (can_surf("johto")) {
			return min(can_flash("johto"), can_reach("Blackthorn City"));
		}
	},
	"DARK_CAVE_BLACKTHORN_ENTRANCE_TM_SNORE": function() {
		if (can_surf("johto")) {
			return min(can_flash("johto"), can_reach("Blackthorn City"));
		}
	},
	"BLACKGLASSES_IN_DARK_CAVE": function() {
		if (can_surf("johto")) {
			return min(can_flash("johto"), can_reach("Blackthorn City"));
		}
	},
	"ROUTE_45_HIDDEN_PP_UP": function() {
		if (can_surf("johto")) {
			return min(hidden_logic(), can_reach("Blackthorn City"));
		}
	},
	"FRUITTREE_ROUTE_45": function() {
		return can_reach("Blackthorn City");
	},
	"ROUTE_45_ELIXER": function() {
		return can_reach("Blackthorn City");
	},
	"ROUTE_45_MAX_POTION": function() {
		return can_reach("Blackthorn City");
	},
	"ROUTE_45_NUGGET": function() {
		return can_reach("Blackthorn City");
	},
	"ROUTE_45_REVIVE": function() {
		return can_reach("Blackthorn City");
	},
	// 46
	"ROUTE_46_X_SPEED": function() {
		return can_reach("Route 46");
	},
	"FRUITTREE_ROUTE_46_1": function() {
		return can_reach("Route 46");
	},
	"FRUITTREE_ROUTE_46_2": function() {
		return can_reach("Route 46");
	},
	// E4
	"EVENT_DEFEAT_LANCE": function() {
		return can_reach("Elite Four");
	}
}