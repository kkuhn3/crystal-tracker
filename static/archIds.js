const idToItem = {
	"//ID": "//https://github.com/ArchipelagoMW/Archipelago/blob/78bbdc6a7c177df69eebc4839211a89c628848cf/worlds/pokemon_crystal/items.py",
	"6": "ITEM_BICYCLE",
	"18": "ITEM_ESCAPE_ROPE",
	"23": "ITEM_WATER_STONE",
	"51": "ITEM_ITEMFINDER",
	"61": "ITEM_RED_SCALE",
	"62": "ITEM_SECRETPOTION",
	"63": "ITEM_S_S_TICKET",
	"64": "ITEM_MYSTERY_EGG",
	"65": "ITEM_CLEAR_BELL",
	"119": "ITEM_CARD_KEY",
	"120": "ITEM_MACHINE_PART",
	"122": "ITEM_LOST_ITEM",
	"125": "ITEM_BASEMENT_KEY",
	"126": "ITEM_PASS",
	"153": "ITEM_SQUIRTBOTTLE",
	"166": "ZEPHYR_BADGE",
	"167": "HIVE_BADGE",
	"168": "PLAIN_BADGE",
	"169": "FOG_BADGE",
	"170": "MINERAL_BADGE",
	"171": "STORM_BADGE",
	"172": "GLACIER_BADGE",
	"173": "RISING_BADGE",
	"174": "BOULDER_BADGE",
	"175": "CASCADE_BADGE",
	"176": "THUNDER_BADGE",
	"177": "RAINBOW_BADGE",
	"178": "SOUL_BADGE",
	"179": "MARSH_BADGE",
	"180": "VOLCANO_BADGE",
	"181": "EARTH_BADGE",
	"182": "ITEM_RADIO_CARD",
	"185": "ITEM_EXPN_CARD",
	"186": "ITEM_POKE_GEAR",
	"202": "ITEM_TM_ROCK_SMASH",
	"245": "HM_CUT",
	"246": "HM_FLY",
	"247": "HM_SURF",
	"248": "HM_STRENGTH",
	"249": "HM_FLASH",
	"250": "HM_WHIRLPOOL",
	"251": "HM_WATERFALL"
};

const idToLocation = {
	"//ID": "//https://github.com/ArchipelagoMW/Archipelago/blob/78bbdc6a7c177df69eebc4839211a89c628848cf/worlds/pokemon_crystal/locations.py",
	"8": "TM31_MUD_SLAP",
	"9": "TM49_FURY_CUTTER",
	"10": "TM01_DYNAMICPUNCH",
	"11": "TM45_ATTRACT",
	"12": "TM30_SHADOW_BALL",
	"13": "TM23_IRON_TAIL",
	"14": "TM16_ICY_WIND",
	"15": "TM24_DRAGONBREATH",
	"16": "HM01_CUT",
	"17": "HM02_FLY",
	"18": "HM03_SURF",
	"19": "HM04_STRENGTH",
	"20": "HM05_FLASH",
	"21": "HM06_WHIRLPOOL",
	"23": "OLD_ROD",
	"24": "GOOD_ROD",
	"25": "SUPER_ROD",
	"35": "SECRETPOTION_FROM_PHARMACY",
	"36": "SS_TICKET_FROM_ELM",
	"39": "BERRY_FROM_ROUTE_30_HOUSE",
	"53": "KURT_GAVE_YOU_LURE_BALL",
	"62": "TM13_SNORE_FROM_MOOMOO_FARM",
	"71": "SUNNY_DAY_FROM_RADIO_TOWER",
	"72": "PINK_BOW_FROM_MARY",
	"74": "RECEIVED_CARD_KEY",
	"75": "TM08_ROCK_SMASH",
	"77": "MYSTIC_WATER_IN_CHERRYGROVE",
	"78": "TM05_ROAR",
	"82": "HP_UP_FROM_RANDY",
	"83": "TM50_NIGHTMARE",
	"87": "QUICK_CLAW",
	"88": "TM10_HIDDEN_POWER",
	"89": "TM36_SLUDGE_BOMB",
	"90": "ITEMFINDER",
	"91": "BICYCLE",
	"92": "SQUIRTBOTTLE",
	"93": "MIRACLE_SEED_IN_ROUTE_32",
	"94": "CHARCOAL_IN_CHARCOAL_KILN",
	"95": "TM02_HEADBUTT",
	"99": "POISON_BARB_FROM_FRIEDA",
	"101": "PINK_BOW_FROM_TUSCANY",
	"103": "HARD_STONE_FROM_ARTHUR",
	"105": "MAGNET_FROM_SUNNY",
	"107": "BLACKBELT_FROM_WESLEY",
	"109": "SPELL_TAG_FROM_SANTOS",
	"111": "SHARP_BEAK_FROM_MONICA",
	"112": "SOFT_SAND_FROM_KATE",
	"113": "METAL_COAT_FROM_GRANDPA_ON_SS_AQUA",
	"114": "BLACKGLASSES_IN_DARK_CAVE",
	"115": "KINGS_ROCK_IN_SLOWPOKE_WELL",
	"116": "TM47_STEEL_WING",
	"117": "TM37_SANDSTORM",
	"120": "CLEAR_BELL",
	"121": "SILVER_WING",
	"122": "TM12_SWEET_SCENT",
	"124": "MASTER_BALL_FROM_ELM",
	"125": "TIN_TOWER_4F_HIDDEN_MAX_POTION",
	"126": "TIN_TOWER_5F_HIDDEN_FULL_RESTORE",
	"127": "TIN_TOWER_5F_HIDDEN_CARBOS",
	"128": "BURNED_TOWER_1F_HIDDEN_ETHER",
	"132": "NATIONAL_PARK_HIDDEN_FULL_HEAL",
	"133": "OLIVINE_LIGHTHOUSE_5F_HIDDEN_HYPER_POTION",
	"134": "TEAM_ROCKET_BASE_B1F_HIDDEN_REVIVE",
	"135": "TEAM_ROCKET_BASE_B2F_HIDDEN_FULL_HEAL",
	"136": "ILEX_FOREST_HIDDEN_ETHER",
	"137": "ILEX_FOREST_HIDDEN_SUPER_POTION",
	"138": "ILEX_FOREST_HIDDEN_FULL_HEAL",
	"139": "GOLDENROD_UNDERGROUND_HIDDEN_PARLYZ_HEAL",
	"140": "GOLDENROD_UNDERGROUND_HIDDEN_SUPER_POTION",
	"141": "GOLDENROD_UNDERGROUND_HIDDEN_ANTIDOTE",
	"142": "GOLDENROD_UNDERGROUND_SWITCH_ROOM_ENTRANCES_HIDDEN_MAX_POTION",
	"143": "GOLDENROD_UNDERGROUND_SWITCH_ROOM_ENTRANCES_HIDDEN_REVIVE",
	"144": "MOUNT_MORTAR_1F_OUTSIDE_HIDDEN_HYPER_POTION",
	"145": "MOUNT_MORTAR_1F_INSIDE_HIDDEN_MAX_REPEL",
	"146": "MOUNT_MORTAR_2F_INSIDE_HIDDEN_FULL_RESTORE",
	"147": "MOUNT_MORTAR_B1F_HIDDEN_MAX_REVIVE",
	"148": "ICE_PATH_B1F_HIDDEN_MAX_POTION",
	"149": "ICE_PATH_B2F_MAHOGANY_SIDE_HIDDEN_CARBOS",
	"150": "ICE_PATH_B2F_BLACKTHORN_SIDE_HIDDEN_ICE_HEAL",
	"151": "WHIRL_ISLAND_B1F_HIDDEN_RARE_CANDY",
	"152": "WHIRL_ISLAND_B1F_HIDDEN_ULTRA_BALL",
	"153": "WHIRL_ISLAND_B1F_HIDDEN_FULL_RESTORE",
	"154": "SILVER_CAVE_ROOM_1_HIDDEN_DIRE_HIT",
	"155": "SILVER_CAVE_ROOM_1_HIDDEN_ULTRA_BALL",
	"156": "SILVER_CAVE_ROOM_2_HIDDEN_MAX_POTION",
	"157": "DARK_CAVE_VIOLET_ENTRANCE_HIDDEN_ELIXER",
	"158": "VICTORY_ROAD_HIDDEN_MAX_POTION",
	"159": "VICTORY_ROAD_HIDDEN_FULL_HEAL",
	"160": "DRAGONS_DEN_B1F_HIDDEN_REVIVE",
	"161": "DRAGONS_DEN_B1F_HIDDEN_MAX_POTION",
	"162": "DRAGONS_DEN_B1F_HIDDEN_MAX_ELIXER",
	"163": "ROUTE_28_HIDDEN_RARE_CANDY",
	"164": "ROUTE_30_HIDDEN_POTION",
	"165": "ROUTE_32_HIDDEN_GREAT_BALL",
	"166": "ROUTE_32_HIDDEN_SUPER_POTION",
	"167": "ROUTE_34_HIDDEN_RARE_CANDY",
	"168": "ROUTE_34_HIDDEN_SUPER_POTION",
	"169": "ROUTE_37_HIDDEN_ETHER",
	"170": "ROUTE_39_HIDDEN_NUGGET",
	"171": "ROUTE_40_HIDDEN_HYPER_POTION",
	"172": "ROUTE_41_HIDDEN_MAX_ETHER",
	"173": "ROUTE_42_HIDDEN_MAX_POTION",
	"174": "ROUTE_44_HIDDEN_ELIXER",
	"175": "ROUTE_45_HIDDEN_PP_UP",
	"176": "VIOLET_CITY_HIDDEN_HYPER_POTION",
	"177": "AZALEA_TOWN_HIDDEN_FULL_HEAL",
	"178": "CIANWOOD_CITY_HIDDEN_REVIVE",
	"179": "CIANWOOD_CITY_HIDDEN_MAX_ETHER",
	"180": "ECRUTEAK_CITY_HIDDEN_HYPER_POTION",
	"181": "LAKE_OF_RAGE_HIDDEN_FULL_RESTORE",
	"182": "LAKE_OF_RAGE_HIDDEN_RARE_CANDY",
	"183": "LAKE_OF_RAGE_HIDDEN_MAX_POTION",
	"184": "SILVER_CAVE_OUTSIDE_HIDDEN_FULL_RESTORE",
	"200": "NUGGET_FROM_GUY",
	"209": "PASS_FROM_COPYCAT",
	"210": "LOST_ITEM_FROM_FAN_CLUB",
	"212": "LISTENED_TO_FAN_CLUB_PRESIDENT",
	"216": "CLEARED_NUGGET_BRIDGE",
	"218": "TM03_CURSE",
	"219": "CLEANSE_TAG",
	"220": "TM19_GIGA_DRAIN",
	"221": "TM06_TOXIC",
	"222": "UP_GRADE",
	"223": "TM07_ZAP_CANNON",
	"224": "TM42_DREAM_EATER",
	"226": "HP_UP_FROM_VERMILION_GUY",
	"227": "TM29_PSYCHIC",
	"228": "DIGLETTS_CAVE_HIDDEN_MAX_REVIVE",
	"229": "UNDERGROUND_PATH_HIDDEN_FULL_RESTORE",
	"230": "UNDERGROUND_PATH_HIDDEN_X_SPECIAL",
	"231": "ROCK_TUNNEL_1F_HIDDEN_X_ACCURACY",
	"232": "ROCK_TUNNEL_1F_HIDDEN_X_DEFEND",
	"233": "ROCK_TUNNEL_B1F_HIDDEN_MAX_POTION",
	"234": "OLIVINE_PORT_HIDDEN_PROTEIN",
	"235": "VERMILION_PORT_HIDDEN_IRON",
	"237": "ROUTE_2_HIDDEN_MAX_ETHER",
	"238": "ROUTE_2_HIDDEN_FULL_HEAL",
	"239": "ROUTE_2_HIDDEN_FULL_RESTORE",
	"240": "ROUTE_2_HIDDEN_REVIVE",
	"241": "ROUTE_4_HIDDEN_ULTRA_BALL",
	"242": "ROUTE_9_HIDDEN_ETHER",
	"243": "ROUTE_12_HIDDEN_ELIXER",
	"244": "ROUTE_13_HIDDEN_CALCIUM",
	"245": "ROUTE_11_HIDDEN_REVIVE",
	"246": "ROUTE_17_HIDDEN_MAX_ETHER",
	"247": "ROUTE_17_HIDDEN_MAX_ELIXER",
	"248": "ROUTE_25_HIDDEN_POTION",
	"250": "CERULEAN_CITY_BERSERK_GENE",
	"251": "CERULEAN_GYM_MACHINE_PART",
	"252": "VERMILION_CITY_HIDDEN_FULL_HEAL",
	"253": "CELADON_CITY_HIDDEN_PP_UP",
	"254": "CINNABAR_ISLAND_HIDDEN_RARE_CANDY",
	"255": "BURNED_TOWER_1F_HIDDEN_ULTRA_BALL",
	"261": "ZEPHYR_BADGE_FROM_FALKNER",
	"262": "HIVE_BADGE_FROM_BUGSY",
	"263": "PLAIN_BADGE_FROM_WHITNEY",
	"264": "FOG_BADGE_FROM_MORTY",
	"265": "STORM_BADGE_FROM_CHUCK",
	"266": "MINERAL_BADGE_FROM_JASMINE",
	"267": "GLACIER_BADGE_FROM_PRYCE",
	"268": "RISING_BADGE_FROM_CLAIR",
	"269": "BOULDER_BADGE_FROM_BROCK",
	"270": "CASCADE_BADGE_FROM_MISTY",
	"271": "THUNDER_BADGE_FROM_LTSURGE",
	"272": "RAINBOW_BADGE_FROM_ERIKA",
	"273": "SOUL_BADGE_FROM_JANINE",
	"274": "MARSH_BADGE_FROM_SABRINA",
	"275": "VOLCANO_BADGE_FROM_BLAINE",
	"276": "EARTH_BADGE_FROM_BLUE",
	"277": "POTION_FROM_ELMS_AIDE",
	"278": "MYSTERY_EGG",
	"279": "EXP_SHARE",
	"280": "RED_SCALE",
	"281": "POKE_BALL_FROM_ELMS_AIDE",
	"282": "RADIO_CARD",
	"283": "MAP_CARD",
	"285": "EXPN_CARD",
	"286": "POKEGEAR",
	"551": "BUENA_BLUE_CARD",
	"950": "BEAT_ROCKET_EXECUTIVEM_3",
	"1526": "VIOLET_CITY_PP_UP",
	"1527": "VIOLET_CITY_RARE_CANDY",
	"1528": "LAKE_OF_RAGE_ELIXER",
	"1529": "LAKE_OF_RAGE_TM_DETECT",
	"1530": "SPROUT_TOWER_1F_PARLYZ_HEAL",
	"1531": "SPROUT_TOWER_2F_X_ACCURACY",
	"1532": "SPROUT_TOWER_3F_POTION",
	"1533": "SPROUT_TOWER_3F_ESCAPE_ROPE",
	"1534": "TIN_TOWER_3F_FULL_HEAL",
	"1535": "TIN_TOWER_4F_ULTRA_BALL",
	"1536": "TIN_TOWER_4F_PP_UP",
	"1537": "TIN_TOWER_4F_ESCAPE_ROPE",
	"1538": "TIN_TOWER_5F_RARE_CANDY",
	"1539": "TIN_TOWER_7F_MAX_REVIVE",
	"1540": "TIN_TOWER_8F_NUGGET",
	"1541": "TIN_TOWER_8F_MAX_ELIXER",
	"1542": "TIN_TOWER_8F_FULL_RESTORE",
	"1543": "TEAM_ROCKET_BASE_B3F_ULTRA_BALL",
	"1544": "GOLDENROD_UNDERGROUND_WAREHOUSE_ULTRA_BALL",
	"1545": "BURNED_TOWER_1F_HP_UP",
	"1546": "BURNED_TOWER_B1F_TM_ENDURE",
	"1547": "NATIONAL_PARK_PARLYZ_HEAL",
	"1548": "NATIONAL_PARK_TM_DIG",
	"1549": "UNION_CAVE_1F_GREAT_BALL",
	"1550": "UNION_CAVE_1F_X_ATTACK",
	"1551": "UNION_CAVE_1F_POTION",
	"1552": "UNION_CAVE_1F_AWAKENING",
	"1553": "UNION_CAVE_B1F_TM_SWIFT",
	"1554": "UNION_CAVE_B1F_X_DEFEND",
	"1555": "UNION_CAVE_B2F_ELIXER",
	"1556": "UNION_CAVE_B2F_HYPER_POTION",
	"1557": "SLOWPOKE_WELL_B1F_SUPER_POTION",
	"1558": "SLOWPOKE_WELL_B2F_TM_RAIN_DANCE",
	"1559": "OLIVINE_LIGHTHOUSE_3F_ETHER",
	"1560": "OLIVINE_LIGHTHOUSE_5F_RARE_CANDY",
	"1561": "OLIVINE_LIGHTHOUSE_5F_SUPER_REPEL",
	"1562": "OLIVINE_LIGHTHOUSE_5F_TM_SWAGGER",
	"1563": "OLIVINE_LIGHTHOUSE_6F_SUPER_POTION",
	"1564": "TEAM_ROCKET_BASE_B1F_HYPER_POTION",
	"1565": "TEAM_ROCKET_BASE_B1F_NUGGET",
	"1566": "TEAM_ROCKET_BASE_B1F_GUARD_SPEC",
	"1567": "TEAM_ROCKET_BASE_B2F_TM_THIEF",
	"1568": "TEAM_ROCKET_BASE_B3F_PROTEIN",
	"1569": "TEAM_ROCKET_BASE_B3F_X_SPECIAL",
	"1570": "TEAM_ROCKET_BASE_B3F_FULL_HEAL",
	"1571": "TEAM_ROCKET_BASE_B3F_ICE_HEAL",
	"1572": "ILEX_FOREST_REVIVE",
	"1573": "GOLDENROD_UNDERGROUND_COIN_CASE",
	"1574": "GOLDENROD_UNDERGROUND_SWITCH_ROOM_ENTRANCES_SMOKE_BALL",
	"1575": "GOLDENROD_UNDERGROUND_SWITCH_ROOM_ENTRANCES_FULL_HEAL",
	"1576": "GOLDENROD_DEPT_STORE_B1F_ETHER",
	"1577": "GOLDENROD_DEPT_STORE_B1F_AMULET_COIN",
	"1578": "GOLDENROD_DEPT_STORE_B1F_BURN_HEAL",
	"1579": "GOLDENROD_DEPT_STORE_B1F_ULTRA_BALL",
	"1580": "GOLDENROD_UNDERGROUND_WAREHOUSE_MAX_ETHER",
	"1581": "GOLDENROD_UNDERGROUND_WAREHOUSE_TM_SLEEP_TALK",
	"1582": "MOUNT_MORTAR_1F_OUTSIDE_ETHER",
	"1583": "MOUNT_MORTAR_1F_OUTSIDE_REVIVE",
	"1584": "MOUNT_MORTAR_1F_INSIDE_ESCAPE_ROPE",
	"1585": "MOUNT_MORTAR_1F_INSIDE_MAX_REVIVE",
	"1586": "MOUNT_MORTAR_1F_INSIDE_HYPER_POTION",
	"1587": "MOUNT_MORTAR_2F_INSIDE_MAX_POTION",
	"1588": "MOUNT_MORTAR_2F_INSIDE_RARE_CANDY",
	"1589": "MOUNT_MORTAR_2F_INSIDE_TM_DEFENSE_CURL",
	"1590": "MOUNT_MORTAR_2F_INSIDE_DRAGON_SCALE",
	"1591": "MOUNT_MORTAR_2F_INSIDE_ELIXER",
	"1592": "MOUNT_MORTAR_2F_INSIDE_ESCAPE_ROPE",
	"1593": "MOUNT_MORTAR_B1F_HYPER_POTION",
	"1594": "MOUNT_MORTAR_B1F_CARBOS",
	"1595": "HM07_WATERFALL",
	"1596": "ICE_PATH_1F_PP_UP",
	"1597": "ICE_PATH_B1F_IRON",
	"1598": "ICE_PATH_B2F_MAHOGANY_SIDE_FULL_HEAL",
	"1599": "ICE_PATH_B2F_MAHOGANY_SIDE_MAX_POTION",
	"1600": "ICE_PATH_B2F_BLACKTHORN_SIDE_TM_REST",
	"1601": "ICE_PATH_B3F_NEVERMELTICE",
	"1602": "WHIRL_ISLAND_NE_ULTRA_BALL",
	"1603": "WHIRL_ISLAND_SW_ULTRA_BALL",
	"1604": "WHIRL_ISLAND_B1F_FULL_RESTORE",
	"1605": "WHIRL_ISLAND_B1F_CARBOS",
	"1606": "WHIRL_ISLAND_B1F_CALCIUM",
	"1607": "WHIRL_ISLAND_B1F_NUGGET",
	"1608": "WHIRL_ISLAND_B1F_ESCAPE_ROPE",
	"1609": "WHIRL_ISLAND_B2F_FULL_RESTORE",
	"1610": "WHIRL_ISLAND_B2F_MAX_REVIVE",
	"1611": "WHIRL_ISLAND_B2F_MAX_ELIXER",
	"1612": "SILVER_CAVE_ROOM_1_MAX_ELIXER",
	"1613": "SILVER_CAVE_ROOM_1_PROTEIN",
	"1614": "SILVER_CAVE_ROOM_1_ESCAPE_ROPE",
	"1615": "SILVER_CAVE_ITEM_ROOMS_MAX_REVIVE",
	"1616": "SILVER_CAVE_ITEM_ROOMS_FULL_RESTORE",
	"1617": "DARK_CAVE_VIOLET_ENTRANCE_POTION",
	"1618": "DARK_CAVE_VIOLET_ENTRANCE_FULL_HEAL",
	"1619": "DARK_CAVE_VIOLET_ENTRANCE_HYPER_POTION",
	"1620": "DARK_CAVE_BLACKTHORN_ENTRANCE_REVIVE",
	"1621": "DARK_CAVE_BLACKTHORN_ENTRANCE_TM_SNORE",
	"1622": "VICTORY_ROAD_TM_EARTHQUAKE",
	"1623": "VICTORY_ROAD_MAX_REVIVE",
	"1624": "VICTORY_ROAD_FULL_RESTORE",
	"1625": "VICTORY_ROAD_FULL_HEAL",
	"1626": "VICTORY_ROAD_HP_UP",
	"1627": "DRAGONS_DEN_B1F_DRAGON_FANG",
	"1628": "TOHJO_FALLS_MOON_STONE",
	"1629": "ROUTE_26_MAX_ELIXER",
	"1630": "ROUTE_27_TM_SOLARBEAM",
	"1631": "ROUTE_27_RARE_CANDY",
	"1632": "ROUTE_29_POTION",
	"1633": "ROUTE_31_POTION",
	"1634": "ROUTE_31_POKE_BALL",
	"1635": "ROUTE_32_GREAT_BALL",
	"1636": "ROUTE_32_REPEL",
	"1637": "ROUTE_35_TM_ROLLOUT",
	"1638": "ROUTE_42_ULTRA_BALL",
	"1639": "ROUTE_42_SUPER_POTION",
	"1640": "ROUTE_43_MAX_ETHER",
	"1641": "ROUTE_44_MAX_REVIVE",
	"1642": "ROUTE_44_ULTRA_BALL",
	"1643": "ROUTE_45_NUGGET",
	"1644": "ROUTE_45_REVIVE",
	"1645": "ROUTE_45_ELIXER",
	"1646": "ROUTE_45_MAX_POTION",
	"1647": "ROUTE_46_X_SPEED",
	"1841": "PICKED_UP_FOCUS_BAND",
	"1842": "ROCK_TUNNEL_1F_ELIXER",
	"1843": "ROCK_TUNNEL_1F_TM_STEEL_WING",
	"1844": "ROCK_TUNNEL_B1F_IRON",
	"1845": "ROCK_TUNNEL_B1F_PP_UP",
	"1846": "ROCK_TUNNEL_B1F_REVIVE",
	"1847": "ROUTE_2_DIRE_HIT",
	"1848": "ROUTE_2_MAX_POTION",
	"1849": "ROUTE_2_CARBOS",
	"1850": "ROUTE_2_ELIXER",
	"1851": "ROUTE_4_HP_UP",
	"1852": "ROUTE_12_CALCIUM",
	"1853": "ROUTE_12_NUGGET",
	"1854": "ROUTE_15_PP_UP",
	"1855": "ROUTE_25_PROTEIN",
	"1868": "PICKED_UP_BERRY_FROM_KABUTO_ITEM_ROOM",
	"1869": "PICKED_UP_PSNCUREBERRY_FROM_KABUTO_ITEM_ROOM",
	"1870": "PICKED_UP_HEAL_POWDER_FROM_KABUTO_ITEM_ROOM",
	"1871": "PICKED_UP_ENERGYPOWDER_FROM_KABUTO_ITEM_ROOM",
	"1872": "PICKED_UP_MYSTERYBERRY_FROM_OMANYTE_ITEM_ROOM",
	"1873": "PICKED_UP_MYSTIC_WATER_FROM_OMANYTE_ITEM_ROOM",
	"1874": "PICKED_UP_STARDUST_FROM_OMANYTE_ITEM_ROOM",
	"1875": "PICKED_UP_STAR_PIECE_FROM_OMANYTE_ITEM_ROOM",
	"1876": "PICKED_UP_GOLD_BERRY_FROM_AERODACTYL_ITEM_ROOM",
	"1877": "PICKED_UP_MOON_STONE_FROM_AERODACTYL_ITEM_ROOM",
	"1878": "PICKED_UP_HEAL_POWDER_FROM_AERODACTYL_ITEM_ROOM",
	"1879": "PICKED_UP_ENERGY_ROOT_FROM_AERODACTYL_ITEM_ROOM",
	"1882": "MOUNT_MORTAR_1F_INSIDE_MAX_POTION",
	"1883": "MOUNT_MORTAR_1F_INSIDE_NUGGET",
	"1900": "ROUTE_30_ANTIDOTE",
	"1901": "ILEX_FOREST_X_ATTACK",
	"1902": "ILEX_FOREST_ANTIDOTE",
	"1903": "ILEX_FOREST_ETHER",
	"1904": "ROUTE_34_NUGGET",
	"1905": "ROUTE_44_MAX_REPEL",
	"1906": "ICE_PATH_1F_PROTEIN",
	"1907": "DRAGONS_DEN_B1F_CALCIUM",
	"1908": "DRAGONS_DEN_B1F_MAX_ELIXER",
	"1909": "SILVER_CAVE_ROOM_1_ULTRA_BALL",
	"1910": "SILVER_CAVE_ROOM_2_CALCIUM",
	"1911": "SILVER_CAVE_ROOM_2_ULTRA_BALL",
	"1912": "SILVER_CAVE_ROOM_2_PP_UP",
	"1914": "TIN_TOWER_6F_MAX_POTION",
	"1915": "TIN_TOWER_9F_HP_UP",
	"1916": "MOUNT_MORTAR_1F_INSIDE_IRON",
	"1917": "MOUNT_MORTAR_1F_INSIDE_ULTRA_BALL",
	"1918": "MOUNT_MORTAR_B1F_FULL_RESTORE",
	"1919": "MOUNT_MORTAR_B1F_MAX_ETHER",
	"1920": "MOUNT_MORTAR_B1F_PP_UP",
	"1921": "RADIO_TOWER_5F_ULTRA_BALL",
	"1922": "DARK_CAVE_VIOLET_ENTRANCE_DIRE_HIT",
	"2048": "FRUITTREE_ROUTE_29",
	"2049": "FRUITTREE_ROUTE_30_1",
	"2050": "FRUITTREE_ROUTE_38",
	"2051": "FRUITTREE_ROUTE_46_1",
	"2052": "FRUITTREE_ROUTE_30_2",
	"2053": "FRUITTREE_ROUTE_33",
	"2054": "FRUITTREE_ROUTE_31",
	"2055": "FRUITTREE_ROUTE_43",
	"2056": "FRUITTREE_VIOLET_CITY",
	"2057": "FRUITTREE_ROUTE_46_2",
	"2058": "FRUITTREE_ROUTE_35",
	"2059": "FRUITTREE_ROUTE_45",
	"2060": "FRUITTREE_ROUTE_36",
	"2061": "FRUITTREE_ROUTE_26",
	"2062": "FRUITTREE_ROUTE_39",
	"2063": "FRUITTREE_ROUTE_44",
	"2064": "FRUITTREE_ROUTE_37_1",
	"2065": "FRUITTREE_ROUTE_37_2",
	"2066": "FRUITTREE_ROUTE_37_3",
	"2067": "FRUITTREE_AZALEA_TOWN",
	"2068": "FRUITTREE_ROUTE_42_1",
	"2069": "FRUITTREE_ROUTE_42_2",
	"2070": "FRUITTREE_ROUTE_42_3",
	"2071": "FRUITTREE_ROUTE_11",
	"2072": "FRUITTREE_ROUTE_2",
	"2073": "FRUITTREE_ROUTE_1",
	"2074": "FRUITTREE_ROUTE_8",
	"2075": "FRUITTREE_PEWTER_CITY_1",
	"2076": "FRUITTREE_PEWTER_CITY_2",
	"2077": "FRUITTREE_FUCHSIA_CITY",

	"//Huh?": "//These items are included in locations.json, but not in regions.json",
	"//236": "MOUNT_MOON_SQUARE_HIDDEN_MOON_STONE",
	"//1867": "PICKED_UP_CHARCOAL_FROM_HO_OH_ITEM_ROOM",
	"//1864": "PICKED_UP_GOLD_BERRY_FROM_HO_OH_ITEM_ROOM",
	"//1865": "PICKED_UP_MYSTERYBERRY_FROM_HO_OH_ITEM_ROOM",
	"//1866": "PICKED_UP_REVIVAL_HERB_FROM_HO_OH_ITEM_ROOM",
	"//287": "POKEDEX",
	"//1695": "ROUTE_34_ILEX_FOREST_GATE_LASS",
	"//522": "EVERSTONE_FROM_BILLS_GRANDPA",
	"//523": "LEAF_STONE_FROM_BILLS_GRANDPA",
	"//524": "WATER_STONE_FROM_BILLS_GRANDPA",
	"//525": "FIRE_STONE_FROM_BILLS_GRANDPA",
	"//526": "THUNDERSTONE_FROM_BILLS_GRANDPA",
	"//86": "EVERSTONE_FROM_ELM",
	"//554": "GS_BALL_FROM_GOLDENROD_POKEMON_CENTER",
	"//335": "PROTEIN_FROM_HUEY",
	"//336": "HP_UP_FROM_JOEY",
	"//256": "GINA_GAVE_LEAF_STONE",
	"//257": "ALAN_GAVE_FIRE_STONE",
	"//258": "DANA_GAVE_THUNDERSTONE",
	"//259": "TULLY_GAVE_WATER_STONE",
	"//260": "TIFFANY_GAVE_PINK_BOW",
	"//337": "CARBOS_FROM_VANCE"
};

const idToEvent = {
	"//ID": "//https://github.com/ArchipelagoMW/Archipelago/blob/78bbdc6a7c177df69eebc4839211a89c628848cf/worlds/pokemon_crystal/locations.py",
	"53": "EVENT_HELP_KURT",
	"120": "EVENT_CLEARED_RADIO_TOWER",
	"265": "EVENT_DEFEAT_CHUCK",
	"21": "EVENT_CLEARED_ROCKET_HIDEOUT",
	"268": "EVENT_DEFEAT_CLAIR",
	"223": "EVENT_RESTORED_POWER",
	"//none": "EVENT_DEFEAT_RED",
	"83": "EVENT_DELIVERED_KENYA",
	"280": "EVENT_AGREED_TO_ASSIST_LANCE",
	"36": "EVENT_DEFEAT_LANCE"
};
