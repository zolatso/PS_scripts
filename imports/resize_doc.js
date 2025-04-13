//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/ps_functions.js'

function resize_doc(nw, nh, m) {
	// m = resize mode
	// m = 0 is concertina 
	// m = 1 is blow up
	// m = 2 is stretch
    // m = 3 is biggest size possible without changing aspect ratio
	var doc = app.activeDocument
	var dal = doc.artLayers
	var dw = doc.width
	var dh = doc.height
    // Exceptional case: if aspect ratios are identical or if 
    // resize mode is 2, we simply resize the doc to the desired dimensions with no 
    // additional processing and break the function
    if (m == 2 || dw / dh == nw / nh) {
        doc.resizeImage(nw, nh)
		doc.flatten()
		dal[0].isBackgroundLayer = false
        return true
    }
	// Compares aspect ratios of original and target dimensions
	// variable is true if the target dims are more portrait than original
	var extend_h = nw / nh > dw / dh ? true : false 
	// Main switch for the different modes
    switch(m) {
        case 0:
			var resize_ratio = extend_h ? nh / dh : nw / dw
			doc.resizeImage(dw * resize_ratio, dh * resize_ratio)
			dw = doc.width
			dh = doc.height
			doc.resizeCanvas(nw, nh, AnchorPosition.TOPLEFT)
			// Get number of flips (we use floor as the remaining portion has to be filled in differently)
			var flipNumber = extend_h ? Math.floor(nw / dw) : Math.floor(nh / dh)
			doc.selection.select(get_sc(0, 0, dw, dh))
			dal[0].isBackgroundLayer = false
			doc.selection.copy(true)
			concertina_flips(dw, dh, nw, nh, flipNumber, extend_h)
			doc.flatten()
			dal[0].isBackgroundLayer = false
            break;
        case 1:
			resize_ratio = extend_h ? nw / dw : nh / dh
			doc.resizeImage(dw * resize_ratio, dh * resize_ratio)
			doc.resizeCanvas(nw, nh, AnchorPosition.MIDDLECENTER)
			doc.flatten()
			dal[0].isBackgroundLayer = false
            break;
        case 3: 
			resize_ratio = extend_h ? nh / dh : nw / dw
			doc.resizeImage(dw * resize_ratio, dh * resize_ratio)
			doc.flatten()
			dal[0].isBackgroundLayer = false
            break;
    }
}

function concertina_flips(dw, dh, nw, nh, flipNumber, extend_h) {
	var doc = app.activeDocument
	var dal = doc.artLayers
	for (c = 0; c < flipNumber; c++) {
		if (extend_h) {
			sc = get_sc((c * dw) + dw, 0, (c * dw) + (dw * 2), dh)
		} else {
			sc = get_sc(0, (c * dh) + dh, dw, (c * dh) + (dh * 2))
		}
		doc.selection.select(sc)
		doc.paste()
		dal[0].translate(-2, 0)
		// Every other slice needs to be flipped
		if (c%2 == 0) { 
			if (extend_h) { flipHor() } else { flipVer() }
		}
		//The final image is treated differently
		if (c == flipNumber - 1) {
			if (extend_h) {
				var xShift = dw - (nw - ((c * dw) + dw))
				doc.artLayers[0].translate(xShift-2,0)
			} else {
				var xShift = dh - (nh - ((c * dh) + dh))
				doc.artLayers[0].translate(0,xShift-2)
			}
		}
	}
}