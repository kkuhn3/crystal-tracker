function launch() {
	let url = "../?"
	if (PNAME.value && APORT.value) {
		url = url + "&name=" + PNAME.value;
		url = url + "&port=" + APORT.value;
	}
	url = url + "&bt=" + BT.value;
	url = url + "&hi=" + HI.value;
	url = url + "&jo=" + JO.value;
	url = url + "&vr=" + VR.value;
	url = url + "&ms=" + MS.value;
	url = url + "&g=" + G.value;
	url = url.replace("?&", "?");
	window.open(url, "_self");
}