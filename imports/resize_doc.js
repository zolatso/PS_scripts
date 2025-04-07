function resizeDoc(nw, nh, m) {
	// m = resize mode
	// m = 0 is concertina 
	// m = 1 is blow up
	// m = 2 is stretch
    // m = 3 is biggest size possible without changing aspect ratio
	var doc = app.activeDocument
	var dal = doc.artLayers
	var dw = doc.width
	var dh = doc.height
    var aspect_orig = dw / dh
    var aspect_mod = nw / nh

    // Exceptional case: if aspect ratios are identical or if 
    // resize mode is 2, we simply resize the doc to the desired dimensions with no 
    // additional processing and break the function
    if (m == 2 || aspect_orig == aspect_mod) {
        doc.resizeImage(nw, nh)
        return true
    }

    switch(m) {
        case 0:
            break;
        case 1:
            break;
        case 3: 
            break;
    }
	
	// First test is whether the aspect ratio of the image to be resized is 
	// smaller, larger, or the same as the resize target
	if (dw / dh < nw / nh) {
	// If the image to be resized is more portrait than the resize target
	
		if (m == 0) {
		
			// First, make the doc the right width
			var asp = nh / dh 
 			doc.resizeImage(dw * asp, dh * asp)
 			
 			dw = doc.width
 			dh = doc.height
		
			doc.resizeCanvas(nw, nh, AnchorPosition.TOPLEFT)
	
			var flipNumber = Math.floor(nw / dw)
		
			var sc = Array()
			sc[0] = [0,0]
			sc[1] = [dw, 0]
			sc[2] = [dw, dh]
			sc[3] = [0, dh]

			doc.selection.select(sc)
			dal[0].isBackgroundLayer = false
			doc.selection.copy(true)

			for (c = 0; c < flipNumber; c++) {
	
				sc[0] = [(c * dw) + dw, 0];
				sc[1] = [(c * dw) + (dw * 2), 0]
				sc[2] = [(c * dw) + (dw * 2), dh]
				sc[3] = [(c * dw) + dw, dh]
	
				doc.selection.select(sc)
	
				doc.paste()
	
				dal[0].translate(-2, 0)
	
				if (c%2 == 0) { flipHor() }

				//The final image is treated differently
				if (c == flipNumber - 1) {
	
				var xShift = dw - (nw - ((c * dw)+dw))
	
				doc.artLayers[0].translate(xShift-2,0)
		
				}

			}

			doc.flatten()
			dal[0].isBackgroundLayer = false
		
		} else if (m == 1) {
		
			var asp = nh / dh 
 			doc.resizeImage(dw * asp, dh * asp)
 			
 			dw = doc.width
 			dh = doc.height
		
			doc.resizeCanvas(nw, nh, AnchorPosition.MIDDLECENTER)
			
			var hdw = dw / 2
			var hnw = nw / 2
			var sc = Array()
			sc[0] = [hnw - hdw,0]
			sc[1] = [hnw + hdw, 0]
			sc[2] = [hnw + hdw, nh]
			sc[3] = [hnw - hdw, nh]

			doc.selection.select(sc)
			dal[0].isBackgroundLayer = false
			doc.selection.copy(true)
			
			doc.paste()
			
			var asp = nw / dw
			
			dal[0].resize(100 * asp, 100 * asp, AnchorPosition.MIDDLECENTER)
			
			doc.flatten()
			dal[0].isBackgroundLayer = false
		
		} 
	
	
	} else if (dw / dh > nw / nh) {
	// If the image to be resized is more landscape than the resize target
		
		// Tests which mode we should operate.
		if (m == 0) {
			
			// First, make the doc the right width
			var asp = nw / dw 
 			doc.resizeImage(dw * asp, dh * asp)
 			
 			dw = doc.width
 			dh = doc.height
		
			doc.resizeCanvas(nw, nh, AnchorPosition.TOPLEFT)
	
			var flipNumber = Math.floor(nh / dh)
		
			var sc = Array()
			sc[0] = [0,0]
			sc[1] = [dw, 0]
			sc[2] = [dw, dh]
			sc[3] = [0, dh]

			doc.selection.select(sc)
			dal[0].isBackgroundLayer = false
			doc.selection.copy(true)

			for (c = 0; c < flipNumber; c++) {
	
				sc[0] = [0, (c * dh) + dh];
				sc[1] = [dw, (c * dh) + dh]
				sc[2] = [dw, (c * dh) + (dh * 2)]
				sc[3] = [0, (c * dh) + (dh * 2)]
	
				doc.selection.select(sc)
	
				doc.paste()
	
				dal[0].translate(0, -2)
	
				if (c%2 == 0) { flipVer() }

				//The final image is treated differently
				if (c == flipNumber - 1) {
	
				var xShift = dh - (nh - ((c * dh)+dh))
	
				doc.artLayers[0].translate(0,xShift-2)
		
				}

			}

			doc.flatten()
			dal[0].isBackgroundLayer = false
		// End concertina program	
		} else if (m == 1) {
		
			var asp = nw / dw 
 			doc.resizeImage(dw * asp, dh * asp)
 			
 			dw = doc.width
 			dh = doc.height
		
			doc.resizeCanvas(nw, nh, AnchorPosition.MIDDLECENTER)
			
			var hdh = dh / 2
			var hnh = nh / 2
			var sc = Array()
			sc[0] = [0,hnh-hdh]
			sc[1] = [nw, hnh-hdh]
			sc[2] = [nw, hnh + hdh]
			sc[3] = [0, hnh+hdh]

			doc.selection.select(sc)
			dal[0].isBackgroundLayer = false
			doc.selection.copy(true)
			
			doc.paste()
			
			var asp = nh / dh
			
			dal[0].resize(100 * asp, 100 * asp, AnchorPosition.MIDDLECENTER)
			
			doc.flatten()
			dal[0].isBackgroundLayer = false
		
		} 
	  

}