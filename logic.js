function count_badges() {
	let count = 0;
	const badges = ["Boulder_Badge", "Cascade_Badge", "Thunder_Badge", "Rainbow_Badge", "Soul_Badge", "Marsh_Badge", "Volcano_Badge", "Earth_Badge"];
	for (const badge of badges) {
		const badgeDiv = document.getElementById(badge);
		if (badgeDiv.classList.contains("itemchecked")) {
			count = count + 1;
		}
	}
	return count;
}

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

function can_cut() {
	if (has("Cascade_Badge") && has("HM01_Cut")) {
		return "logical";
	}
}

function can_flash() {
	if (has("Boulder_Badge") && has("HM05_Flash")) {
		return "logical";
	}
}

function can_strength() {
	if (has("Rainbow_Badge") && has("HM04_Strength")) {
		return "logical";
	}
}

function can_surf() {
	if (has("Soul_Badge") && has("HM03_Surf")) {
		return "logical";
	}
}

function can_whirlpool() {
	//TODO
	return "logical";
}

function can_waterfall() {
	//TODO
	return "logical";
}

function hidden_logic() {
	if (has("Item_Finder")) {
		return "logical";
	}
	return "possible";
}
// Logic Helpers

// Town Logic

const locationHighlight = {}

const locationLogic = {
	// ////////////////////
	// Cities
	// ////////////////////
	// Pallet Town
	
	// Viridian City
	
	// Pewter City
	
	// Cerulean City
	
	// Vermilion City
	
	// Lavender Town
	
	// Celadon City
	
	// Saffron
	
	// Fuchsia City
	
	// Cinnabar
	
	// ////////////////////
	// Routes
	// ////////////////////
	// 1
	
	// 2
	
	// 4
	
	// 5
	
	// 8
	
	// 9
	
	// 10
	
	// 11
	
	// 12
	
	// 13
	
	// 15
	
	// 16
	
	// 17
	
	// 20
	
	// 23
	
	// 24
	
	// 25
	
}