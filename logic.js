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
		const badgeDiv = document.getElementById(badge);
		if (badgeDiv.classList.contains("itemchecked")) {
			count = count + 1;
		}
	}
	return count;
}

function can_flash() {
	if (has("ZEPHYR_BADGE") && has("HM_FLASH")) {
		return "logical";
	}
}
function can_cut() {
	if (has("HIVE_BADGE") && has("HM_CUT")) {
		return "logical";
	}
}
function can_strength() {
	if (has("PLAIN_BADGE") && has("HM_STRENGTH")) {
		return "logical";
	}
}
function can_surf() {
	if (has("FOG_BADGE") && has("HM_SURF")) {
		return "logical";
	}
}
function can_whirlpool() {
	if (can_surf() && has("GLACIER_BADGE") && has("HM_WHIRLPOOL")) {
		return "logical";
	}
}
function can_waterfall() {
	if (can_surf() && has("RISING_BADGE") && has("HM_WATERFALL")) {
		return "logical";
	}
}

function hidden_logic() {
	if (has("ITEM_ITEMFINDER")) {
		return "logical";
	}
	return "possible";
}
// Logic Helpers
function rocket_took_radio_tower() {
	const e4Badges = parseInt(EliteFourBadges.classList[1].substring(1), 10);
	if (count_badges() >= e4Badges - 1) {
		return "logical";
	}
}
function can_tin_tower() {
	if (has("ITEM_CLEAR_BELL") && has("EVENT_CLEARED_RADIO_TOWER")) {
		return can_ecruteak();
	}
}
function can_rocket_hideout() {
	if (has("EVENT_AGREED_TO_ASSIST_LANCE") && can_mahogany()) {
		return "logical";
	}
}
function can_dragons_den() {
	if (has("EVENT_DEFEAT_CLAIR") && can_surf()) {
		return can_blackthorn();
	}
}
function can_rock_tunnel() {
	if (can_lavender()) {
		if (can_flash()) {
			return "logical";
		}
		return "possible";
	}
}
function can_tohjo() {
	if (can_viridian() || can_waterfall()) {
		return "logical";
	}
}
function can_victory_road() {
	if (can_tohjo()) {
		const e4Badges = parseInt(EliteFourBadges.classList[1].substring(1), 10);
		if (count_badges() >= e4Badges) {
			return "logical";
		}
	}
}
function can_mount_silver() {
	if (can_tohjo()) {
		const redBadges = parseInt(RedBadges.classList[1].substring(1), 10);
		if (count_badges() >= redBadges) {
			return "logical";
		}
	}
}
function can_whirl_islands() {
	if (can_cianwood() && can_whirlpool()) {
		if (can_flash()) {
			return "logical";
		}
		return "possible";
	}
}
function can_route44() {
	if (can_mahogany()) {
		return rocket_took_radio_tower();
	}
}
function can_route46() {
	if (can_blackthorn()) {
		return "logical";
	}
	if (has("ITEM_TM_ROCK_SMASH")) {
		if (can_flash()) {
			return "logical";
		}
		return "possible";
	}
}
// Town Logic
// New Bark - logical
// Cherrygrove - logical
// Violet - name rival - is this worth an event?
// Azalea - logical 
// Goldenrod - logical - cut tree is removed from ilex forest
// Ecruteak - squirtbottle || pass + ssticket
function can_ecruteak() {
	if (has("ITEM_SQUIRTBOTTLE")) {
		return "logical";
	}
	if (has("ITEM_PASS") && has("ITEM_S_S_TICKET")) {
		return "logical";
	}
}
// Olivine - Ecruteak
function can_olivine() {
	return can_ecruteak();
}
// Cianwood - Ecruteak + surf
function can_cianwood() {
	if (can_surf()) {
		return can_ecruteak();
	}
}
// Mahogany - Ecruteak
function can_mahogany() {
	return can_ecruteak();
}
// Blackthorn - cleared goldren rod tower + Ecruteak + strength
function can_blackthorn() {
	if (can_strength()) {
		return can_route44();
	}
}
// Pallet - Viridian
function can_pallet() {
	return can_viridian();
}
// Viridian - vermillion +  pokegear, radiocard, expncard - cut tree is removed
function can_viridian() {
	if (has("ITEM_RADIO_CARD") && has("ITEM_EXPN_CARD") && has("ITEM_POKE_GEAR")) {
		return can_vermillion();
	}
}
// Pewter - Viridian
function can_pewter() {
	return can_viridian();
}
// Cerulean - Vermillion
function can_cerulean() {
	return can_vermillion();
}
// Vermilion - PASS || Ecruteak + SS Ticket
function can_vermillion() {
	if (has("ITEM_PASS")) {
		return "logical";
	}
	if (has("ITEM_S_S_TICKET")) {
		return can_olivine();
	}
}
// Lavender - Vermilion
function can_lavender() {
	return can_vermillion();
}
// Celadon - Vermilion
function can_celadon() {
	return can_vermillion();
}
// Saffron - Vermilion
function can_saffron() {
	return can_vermillion();
}
// Fuchsia - Vermilion
function can_fuchsia() {
	return can_vermillion();
}
// Cinnabar - Viridian + surf
function can_cinnabar() {
	if (can_surf()) {
		return can_viridian();
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
			return "logical";
		}
	},
	"SS_TICKET_FROM_ELM": function() {
		if (has("EVENT_DEFEAT_LANCE")) {
			return "logical";
		}
	},
	"POTION_FROM_ELMS_AIDE": function() {
		return "logical";
	},
	"POKE_BALL_FROM_ELMS_AIDE": function() {
		if (has("ITEM_MYSTERY_EGG")) {
			return "logical";
		}
	},
	"POKEGEAR": function() {
		return "logical";
	},
	// Cherrygrove
	"MYSTIC_WATER_IN_CHERRYGROVE": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"MAP_CARD": function() {
		return "logical";
	},
	// Violet City
	"SPROUT_TOWER_1F_PARLYZ_HEAL": function() {
		return "logical";
	},
	"SPROUT_TOWER_2F_X_ACCURACY": function() {
		return "logical";
	},
	"SPROUT_TOWER_3F_ESCAPE_ROPE": function() {
		return "logical";
	},
	"SPROUT_TOWER_3F_POTION": function() {
		return "logical";
	},
	"HM05_FLASH": function() {
		return "logical";
	},
	"FRUITTREE_VIOLET_CITY": function() {
		return "logical";
	},
	"VIOLET_CITY_HIDDEN_HYPER_POTION": function() {
		return hidden_logic();
	},
	"VIOLET_CITY_PP_UP": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"VIOLET_CITY_RARE_CANDY": function() {
		if (can_surf()) {
			return "logical";
		}
	},
	"ZEPHYR_BADGE_FROM_FALKNER": function() {
		return "logical";
	},
	"TM31_MUD_SLAP": function() {
		return "logical";
	},
	// Azalea Town
	"HIVE_BADGE_FROM_BUGSY": function() {
		if (has("EVENT_HELP_KURT")) {
			return "logical";
		}
	},
	"TM49_FURY_CUTTER": function() {
		if (has("EVENT_HELP_KURT")) {
			return "logical";
		}
	},
	"FRUITTREE_AZALEA_TOWN": function() {
		return "logical";
	},
	"EVENT_HELP_KURT": function() {
		return "logical";
	},
	"KURT_GAVE_YOU_LURE_BALL": function() {
		if (has("EVENT_HELP_KURT")) {
			return "logical";
		}
	},
	"CHARCOAL_IN_CHARCOAL_KILN": function() {
		return "logical";
	},
	"AZALEA_TOWN_HIDDEN_FULL_HEAL": function() {
		return hidden_logic();
	},
	"SLOWPOKE_WELL_B1F_SUPER_POTION": function() {
		return "logical";
	},
	"SLOWPOKE_WELL_B2F_TM_RAIN_DANCE": function() {
		if (can_surf() && can_strength()) {
			return "logical";
		}
	},
	"KINGS_ROCK_IN_SLOWPOKE_WELL": function() {
		if (can_surf() && can_strength()) {
			return "logical";
		}
	},
	// Goldenrod City
	"BICYCLE": function() {
		return "logical";
	},
	"GOLDENROD_DEPT_STORE_B1F_BURN_HEAL": function() {
		return "logical";
	},
	"GOLDENROD_DEPT_STORE_B1F_ETHER": function() {
		return "logical";
	},
	"GOLDENROD_DEPT_STORE_B1F_ULTRA_BALL": function() {
		return "logical";
	},
	"GOLDENROD_DEPT_STORE_B1F_AMULET_COIN": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return "logical";
		}
	},
	"SQUIRTBOTTLE": function() {
		if (has("PLAIN_BADGE")) {
			return "logical";
		}
	},
	"PLAIN_BADGE_FROM_WHITNEY": function() {
		return "logical";
	},
	"TM45_ATTRACT": function() {
		return "logical";
	},
	"GOLDENROD_UNDERGROUND_COIN_CASE": function() {
		return "logical";
	},
	"GOLDENROD_UNDERGROUND_HIDDEN_ANTIDOTE": function() {
		return hidden_logic();
	},
	"GOLDENROD_UNDERGROUND_HIDDEN_PARLYZ_HEAL": function() {
		return hidden_logic();
	},
	"GOLDENROD_UNDERGROUND_HIDDEN_SUPER_POTION": function() {
		return hidden_logic();
	},
	"GOLDENROD_UNDERGROUND_SWITCH_ROOM_ENTRANCES_FULL_HEAL": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return "logical";
		}
	},
	"GOLDENROD_UNDERGROUND_SWITCH_ROOM_ENTRANCES_HIDDEN_MAX_POTION": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return hidden_logic();
		}
	},
	"GOLDENROD_UNDERGROUND_SWITCH_ROOM_ENTRANCES_HIDDEN_REVIVE": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return hidden_logic();
		}
	},
	"GOLDENROD_UNDERGROUND_SWITCH_ROOM_ENTRANCES_SMOKE_BALL": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return "logical";
		}
	},
	"GOLDENROD_UNDERGROUND_WAREHOUSE_MAX_ETHER": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return "logical";
		}
	},
	"GOLDENROD_UNDERGROUND_WAREHOUSE_TM_SLEEP_TALK": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return "logical";
		}
	},
	"GOLDENROD_UNDERGROUND_WAREHOUSE_ULTRA_BALL": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return "logical";
		}
	},
	"RECEIVED_CARD_KEY": function() {
		if (has("ITEM_CARD_KEY") || has("ITEM_BASEMENT_KEY")) {
			return "logical";
		}
	},
	"RADIO_CARD": function() {
		return "logical";
	},
	"BUENA_BLUE_CARD": function() {
		return "logical";
	},
	"SUNNY_DAY_FROM_RADIO_TOWER": function() {
		if (has("EVENT_CLEARED_RADIO_TOWER")) {
			return "logical";
		}
	},
	"PINK_BOW_FROM_MARY": function() {
		if (has("EVENT_CLEARED_RADIO_TOWER")) {
			return "logical";
		}
	},
	"BEAT_ROCKET_EXECUTIVEM_3": function() {
		return rocket_took_radio_tower();
	},
	"RADIO_TOWER_5F_ULTRA_BALL": function() {
		if (has("ITEM_CARD_KEY")) {
			return rocket_took_radio_tower();
		}
	},
	"CLEAR_BELL": function() {
		if (has("ITEM_CARD_KEY")) {
			return rocket_took_radio_tower();
		}
	},
	"EVENT_CLEARED_RADIO_TOWER": function() {
		if (has("ITEM_CARD_KEY")) {
			return rocket_took_radio_tower();
		}
	},
	// Ecruteak City
	"BURNED_TOWER_1F_HIDDEN_ETHER": function() {
		if (can_ecruteak()) {
			return hidden_logic();
		}
	},
	"BURNED_TOWER_1F_HIDDEN_ULTRA_BALL": function() {
		if (can_ecruteak()) {
			return hidden_logic();
		}
	},
	"BURNED_TOWER_1F_HP_UP": function() {
		if (has("ITEM_TM_ROCK_SMASH")) {
			return can_ecruteak();
		}
	},
	"BURNED_TOWER_B1F_TM_ENDURE": function() {
		if (can_strength()) {
			return can_ecruteak();
		}
	},
	"HM03_SURF": function() {
		return can_ecruteak();
	},
	"ECRUTEAK_CITY_HIDDEN_HYPER_POTION": function() {
		if (can_ecruteak()) {
			return hidden_logic();
		}
	},
	"FOG_BADGE_FROM_MORTY": function() {
		return can_ecruteak();
	},
	"TM30_SHADOW_BALL": function() {
		return can_ecruteak();
	},
	"ITEMFINDER": function() {
		return can_ecruteak();
	},
	"TIN_TOWER_3F_FULL_HEAL": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_4F_ESCAPE_ROPE": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_4F_HIDDEN_MAX_POTION": function() {
		if (can_tin_tower()) {
			return hidden_logic();
		}
	},
	"TIN_TOWER_4F_PP_UP": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_4F_ULTRA_BALL": function() {
		return can_tin_tower();
	},
	"TIN_TOWER_5F_HIDDEN_CARBOS": function() {
		if (can_tin_tower()) {
			return hidden_logic();
		}
	},
	"TIN_TOWER_5F_HIDDEN_FULL_RESTORE": function() {
		if (can_tin_tower()) {
			return hidden_logic();
		}
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
	// Olivine City
	"METAL_COAT_FROM_GRANDPA_ON_SS_AQUA": function() {
		if (has("ITEM_S_S_TICKET")) {
			return can_olivine();
		}
	},
	"HM04_STRENGTH": function() {
		return can_olivine();
	},
	"GOOD_ROD": function() {
		return can_olivine();
	},
	"MINERAL_BADGE_FROM_JASMINE": function() {
		if (has("ITEM_SECRETPOTION")) {
			return can_olivine();
		}
	},
	"TM23_IRON_TAIL": function() {
		if (has("ITEM_SECRETPOTION")) {
			return can_olivine();
		}
	},
	"OLIVINE_LIGHTHOUSE_3F_ETHER": function() {
		return can_olivine();
	},
	"OLIVINE_LIGHTHOUSE_5F_RARE_CANDY": function() {
		return can_olivine();
	},
	"OLIVINE_LIGHTHOUSE_5F_SUPER_REPEL": function() {
		return can_olivine();
	},
	"OLIVINE_LIGHTHOUSE_5F_TM_SWAGGER": function() {
		return can_olivine();
	},
	"OLIVINE_LIGHTHOUSE_5F_HIDDEN_HYPER_POTION": function() {
		if (can_olivine()) {
			return hidden_logic();
		}
	},
	"OLIVINE_LIGHTHOUSE_6F_SUPER_POTION": function() {
		return can_olivine();
	},
	"OLIVINE_PORT_HIDDEN_PROTEIN": function() {
		if (can_olivine() && can_surf() && has("ITEM_S_S_TICKET")) {
			return hidden_logic();
		}
	},
	// Cianwood City
	"CIANWOOD_CITY_HIDDEN_MAX_ETHER": function() {
		if (can_cianwood() && has("ITEM_TM_ROCK_SMASH")) {
			return hidden_logic();
		}
	},
	"CIANWOOD_CITY_HIDDEN_REVIVE": function() {
		if (can_cianwood() && has("ITEM_TM_ROCK_SMASH")) {
			return hidden_logic();
		}
	},
	"EVENT_DEFEAT_CHUCK": function() {
		if (can_strength()) {
			return can_cianwood();
		}
	},
	"STORM_BADGE_FROM_CHUCK": function() {
		if (can_strength()) {
			return can_cianwood();
		}
	},
	"TM01_DYNAMICPUNCH": function() {
		if (can_strength()) {
			return can_cianwood();
		}
	},
	"HM02_FLY": function() {
		if (has("EVENT_DEFEAT_CHUCK")) {
			return can_cianwood();
		}
	},
	"SECRETPOTION_FROM_PHARMACY": function() {
		return can_cianwood();
	},
	// Mahogany Town
	"GLACIER_BADGE_FROM_PRYCE": function() {
		if (has("EVENT_CLEARED_ROCKET_HIDEOUT")) {
			return can_mahogany();
		}
	},
	"TM16_ICY_WIND": function() {
		if (has("EVENT_CLEARED_ROCKET_HIDEOUT")) {
			return can_mahogany();
		}
	},
	"TEAM_ROCKET_BASE_B1F_GUARD_SPEC": function() {
		return can_rocket_hideout();
	},
	"TEAM_ROCKET_BASE_B1F_HIDDEN_REVIVE": function() {
		if (can_rocket_hideout()) {
			return hidden_logic();
		}
	},
	"TEAM_ROCKET_BASE_B1F_HYPER_POTION": function() {
		return can_rocket_hideout();
	},
	"TEAM_ROCKET_BASE_B1F_NUGGET": function() {
		return can_rocket_hideout();
	},
	"TEAM_ROCKET_BASE_B2F_HIDDEN_FULL_HEAL": function() {
		if (can_rocket_hideout()) {
			return hidden_logic();
		}
	},
	"TEAM_ROCKET_BASE_B2F_TM_THIEF": function() {
		if (can_rocket_hideout()) {
			return hidden_logic();
		}
	},
	"HM06_WHIRLPOOL": function() {
		if (can_rocket_hideout()) {
			return hidden_logic();
		}
	},
	"EVENT_CLEARED_ROCKET_HIDEOUT": function() {
		if (can_rocket_hideout()) {
			return hidden_logic();
		}
	},
	"TEAM_ROCKET_BASE_B3F_FULL_HEAL": function() {
		if (can_rocket_hideout()) {
			return hidden_logic();
		}
	},
	"TEAM_ROCKET_BASE_B3F_ICE_HEAL": function() {
		if (can_rocket_hideout()) {
			return hidden_logic();
		}
	},
	"TEAM_ROCKET_BASE_B3F_PROTEIN": function() {
		if (can_rocket_hideout()) {
			return hidden_logic();
		}
	},
	"TEAM_ROCKET_BASE_B3F_ULTRA_BALL": function() {
		if (can_rocket_hideout()) {
			return hidden_logic();
		}
	},
	"TEAM_ROCKET_BASE_B3F_X_SPECIAL": function() {
		if (can_rocket_hideout()) {
			return hidden_logic();
		}
	},
	// Blackthorn City
	"SPELL_TAG_FROM_SANTOS": function() {
		return can_blackthorn();
	},
	"EVENT_DEFEAT_CLAIR": function() {
		if (has("EVENT_CLEARED_RADIO_TOWER")) {
			return can_blackthorn();
		}
	},
	"RISING_BADGE_FROM_CLAIR": function() {
		if (has("EVENT_CLEARED_RADIO_TOWER")) {
			return can_blackthorn();
		}
	},
	"TM24_DRAGONBREATH": function() {
		if (has("EVENT_CLEARED_RADIO_TOWER")) {
			return can_blackthorn();
		}
	},
	"DRAGONS_DEN_B1F_CALCIUM": function() {
		return can_dragons_den();
	},
	"DRAGONS_DEN_B1F_HIDDEN_MAX_POTION": function() {
		if (can_dragons_den()) {
			return hidden_logic();
		}
	},
	"DRAGONS_DEN_B1F_MAX_ELIXER": function() {
		return can_dragons_den();
	},
	"DRAGONS_DEN_B1F_DRAGON_FANG": function() {
		if (can_whirlpool()) {
			return can_dragons_den();
		}
	},
	"DRAGONS_DEN_B1F_HIDDEN_MAX_ELIXER": function() {
		if (can_whirlpool() && can_dragons_den()) {
			return hidden_logic();
		}
	},
	"DRAGONS_DEN_B1F_HIDDEN_REVIVE": function() {
		if (can_whirlpool() && can_dragons_den()) {
			return hidden_logic();
		}
	},

	// KANTO //
	// Pallet Town
	
	// Viridian City
	"TM42_DREAM_EATER": function() {
		if (can_surf() || can_cut()) {
			return can_viridian();
		}
	},
	"EARTH_BADGE_FROM_BLUE": function() {
		return can_cinnabar();
	},
	// Pewter City
	"SILVER_WING": function() {
		return can_pewter();
	},
	"FRUITTREE_PEWTER_CITY_1": function() {
		return can_pewter();
	},
	"FRUITTREE_PEWTER_CITY_2": function() {
		return can_pewter();
	},
	"BOULDER_BADGE_FROM_BROCK": function() {
		return can_pewter();
	},
	// Cerulean City
	"CERULEAN_CITY_BERSERK_GENE": function() {
		if (can_surf() && can_cerulean()) {
			return hidden_logic();
		}
	},
	"CERULEAN_GYM_MACHINE_PART": function() {
		return can_cerulean();
	},
	"CASCADE_BADGE_FROM_MISTY": function() {
		return can_cerulean();
	},
	// Vermilion City
	"LISTENED_TO_FAN_CLUB_PRESIDENT": function() {
		return can_vermillion();
	},
	"LOST_ITEM_FROM_FAN_CLUB": function() {
		if (has("EVENT_RESTORED_POWER")) {
			return can_vermillion();
		}
	},
	"VERMILION_CITY_HIDDEN_FULL_HEAL": function() {
		if (can_surf() || can_cut()) {
			return can_vermillion();
		}
	},
	"THUNDER_BADGE_FROM_LTSURGE": function() {
		if (can_surf() || can_cut()) {
			return can_vermillion();
		}
	},
	"HP_UP_FROM_VERMILION_GUY": function() {
		if (count_badges() > 15) {
			return can_vermillion();
		}
	},
	"VERMILION_PORT_HIDDEN_IRON": function() {
		if (can_vermillion() && has("ITEM_S_S_TICKET") && can_surf()) {
			return hidden_logic();
		}
	},
	// Lavender Town
	"EXPN_CARD": function() {
		if (has("EVENT_RESTORED_POWER")) {
			return can_lavender();
		}
	},
	// Celadon City
	"CELADON_CITY_HIDDEN_PP_UP": function() {
		if (can_celadon()) {
			return hidden_logic();
		}
	},
	"RAINBOW_BADGE_FROM_ERIKA": function() {
		if (can_cut()) {
			return can_celadon();
		}
	},
	"TM19_GIGA_DRAIN": function() {
		if (can_cut()) {
			return can_celadon();
		}
	},
	"TM03_CURSE": function() {
		return can_celadon();
	},
	// Saffron City
	"PASS_FROM_COPYCAT": function() {
		if (has("ITEM_LOST_ITEM")) {
			return can_saffron();
		}
	},
	"PICKED_UP_FOCUS_BAND": function() {
		return can_saffron();
	},
	"TM29_PSYCHIC": function() {
		return can_saffron();
	},
	"MARSH_BADGE_FROM_SABRINA": function() {
		return can_saffron();
	},
	"UP_GRADE": function() {
		return can_saffron();
	},
	// Fuchsia City
	"FRUITTREE_FUCHSIA_CITY": function() {
		if (can_cut()) {
			return can_fuchsia();
		}
	},
	"SOUL_BADGE_FROM_JANINE": function() {
		return can_fuchsia();
	},
	"TM06_TOXIC": function() {
		return can_fuchsia();
	},
	// Cinnabar Island
	"CINNABAR_ISLAND_HIDDEN_RARE_CANDY": function() {
		if (can_cinnabar()) {
			return hidden_logic();
		}
	},
	// ////////////////////
	// Routes
	// ////////////////////
	// 1
	"FRUITTREE_ROUTE_1": function() {
		return can_viridian();
	},
	// 2
	"ROUTE_2_DIRE_HIT": function() {
		return can_viridian();
	},
	"ROUTE_2_HIDDEN_FULL_HEAL": function() {
		if (can_viridian()) {
			return hidden_logic();
		}
	},
	"ROUTE_2_HIDDEN_FULL_RESTORE": function() {
		if (can_viridian()) {
			return hidden_logic();
		}
	},
	"ROUTE_2_HIDDEN_MAX_ETHER": function() {
		if (can_viridian()) {
			return hidden_logic();
		}
	},
	"ROUTE_2_HIDDEN_REVIVE": function() {
		if (can_viridian()) {
			return hidden_logic();
		}
	},
	"ROUTE_2_MAX_POTION": function() {
		return can_viridian();
	},
	"FRUITTREE_ROUTE_2": function() {
		return can_viridian();
	},
	"ROUTE_2_CARBOS": function() {
		return can_viridian();
	},
	"ROUTE_2_ELIXER": function() {
		if (can_cut()) {
			return can_viridian();
		}
	},
	"NUGGET_FROM_GUY": function() {
		return can_viridian();
	},
	// 4
	"ROUTE_4_HIDDEN_ULTRA_BALL": function() {
		if (can_pewter()) {
			return hidden_logic();
		}
	},
	"ROUTE_4_HP_UP": function() {
		return can_pewter();
	},
	// 5
	"CLEANSE_TAG": function() {
		return can_saffron();
	},
	// 6
	"UNDERGROUND_PATH_HIDDEN_FULL_RESTORE": function() {
		if (can_saffron() && has("EVENT_RESTORED_POWER")) {
			return hidden_logic();
		}
	},
	"UNDERGROUND_PATH_HIDDEN_X_SPECIAL": function() {
		if (can_saffron() && has("EVENT_RESTORED_POWER")) {
			return hidden_logic();
		}
	},
	// 8
	"FRUITTREE_ROUTE_8": function() {
		return can_saffron();
	},
	// 9
	"ROUTE_9_HIDDEN_ETHER": function() {
		if (can_cerulean() && can_cut()) {
			return hidden_logic();
		}
		if (can_lavender()) {
			if (can_flash()) {
				return hidden_logic();
			}
			return "possible";
		}
	},
	// 10
	"TM07_ZAP_CANNON": function() {
		if (has("ITEM_MACHINE_PART") && can_surf()) {
			if (can_cerulean() && can_cut()) {
				return "logical";
			}
			if (can_lavender()) {
				if (can_flash()) {
					return "logical";
				}
				return "possible";
			}
		}
	},
	"EVENT_RESTORED_POWER": function() {
		if (has("ITEM_MACHINE_PART") && can_surf()) {
			if (can_cerulean() && can_cut()) {
				return "logical";
			}
			if (can_lavender()) {
				if (can_flash()) {
					return "logical";
				}
				return "possible";
			}
		}
	},
	"ROCK_TUNNEL_1F_ELIXER": function() {
		return can_rock_tunnel();
	},
	"ROCK_TUNNEL_1F_HIDDEN_X_ACCURACY": function() {
		const tunnelable = can_rock_tunnel();
		if (tunnelable === "logical") {
			return hidden_logic();
		}
		return tunnelable;
	},
	"ROCK_TUNNEL_1F_HIDDEN_X_DEFEND": function() {
		const tunnelable = can_rock_tunnel();
		if (tunnelable === "logical") {
			return hidden_logic();
		}
		return tunnelable;
	},
	"ROCK_TUNNEL_1F_TM_STEEL_WING": function() {
		return can_rock_tunnel();
	},
	"ROCK_TUNNEL_B1F_HIDDEN_MAX_POTION": function() {
		const tunnelable = can_rock_tunnel();
		if (tunnelable === "logical") {
			return hidden_logic();
		}
		return tunnelable;
	},
	"ROCK_TUNNEL_B1F_IRON": function() {
		return can_rock_tunnel();
	},
	"ROCK_TUNNEL_B1F_PP_UP": function() {
		return can_rock_tunnel();
	},
	"ROCK_TUNNEL_B1F_REVIVE": function() {
		return can_rock_tunnel();
	},
	// 11
	"DIGLETTS_CAVE_HIDDEN_MAX_REVIVE": function() {
		if (can_viridian()) {
			return hidden_logic();
		}
	},
	"ROUTE_11_HIDDEN_REVIVE": function() {
		if (can_lavender()) {
			return hidden_logic();
		}
	},
	"FRUITTREE_ROUTE_11": function() {
		return can_lavender();
	},
	// 12
	"ROUTE_12_CALCIUM": function() {
		if (can_cut()) {
			return can_lavender();
		}
	},
	"ROUTE_12_HIDDEN_ELIXER": function() {
		if (can_surf() && can_lavender()) {
			return hidden_logic();
		}
	},
	"ROUTE_12_NUGGET": function() {
		if (can_cut() && can_surf()) {
			return can_lavender();
		}
	},
	"SUPER_ROD": function() {
		return can_lavender();
	},
	// 13
	"ROUTE_13_HIDDEN_CALCIUM": function() {
		if (can_lavender()) {
			return hidden_logic();
		}
	},
	// 15
	"ROUTE_15_PP_UP": function() {
		if (can_cut()) {
			return can_fuchsia();
		}
	},
	// 17
	"ROUTE_17_HIDDEN_MAX_ELIXER": function() {
		if (has("ITEM_BICYCLE") && can_celadon()) {
			return hidden_logic();
		}
	},
	"ROUTE_17_HIDDEN_MAX_ETHER": function() {
		if (has("ITEM_BICYCLE") && can_celadon()) {
			return hidden_logic();
		}
	},
	// 20
	"VOLCANO_BADGE_FROM_BLAINE": function() {
		return can_cinnabar();
	},
	// 23
	"VICTORY_ROAD_FULL_HEAL": function() {
		return can_victory_road();
	},
	"VICTORY_ROAD_FULL_RESTORE": function() {
		return can_victory_road();
	},
	"VICTORY_ROAD_HIDDEN_FULL_HEAL": function() {
		if (can_victory_road()) {
			return hidden_logic();
		}
	},
	"VICTORY_ROAD_HIDDEN_MAX_POTION": function() {
		if (can_victory_road()) {
			return hidden_logic();
		}
	},
	"VICTORY_ROAD_HP_UP": function() {
		return can_victory_road();
	},
	"VICTORY_ROAD_MAX_REVIVE": function() {
		return can_victory_road();
	},
	"VICTORY_ROAD_TM_EARTHQUAKE": function() {
		return can_victory_road();
	},
	// 25
	"ROUTE_25_HIDDEN_POTION": function() {
		if (can_cerulean()) {
			return hidden_logic();
		}
	},
	"ROUTE_25_PROTEIN": function() {
		if (can_cut()) {
			return can_cerulean();
		}
	},
	"CLEARED_NUGGET_BRIDGE": function() {
		return can_cerulean();
	},
	// JOHTO //
	// 26
	"ROUTE_26_MAX_ELIXER": function() {
		return can_tohjo();
	},
	"FRUITTREE_ROUTE_26": function() {
		return can_tohjo();
	},
	// 27
	"ROUTE_27_RARE_CANDY": function() {
		return can_surf();
	},
	"ROUTE_27_TM_SOLARBEAM": function() {
		if (can_tohjo()) {
			return can_whirlpool();
		}
	},
	"TM37_SANDSTORM": function() {
		if (can_waterfall() || (can_tohjo() && can_surf())) {
			return "logical";
		}
	},
	"TOHJO_FALLS_MOON_STONE": function() {
		return can_surf();
	},
	// 28
	"ROUTE_28_HIDDEN_RARE_CANDY": function() {
		if (can_cut() && can_mount_silver()) {
			return hidden_logic();
		}
	},
	"TM47_STEEL_WING": function() {
		if (can_cut()) {
			return can_mount_silver();
		}
	},
	"SILVER_CAVE_OUTSIDE_HIDDEN_FULL_RESTORE": function() {
		if (can_surf() && can_mount_silver()) {
			return hidden_logic();
		}
	},
	"SILVER_CAVE_ITEM_ROOMS_FULL_RESTORE": function() {
		if (can_mount_silver() && can_waterfall()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"SILVER_CAVE_ITEM_ROOMS_MAX_REVIVE": function() {
		if (can_mount_silver() && can_waterfall()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"SILVER_CAVE_ROOM_1_ESCAPE_ROPE": function() {
		if (can_mount_silver()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"SILVER_CAVE_ROOM_1_HIDDEN_DIRE_HIT": function() {
		if (can_mount_silver()) {
			if (can_flash()) {
				return hidden_logic();
			}
			return "possible";
		}
	},
	"SILVER_CAVE_ROOM_1_HIDDEN_ULTRA_BALL": function() {
		if (can_mount_silver()) {
			if (can_flash()) {
				return hidden_logic();
			}
			return "possible";
		}
	},
	"SILVER_CAVE_ROOM_1_MAX_ELIXER": function() {
		if (can_mount_silver()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"SILVER_CAVE_ROOM_1_PROTEIN": function() {
		if (can_mount_silver()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"SILVER_CAVE_ROOM_1_ULTRA_BALL": function() {
		if (can_mount_silver()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"SILVER_CAVE_ROOM_2_CALCIUM": function() {
		if (can_mount_silver() && can_waterfall()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"SILVER_CAVE_ROOM_2_HIDDEN_MAX_POTION": function() {
		if (can_mount_silver()) {
			if (can_flash()) {
				return hidden_logic();
			}
			return "possible";
		}
	},
	"SILVER_CAVE_ROOM_2_PP_UP": function() {
		if (can_mount_silver() && can_waterfall()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"SILVER_CAVE_ROOM_2_ULTRA_BALL": function() {
		if (can_mount_silver()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"EVENT_DEFEAT_RED": function() {
		if (can_mount_silver()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	// 29
	"ROUTE_29_POTION": function() {
		return "logical";
	},
	"PINK_BOW_FROM_TUSCANY": function() {
		return has("ZEPHYR_BADGE");
	},
	"FRUITTREE_ROUTE_29": function() {
		return "logical";
	},
	// 30
	"MYSTERY_EGG": function() {
		return "logical";
	},
	"EXP_SHARE": function() {
		return has("ITEM_RED_SCALE");
	},
	"ROUTE_30_HIDDEN_POTION": function() {
		return hidden_logic();
	},
	"FRUITTREE_ROUTE_30_2": function() {
		return "logical";
	},
	"FRUITTREE_ROUTE_30_1": function() {
		return "logical";
	},
	"BERRY_FROM_ROUTE_30_HOUSE": function() {
		return "logical";
	},
	"ROUTE_30_ANTIDOTE": function() {
		return "logical";
	},
	// 31
	"DARK_CAVE_VIOLET_ENTRANCE_DIRE_HIT": function() {
		if (has("ITEM_TM_ROCK_SMASH")) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"DARK_CAVE_VIOLET_ENTRANCE_FULL_HEAL": function() {
		if (has("ITEM_TM_ROCK_SMASH")) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"DARK_CAVE_VIOLET_ENTRANCE_HIDDEN_ELIXER": function() {
		if (has("ITEM_TM_ROCK_SMASH")) {
			if (can_flash()) {
				return hidden_logic();
			}
			return "possible";
		}
	},
	"DARK_CAVE_VIOLET_ENTRANCE_HYPER_POTION": function() {
		if (has("ITEM_TM_ROCK_SMASH")) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"DARK_CAVE_VIOLET_ENTRANCE_POTION": function() {
		if (can_flash()) {
			return "logical";
		}
		return "possible";
	},
	"ROUTE_31_POKE_BALL": function() {
		return "logical";
	},
	"ROUTE_31_POTION": function() {
		return "logical";
	},
	"TM50_NIGHTMARE": function() {
		return "logical";
	},
	"EVENT_DELIVERED_KENYA": function() {
		return "logical";
	},
	"FRUITTREE_ROUTE_31": function() {
		return "logical";
	},
	// 32
	"ROUTE_32_GREAT_BALL": function() {
		return "logical";
	},
	"ROUTE_32_HIDDEN_SUPER_POTION": function() {
		return hidden_logic();
	},
	"ROUTE_32_REPEL": function() {
		return "logical";
	},
	"TM05_ROAR": function() {
		return can_cut();
	},
	"MIRACLE_SEED_IN_ROUTE_32": function() {
		return has("ZEPHYR_BADGE");
	},
	"OLD_ROD": function() {
		return "logical";
	},
	"POISON_BARB_FROM_FRIEDA": function() {
		return "logical";
	},
	"ROUTE_32_HIDDEN_GREAT_BALL": function() {
		return hidden_logic();
	},
	"UNION_CAVE_1F_AWAKENING": function() {
		return "logical";
	},
	"UNION_CAVE_1F_GREAT_BALL": function() {
		return "logical";
	},
	"UNION_CAVE_1F_POTION": function() {
		return "logical";
	},
	"UNION_CAVE_1F_X_ATTACK": function() {
		return "logical";
	},
	"UNION_CAVE_B1F_TM_SWIFT": function() {
		return "logical";
	},
	"UNION_CAVE_B1F_X_DEFEND": function() {
		return "logical";
	},
	"UNION_CAVE_B2F_ELIXER": function() {
		return can_surf();
	},
	"UNION_CAVE_B2F_HYPER_POTION": function() {
		return can_surf();
	},
	// 33
	"FRUITTREE_ROUTE_33": function() {
		return "logical";
	},
	// 34
	"ILEX_FOREST_ANTIDOTE": function() {
		return "logical";
	},
	"ILEX_FOREST_ETHER": function() {
		return "logical";
	},
	"ILEX_FOREST_HIDDEN_ETHER": function() {
		return hidden_logic();
	},
	"ILEX_FOREST_HIDDEN_FULL_HEAL": function() {
		return hidden_logic();
	},
	"ILEX_FOREST_HIDDEN_SUPER_POTION": function() {
		return hidden_logic();
	},
	"ILEX_FOREST_REVIVE": function() {
		return "logical";
	},
	"ILEX_FOREST_X_ATTACK": function() {
		return "logical";
	},
	"HM01_CUT": function() {
		return "logical";
	},
	"TM02_HEADBUTT": function() {
		return "logical";
	},
	// 34
	"ROUTE_34_HIDDEN_SUPER_POTION": function() {
		return hidden_logic();
	},
	"SOFT_SAND_FROM_KATE": function() {
		return can_surf();
	},
	"TM12_SWEET_SCENT": function() {
		return "logical";
	},
	"ROUTE_34_NUGGET": function() {
		return can_surf();
	},
	"ROUTE_34_HIDDEN_RARE_CANDY": function() {
		if (can_surf()) {
			return hidden_logic();
		}
	},
	// 35
	"NATIONAL_PARK_HIDDEN_FULL_HEAL": function() {
		return hidden_logic();
	},
	"NATIONAL_PARK_PARLYZ_HEAL": function() {
		return "logical";
	},
	"NATIONAL_PARK_TM_DIG": function() {
		return "logical";
	},
	"QUICK_CLAW": function() {
		return "logical";
	},
	"ROUTE_35_TM_ROLLOUT": function() {
		return "logical";
	},
	"FRUITTREE_ROUTE_35": function() {
		return can_surf();
	},
	"HP_UP_FROM_RANDY": function() {
		return has("EVENT_DELIVERED_KENYA");
	},
	// 36
	"TM08_ROCK_SMASH": function() {
		return has("ITEM_SQUIRTBOTTLE");
	},
	"HARD_STONE_FROM_ARTHUR": function() {
		return "logical";
	},
	"FRUITTREE_ROUTE_36": function() {
		return "logical";
	},
	"PICKED_UP_ENERGY_ROOT_FROM_AERODACTYL_ITEM_ROOM": function() {
		if (can_surf() && can_flash()) {
			return "logical";
		}
	},
	"PICKED_UP_GOLD_BERRY_FROM_AERODACTYL_ITEM_ROOM": function() {
		if (can_surf() && can_flash()) {
			return "logical";
		}
	},
	"PICKED_UP_HEAL_POWDER_FROM_AERODACTYL_ITEM_ROOM": function() {
		if (can_surf() && can_flash()) {
			return "logical";
		}
	},
	"PICKED_UP_MOON_STONE_FROM_AERODACTYL_ITEM_ROOM": function() {
		if (can_surf() && can_flash()) {
			return "logical";
		}
	},
	"PICKED_UP_BERRY_FROM_KABUTO_ITEM_ROOM": function() {
		return has("ITEM_ESCAPE_ROPE");
	},
	"PICKED_UP_ENERGYPOWDER_FROM_KABUTO_ITEM_ROOM": function() {
		return has("ITEM_ESCAPE_ROPE");
	},
	"PICKED_UP_HEAL_POWDER_FROM_KABUTO_ITEM_ROOM": function() {
		return has("ITEM_ESCAPE_ROPE");
	},
	"PICKED_UP_PSNCUREBERRY_FROM_KABUTO_ITEM_ROOM": function() {
		return has("ITEM_ESCAPE_ROPE");
	},
	"PICKED_UP_MYSTERYBERRY_FROM_OMANYTE_ITEM_ROOM": function() {
		if (can_surf() && can_strength() && has("ITEM_WATER_STONE")) {
			return "logical";
		}
	},
	"PICKED_UP_MYSTIC_WATER_FROM_OMANYTE_ITEM_ROOM": function() {
		if (can_surf() && can_strength() && has("ITEM_WATER_STONE")) {
			return "logical";
		}
	},
	"PICKED_UP_STAR_PIECE_FROM_OMANYTE_ITEM_ROOM": function() {
		if (can_surf() && can_strength() && has("ITEM_WATER_STONE")) {
			return "logical";
		}
	},
	"PICKED_UP_STARDUST_FROM_OMANYTE_ITEM_ROOM": function() {
		if (can_surf() && can_strength() && has("ITEM_WATER_STONE")) {
			return "logical";
		}
	},
	// 37
	"ROUTE_37_HIDDEN_ETHER": function() {
		if (can_ecruteak()) {
			return hidden_logic();
		}
	},
	"MAGNET_FROM_SUNNY": function() {
		return can_ecruteak();
	},
	"FRUITTREE_ROUTE_37_1": function() {
		return can_ecruteak();
	},
	"FRUITTREE_ROUTE_37_2": function() {
		return can_ecruteak();
	},
	"FRUITTREE_ROUTE_37_3": function() {
		return can_ecruteak();
	},
	// 38
	"FRUITTREE_ROUTE_38": function() {
		return can_ecruteak();
	},
	// 39
	"ROUTE_39_HIDDEN_NUGGET": function() {
		if (can_ecruteak()) {
			return hidden_logic();
		}
	},
	"FRUITTREE_ROUTE_39": function() {
		return can_ecruteak();
	},
	"TM13_SNORE_FROM_MOOMOO_FARM": function() {
		return can_ecruteak();
	},
	// 40
	"SHARP_BEAK_FROM_MONICA": function() {
		return can_olivine();
	},
	"ROUTE_40_HIDDEN_HYPER_POTION": function() {
		if (can_olivine()) {
			return hidden_logic();
		}
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
		const whirlable = can_whirl_islands();
		if (whirlable === "logical") {
			return hidden_logic();
		}
		return whirlable;
	},
	"WHIRL_ISLAND_B1F_HIDDEN_RARE_CANDY": function() {
		const whirlable = can_whirl_islands();
		if (whirlable === "logical") {
			return hidden_logic();
		}
		return whirlable;
	},
	"WHIRL_ISLAND_B1F_HIDDEN_ULTRA_BALL": function() {
		const whirlable = can_whirl_islands();
		if (whirlable === "logical") {
			return hidden_logic();
		}
		return whirlable;
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
		if (can_cianwood() && can_whirlpool()) {
			return hidden_logic();
		}
	},
	// 42
	"MOUNT_MORTAR_1F_INSIDE_ESCAPE_ROPE": function() {
		if (can_strength() && can_waterfall()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_HYPER_POTION": function() {
		if (can_strength() && can_waterfall()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_NUGGET": function() {
		if (can_strength() && can_waterfall()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_ULTRA_BALL": function() {
		if (can_strength() && can_waterfall()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_IRON": function() {
		if (can_waterfall()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_MAX_POTION": function() {
		if (can_waterfall()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_MAX_REVIVE": function() {
		if (can_strength() && can_waterfall()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_1F_INSIDE_HIDDEN_MAX_REPEL": function() {
		if (can_ecruteak() && can_waterfall()) {
			return hidden_logic();
		}
	},
	"MOUNT_MORTAR_1F_OUTSIDE_HIDDEN_HYPER_POTION": function() {
		if (can_ecruteak()) {
			return hidden_logic();
		}
	},
	"MOUNT_MORTAR_1F_OUTSIDE_ETHER": function() {
		return can_ecruteak();
	},
	"MOUNT_MORTAR_1F_OUTSIDE_REVIVE": function() {
		return can_ecruteak();
	},
	"MOUNT_MORTAR_2F_INSIDE_DRAGON_SCALE": function() {
		if (can_waterfall()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_2F_INSIDE_ELIXER": function() {
		if (can_waterfall()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_2F_INSIDE_ESCAPE_ROPE": function() {
		if (can_waterfall()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_2F_INSIDE_MAX_POTION": function() {
		if (can_waterfall()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_2F_INSIDE_RARE_CANDY": function() {
		if (can_waterfall()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_2F_INSIDE_TM_DEFENSE_CURL": function() {
		if (can_waterfall()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_2F_INSIDE_HIDDEN_FULL_RESTORE": function() {
		if (can_ecruteak() && can_waterfall()) {
			return hidden_logic();
		}
	},
	"MOUNT_MORTAR_B1F_CARBOS": function() {
		if (can_surf()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_B1F_FULL_RESTORE": function() {
		if (can_surf()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_B1F_HYPER_POTION": function() {
		if (can_surf()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_B1F_MAX_ETHER": function() {
		if (can_surf()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_B1F_PP_UP": function() {
		if (can_surf()) {
			return can_ecruteak();
		}
	},
	"MOUNT_MORTAR_B1F_HIDDEN_MAX_REVIVE": function() {
		if (can_surf() && can_ecruteak()) {
			return hidden_logic();
		}
	},
	"ROUTE_42_HIDDEN_MAX_POTION": function() {
		if (can_surf() && can_ecruteak()) {
			return hidden_logic();
		}
	},
	"ROUTE_42_ULTRA_BALL": function() {
		return can_ecruteak();
	},
	"ROUTE_42_SUPER_POTION": function() {
		if (can_surf()) {
			return can_ecruteak();
		}
	},
	"FRUITTREE_ROUTE_42_1": function() {
		if (can_surf() && can_cut()) {
			return can_ecruteak();
		}
	},
	"FRUITTREE_ROUTE_42_2": function() {
		if (can_surf() && can_cut()) {
			return can_ecruteak();
		}
	},
	"FRUITTREE_ROUTE_42_3": function() {
		if (can_surf() && can_cut()) {
			return can_ecruteak();
		}
	},
	// 43
	"LAKE_OF_RAGE_HIDDEN_FULL_RESTORE": function() {
		if (can_mahogany()) {
			return hidden_logic();
		}
	},
	"LAKE_OF_RAGE_HIDDEN_MAX_POTION": function() {
		if (can_mahogany()) {
			return hidden_logic();
		}
	},
	"RED_SCALE": function() {
		if (can_surf()) {
			return can_mahogany();
		}
	},
	"EVENT_AGREED_TO_ASSIST_LANCE": function() {
		if (can_surf()) {
			return can_mahogany();
		}
	},
	"LAKE_OF_RAGE_TM_DETECT": function() {
		if (can_cut()) {
			return can_mahogany();
		}
	},
	"ROUTE_43_MAX_ETHER": function() {
		return can_mahogany();
	},
	"FRUITTREE_ROUTE_43": function() {
		if (can_surf() && can_cut()) {
			return can_mahogany();
		}
	},
	"TM36_SLUDGE_BOMB": function() {
		if (has("EVENT_CLEARED_ROCKET_HIDEOUT")) {
			return can_mahogany();
		}
	},
	"BLACKBELT_FROM_WESLEY": function() {
		if (can_cut()) {
			return can_mahogany();
		}
	},
	"LAKE_OF_RAGE_HIDDEN_RARE_CANDY": function() {
		if (can_mahogany() && can_cut()) {
			return hidden_logic();
		}
	},
	"TM10_HIDDEN_POWER": function() {
		if (can_cut()) {
			return can_mahogany();
		}
	},
	"LAKE_OF_RAGE_ELIXER": function() {
		if (can_cut()) {
			return can_mahogany();
		}
	},
	// 44
	"HM07_WATERFALL": function() {
		return can_route44();
	},
	"ICE_PATH_1F_PP_UP": function() {
		return can_blackthorn();
	},
	"ICE_PATH_1F_PROTEIN": function() {
		return can_blackthorn();
	},
	"ICE_PATH_B1F_HIDDEN_MAX_POTION": function() {
		if (can_blackthorn()) {
			return hidden_logic();
		}
	},
	"ICE_PATH_B1F_IRON": function() {
		return can_blackthorn();
	},
	"ICE_PATH_B2F_BLACKTHORN_SIDE_HIDDEN_ICE_HEAL": function() {
		if (can_blackthorn()) {
			return hidden_logic();
		}
	},
	"ICE_PATH_B2F_BLACKTHORN_SIDE_TM_REST": function() {
		return can_blackthorn();
	},
	"ICE_PATH_B2F_MAHOGANY_SIDE_HIDDEN_CARBOS": function() {
		if (can_route44()) {
			return hidden_logic();
		}
	},
	"ICE_PATH_B2F_MAHOGANY_SIDE_MAX_POTION": function() {
		return can_route44();
	},
	"ICE_PATH_B2F_MAHOGANY_SIDE_FULL_HEAL": function() {
		return can_blackthorn();
	},
	"ICE_PATH_B3F_NEVERMELTICE": function() {
		return can_blackthorn();
	},
	"ROUTE_44_MAX_REPEL": function() {
		return can_route44();
	},
	"ROUTE_44_ULTRA_BALL": function() {
		return can_route44();
	},
	"FRUITTREE_ROUTE_44": function() {
		return can_route44();
	},
	"ROUTE_44_MAX_REVIVE": function() {
		if (can_surf()) {
			return can_route44();
		}
	},
	"ROUTE_44_HIDDEN_ELIXER": function() {
		if (can_surf() && can_route44()) {
			return hidden_logic();
		}
	},
	// 45
	"DARK_CAVE_BLACKTHORN_ENTRANCE_REVIVE": function() {
		if (can_surf() && can_blackthorn()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"DARK_CAVE_BLACKTHORN_ENTRANCE_TM_SNORE": function() {
		if (can_surf() && can_blackthorn()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"BLACKGLASSES_IN_DARK_CAVE": function() {
		if (can_surf() && can_blackthorn()) {
			if (can_flash()) {
				return "logical";
			}
			return "possible";
		}
	},
	"ROUTE_45_HIDDEN_PP_UP": function() {
		if (can_surf() && can_blackthorn()) {
			return hidden_logic();
		}
	},
	"FRUITTREE_ROUTE_45": function() {
		return can_blackthorn();
	},
	"ROUTE_45_ELIXER": function() {
		return can_blackthorn();
	},
	"ROUTE_45_MAX_POTION": function() {
		return can_blackthorn();
	},
	"ROUTE_45_NUGGET": function() {
		return can_blackthorn();
	},
	"ROUTE_45_REVIVE": function() {
		return can_blackthorn();
	},
	// 46
	"ROUTE_46_X_SPEED": function() {
		return can_route46();
	},
	"FRUITTREE_ROUTE_46_1": function() {
		return can_route46();
	},
	"FRUITTREE_ROUTE_46_2": function() {
		return can_route46();
	},
	// E4
	"EVENT_DEFEAT_LANCE": function() {
		return can_victory_road();
	}
}