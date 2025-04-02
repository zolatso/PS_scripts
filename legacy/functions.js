function addRandomImage() {

	var idplay = stringIDToTypeID( "play" );
    var desc849 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref84 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref84.putName( idaction, "Add random image" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref84.putName( idactionSet, "Tom's Actions" );
    desc849.putReference( idnull, ref84 );
	executeAction( idplay, desc849, DialogModes.NO );

}

function createLog(chuffy) {

	var captain = new String(chuffy)

	var splitAddress = captain.split("/")

	var getName = splitAddress[splitAddress.length-1]

	app.documents.add(1,1)

	var folder = "~/Pictures/logs/"

	var fName = folder + getName + ".psd";

	var file = new File(fName);

	var doc = app.activeDocument

	doc.saveAs(file);

	doc.close(SaveOptions.DONOTSAVECHANGES)

	var doc = app.activeDocument


}

function watercolour() {

	var idplay = stringIDToTypeID( "play" );
    var desc404 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref58 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref58.putName( idaction, "Watercolour" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref58.putName( idactionSet, "Tom's Actions" );
    desc404.putReference( idnull, ref58 );
	executeAction( idplay, desc404, DialogModes.NO )


}

function turnVibranceUp() {

	var idvibrance = stringIDToTypeID( "vibrance" );
    var desc786 = new ActionDescriptor();
    var idvibrance = stringIDToTypeID( "vibrance" );
    desc786.putInteger( idvibrance, 100 );
	executeAction( idvibrance, desc786, DialogModes.NO );

}

function tiler() {

	var idplay = stringIDToTypeID( "play" );
    var desc689 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref183 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref183.putName( idaction, "Tiler" );
	var idactionSet = stringIDToTypeID( "actionSet" );
    ref183.putName( idactionSet, "Generators" );
    desc689.putReference( idnull, ref183 );
	executeAction( idplay, desc689, DialogModes.NO );
	
}

function randomHorFlipping() {

	var idplay = stringIDToTypeID( "play" );
    var desc707 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref185 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref185.putName( idaction, "Random hor flipping" );
    var idactionSet = stringIDToTypeID( "actionSet" );
	ref185.putName( idactionSet, "Tom's Actions" );
    desc707.putReference( idnull, ref185 );
	executeAction( idplay, desc707, DialogModes.NO );

}

function randomVerFlipping() {

	var idplay = stringIDToTypeID( "play" );
    var desc707 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref185 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref185.putName( idaction, "Random ver flipping" );
    var idactionSet = stringIDToTypeID( "actionSet" );
	ref185.putName( idactionSet, "Tom's Actions" );
    desc707.putReference( idnull, ref185 );
	executeAction( idplay, desc707, DialogModes.NO );


}

function hueShiftPlusFifty() {

	var idhueSaturation = stringIDToTypeID( "hueSaturation" );
    var desc740 = new ActionDescriptor();
    var idpresetKind = stringIDToTypeID( "presetKind" );
    var idpresetKindType = stringIDToTypeID( "presetKindType" );
    var idpresetKindCustom = stringIDToTypeID( "presetKindCustom" );
    desc740.putEnumerated( idpresetKind, idpresetKindType, idpresetKindCustom );
    var idcolorize = stringIDToTypeID( "colorize" );
    desc740.putBoolean( idcolorize, false );
    var idadjustment = stringIDToTypeID( "adjustment" );
	var list60 = new ActionList();
	var desc741 = new ActionDescriptor();
	var idhue = stringIDToTypeID( "hue" );
	desc741.putInteger( idhue, 50 );
	var idsaturation = stringIDToTypeID( "saturation" );
	desc741.putInteger( idsaturation, 0 );
	var idlightness = stringIDToTypeID( "lightness" );
	desc741.putInteger( idlightness, 0 );
    var idhueSatAdjustmentVtwo = stringIDToTypeID( "hueSatAdjustmentV2" );
	list60.putObject( idhueSatAdjustmentVtwo, desc741 );
    desc740.putList( idadjustment, list60 );
	executeAction( idhueSaturation, desc740, DialogModes.NO );

}

function createImageLayersAbridged() {

	var idplay = stringIDToTypeID( "play" );
    var desc745 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref174 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref174.putName( idaction, "CreatImgLayers Abridged" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref174.putName( idactionSet, "Generators" );
    desc745.putReference( idnull, ref174 );
	executeAction( idplay, desc745, DialogModes.NO );

}

function shuffle(arr) {
  var i = arr.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random()*(i+1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
}

function findEdges() {

	var idfindEdges = stringIDToTypeID( "findEdges" );
	executeAction( idfindEdges, undefined, DialogModes.NO );

}

function addLayerMask() {

	var idmake = stringIDToTypeID( "make" );
	var desc226 = new ActionDescriptor();
	var idnew = stringIDToTypeID( "new" );
	var idchannel = stringIDToTypeID( "channel" );
	desc226.putClass( idnew, idchannel );
	var idat = stringIDToTypeID( "at" );
	var ref1 = new ActionReference();
	var idchannel = stringIDToTypeID( "channel" );
	var idchannel = stringIDToTypeID( "channel" );
	var idmask = stringIDToTypeID( "mask" );
	ref1.putEnumerated( idchannel, idchannel, idmask );
	desc226.putReference( idat, ref1 );
	var idusing = stringIDToTypeID( "using" );
	var iduserMaskEnabled = stringIDToTypeID( "userMaskEnabled" );
	var idrevealAll = stringIDToTypeID( "revealAll" );
	desc226.putEnumerated( idusing, iduserMaskEnabled, idrevealAll );
	executeAction( idmake, desc226, DialogModes.NO );

}

function playAddLatticeScript() {

	var idplay = stringIDToTypeID( "play" );
    var desc352 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref42 = new ActionReference();
    var idcommand = stringIDToTypeID( "command" );
    ref42.putIndex( idcommand, 1 );
    var idaction = stringIDToTypeID( "action" );
    ref42.putName( idaction, "Apply Lattice as Layer Mask v 2" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref42.putName( idactionSet, "Tom's Actions" );
    desc352.putReference( idnull, ref42 );
    var idcontinue = stringIDToTypeID( "continue" );
    desc352.putBoolean( idcontinue, true );
	executeAction( idplay, desc352, DialogModes.NO );

}

function focusOnLayerMask() {

	var idselect = stringIDToTypeID( "select" );
    var desc292 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref23 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idordinal = stringIDToTypeID( "ordinal" );
    var idtargetEnum = stringIDToTypeID( "targetEnum" );
    ref23.putEnumerated( idchannel, idordinal, idtargetEnum );
    desc292.putReference( idnull, ref23 );
    var idmakeVisible = stringIDToTypeID( "makeVisible" );
    desc292.putBoolean( idmakeVisible, true );
	executeAction( idselect, desc292, DialogModes.NO );

}

function createImageLayers() {

	var idplay = stringIDToTypeID( "play" );
    var desc577 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref89 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref89.putName( idaction, "Create Image Layers v 2" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref89.putName( idactionSet, "Generators" );
    desc577.putReference( idnull, ref89 );
	executeAction( idplay, desc577, DialogModes.NO );

}

function addBWGradient() {

	var idplay = stringIDToTypeID( "play" );
    var desc254 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref7 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref7.putName( idaction, "Add BW Gradient" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref7.putName( idactionSet, "Tom's Actions" );
    desc254.putReference( idnull, ref7 );
executeAction( idplay, desc254, DialogModes.NO );

}

function simpleSpikyWave() {

	var idplay = stringIDToTypeID( "play" );
	var desc600 = new ActionDescriptor();
	var idnull = stringIDToTypeID( "null" );
	var ref57 = new ActionReference();
	var idaction = stringIDToTypeID( "action" );
	ref57.putName( idaction, "Shorttightwave less" );
	var idactionSet = stringIDToTypeID( "actionSet" );
	ref57.putName( idactionSet, "Waves" );
	desc600.putReference( idnull, ref57 );
	executeAction( idplay, desc600, DialogModes.NO );

}

function waveGen(len, pos, min, max) {
	
	var loop = (2 * len) - 2;
	
	var cf = pos > 0 ? Math.ceil(pos / loop) - 1 : Math.ceil(pos / loop);
	cf = pos - (cf * loop);
	
// 	Check for reverse loop
	if (cf > len - 1) { 
		var chaffer = cf - (len - 1);
		cf = len - 1 - chaffer; 
	}
	
	var range = max - min;
	var amp = range / (len - 1);

	return min + (cf * amp);

}

function applyAsLayerMask() {

	var idmake = stringIDToTypeID( "make" );
    var desc1211 = new ActionDescriptor();
    var idnew = stringIDToTypeID( "new" );
    var idchannel = stringIDToTypeID( "channel" );
    desc1211.putClass( idnew, idchannel );
    var idat = stringIDToTypeID( "at" );
    var ref272 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idchannel = stringIDToTypeID( "channel" );
    var idmask = stringIDToTypeID( "mask" );
    ref272.putEnumerated( idchannel, idchannel, idmask );
    desc1211.putReference( idat, ref272 );
    var idusing = stringIDToTypeID( "using" );
    var iduserMaskEnabled = stringIDToTypeID( "userMaskEnabled" );
    var idrevealSelection = stringIDToTypeID( "revealSelection" );
    desc1211.putEnumerated( idusing, iduserMaskEnabled, idrevealSelection );
	executeAction( idmake, desc1211, DialogModes.NO );

}

function spikyWaveMild() {

	var idplay = stringIDToTypeID( "play" );
    var desc576 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref150 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref150.putName( idaction, "Shorttightwaveminimal" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref150.putName( idactionSet, "Waves" );
    desc576.putReference( idnull, ref150 );
	executeAction( idplay, desc576, DialogModes.NO );

}


function giveSC (l, r, t, b) {

	var peach = []
	peach[0] = [l,t]
	peach[1] = [r, t]
	peach[2] = [r, b]
	peach[3] = [l, b]
	
	return peach

}

function lattice() {

	var idplay = stringIDToTypeID( "play" );
    var desc1099 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref216 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref216.putName( idaction, "Lattice" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref216.putName( idactionSet, "Generators" );
    desc1099.putReference( idnull, ref216 );
	executeAction( idplay, desc1099, DialogModes.NO );

}

function createImageLayers() {

	var idplay = stringIDToTypeID( "play" );
    var desc56 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref35 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref35.putName( idaction, "Create Image Layers v 2" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref35.putName( idactionSet, "Generators" );
    desc56.putReference( idnull, ref35 );
	executeAction( idplay, desc56, DialogModes.NO );

}

function channels() {

	var idplay = stringIDToTypeID( "play" );
    var desc56 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref35 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref35.putName( idaction, "Channel mover" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref35.putName( idactionSet, "Tom's Actions" );
    desc56.putReference( idnull, ref35 );
	executeAction( idplay, desc56, DialogModes.NO );

}

function flipHor() {

	var idflip = stringIDToTypeID( "flip" );
    var desc52 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref26 = new ActionReference();
    var idlayer = stringIDToTypeID( "layer" );
    var idordinal = stringIDToTypeID( "ordinal" );
    var idtargetEnum = stringIDToTypeID( "targetEnum" );
    ref26.putEnumerated( idlayer, idordinal, idtargetEnum );
    desc52.putReference( idnull, ref26 );
    var idaxis = stringIDToTypeID( "axis" );
    var idorientation = stringIDToTypeID( "orientation" );
    var idhorizontal = stringIDToTypeID( "horizontal" );
    desc52.putEnumerated( idaxis, idorientation, idhorizontal );
	executeAction( idflip, desc52, DialogModes.NO );

}
function horFlip() {

	var idflip = stringIDToTypeID( "flip" );
    var desc103 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref59 = new ActionReference();
    var idlayer = stringIDToTypeID( "layer" );
    var idordinal = stringIDToTypeID( "ordinal" );
    var idtargetEnum = stringIDToTypeID( "targetEnum" );
    ref59.putEnumerated( idlayer, idordinal, idtargetEnum );
    desc103.putReference( idnull, ref59 );
    var idaxis = stringIDToTypeID( "axis" );
    var idorientation = stringIDToTypeID( "orientation" );
    var idhorizontal = stringIDToTypeID( "horizontal" );
    desc103.putEnumerated( idaxis, idorientation, idhorizontal );
	executeAction( idflip, desc103, DialogModes.NO );

}
function flipVer() {
	
	var idflip = stringIDToTypeID( "flip" );
    var desc53 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref27 = new ActionReference();
    var idlayer = stringIDToTypeID( "layer" );
    var idordinal = stringIDToTypeID( "ordinal" );
    var idtargetEnum = stringIDToTypeID( "targetEnum" );
    ref27.putEnumerated( idlayer, idordinal, idtargetEnum );
    desc53.putReference( idnull, ref27 );
    var idaxis = stringIDToTypeID( "axis" );
    var idorientation = stringIDToTypeID( "orientation" );
    var idvertical = stringIDToTypeID( "vertical" );
    desc53.putEnumerated( idaxis, idorientation, idvertical );
	executeAction( idflip, desc53, DialogModes.NO );
}



function applySelectionAsLayerMask() {

	var idmake = stringIDToTypeID( "make" );
    var desc195 = new ActionDescriptor();
    var idnew = stringIDToTypeID( "new" );
    var idchannel = stringIDToTypeID( "channel" );
    desc195.putClass( idnew, idchannel );
    var idat = stringIDToTypeID( "at" );
    var ref166 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idchannel = stringIDToTypeID( "channel" );
    var idmask = stringIDToTypeID( "mask" );
    ref166.putEnumerated( idchannel, idchannel, idmask );
    desc195.putReference( idat, ref166 );
    var idusing = stringIDToTypeID( "using" );
    var iduserMaskEnabled = stringIDToTypeID( "userMaskEnabled" );
    var idrevealSelection = stringIDToTypeID( "revealSelection" );
    desc195.putEnumerated( idusing, iduserMaskEnabled, idrevealSelection );
	executeAction( idmake, desc195, DialogModes.NO );

}

function selectLayerOutline() {

	var idset = stringIDToTypeID( "set" );
    var desc61 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref38 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idselection = stringIDToTypeID( "selection" );
    ref38.putProperty( idchannel, idselection );
    desc61.putReference( idnull, ref38 );
    var idto = stringIDToTypeID( "to" );
    var ref39 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idchannel = stringIDToTypeID( "channel" );
    var idtransparencyEnum = stringIDToTypeID( "transparencyEnum" );
    ref39.putEnumerated( idchannel, idchannel, idtransparencyEnum );
    desc61.putReference( idto, ref39 );
	executeAction( idset, desc61, DialogModes.NO );

}

function multiWaver() {

	var idplay = stringIDToTypeID( "play" );
    var desc628 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref174 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref174.putName( idaction, "Multi-waver" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref174.putName( idactionSet, "Waves" );
    desc628.putReference( idnull, ref174 );
	executeAction( idplay, desc628, DialogModes.NO );

}

function shortWave() {

	var idplay = stringIDToTypeID( "play" );
    var desc390 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref45 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref45.putName( idaction, "Shorttightwaveminimal" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref45.putName( idactionSet, "Waves" );
    desc390.putReference( idnull, ref45 );
	executeAction( idplay, desc390, DialogModes.NO );

}

function pasteInPlace() {
var idpaste = stringIDToTypeID( "paste" );
    var desc88 = new ActionDescriptor();
    var idinPlace = stringIDToTypeID( "inPlace" );
    desc88.putBoolean( idinPlace, true );
    var idantiAlias = stringIDToTypeID( "antiAlias" );
    var idantiAliasType = stringIDToTypeID( "antiAliasType" );
    var idantiAliasNone = stringIDToTypeID( "antiAliasNone" );
    desc88.putEnumerated( idantiAlias, idantiAliasType, idantiAliasNone );
    var idas = stringIDToTypeID( "as" );
    var idpixel = stringIDToTypeID( "pixel" );
    desc88.putClass( idas, idpixel );
executeAction( idpaste, desc88, DialogModes.NO );
}

function displace() {

	var idplay = stringIDToTypeID( "play" );
    var desc468 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref115 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref115.putName( idaction, "BG Displacement Map" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref115.putName( idactionSet, "Tom's Actions" );
    desc468.putReference( idnull, ref115 );
	executeAction( idplay, desc468, DialogModes.NO );
}

function displaceRandom() {

	var idplay = stringIDToTypeID( "play" );
    var desc225 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref3 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref3.putName( idaction, "Displace Random" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref3.putName( idactionSet, "Tom's Actions" );
    desc225.putReference( idnull, ref3 );
	executeAction( idplay, desc225, DialogModes.NO );

}

function threads() {
	var idplay = stringIDToTypeID( "play" );
    var desc446 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref387 = new ActionReference();
    var idaction = stringIDToTypeID( "action" );
    ref387.putName( idaction, "Threads" );
    var idactionSet = stringIDToTypeID( "actionSet" );
    ref387.putName( idactionSet, "Generators" );
    desc446.putReference( idnull, ref387 );
	executeAction( idplay, desc446, DialogModes.NO );
}

function riz(a) {
	return Math.floor(Math.random() * a);
}
function roz(a) {
	return Math.ceil(Math.random() * a);
}

function maxVib() {

	var idvibrance = stringIDToTypeID( "vibrance" );
    var desc288 = new ActionDescriptor();
    var idvibrance = stringIDToTypeID( "vibrance" );
    desc288.putInteger( idvibrance, 100 );
	executeAction( idvibrance, desc288, DialogModes.NO );

}

function ranColHSB(h, s, b, rh, rs, rb) {

	// this is quite badly organised as there are a lot of if else statements that
	// could be grouped

	
	var cols = [h,s,b]
	var rans = [rh/100, rs/100, rb/100]
	
	
	for (b=0; b < 3; b++) {
	
			
	
		// Initial processing in case a wave Gen has 
		// pushed the col value out of range
		// this treats the h value differently from the s and b values
		
		if (b > 0) {
			if (cols[b] > 100) {
		
				cols[b] = 100 - (cols[b] - 100)
		
			} else if (cols[b] < 0) {
		
				cols[b] = Math.abs(cols[b])
		
			}
			cols[b] = cols[b]/100
		} else if (b==0){
		
			if (cols[b]>360) {
			
				cols[b] = 0 + (cols[b]-360)
			
			} else if (cols[b]<0) {
			
				cols[b] = 360 + cols[b]
			
			}
			cols[b] = cols[b]/360
		
		}
	

		var r2 = rans[b] / 2;
		
		var np = (cols[b] - r2) + (Math.random() * rans[b]);
		
 		// This checks if the randomisation has pushed
 		// the color value beyond 0 or 1
 		// It has different effects for h s and b as h is a loop
 		
 		
 		if (b > 0) {	
			if (np < 0) {
				np = cols[b] + r2 - np;
			} else if (np > 1) {
				var a = np - 1;
				np = cols[b] - r2 - a;
			}
		} else {
		
			if (np < 0) {
				np = 1 - (r2 + np)
			} else if (np > 1) {
				np = 0 + (r2 - np)
			}
		
		} 
		
		
				
		if (b==0) {
			cols[b] = np * 360;
		} else {
			cols[b] = np * 100;
		}	 		
		
		
	
	}
	
			
	var colour = new SolidColor;
	colour.hsb.hue = cols[0];
	colour.hsb.saturation = cols[1];
	colour.hsb.brightness = cols[2];
	return colour;
	

}



function ranCol(a, b, l, ra, rb, rl) {
	
	var cols = [a,b,l]
	var rans = [ra/100, rb/100, rl/100]
	
	
	for (b=0; b < 3; b++) {
	
		// Initial processing in case a wave Gen has 
		// pushed the col value out of range
	
		if (cols[b] > 100) {
		
			cols[b] = 100 - (cols[b] - 100)
		
		} else if (cols[b] < 0) {
		
			cols[b] = Math.abs(cols[b])
		
		}
		
		cols[b] = cols[b] / 100

		var r2 = rans[b] / 2;
		
		var np = (cols[b] - r2) + (Math.random() * rans[b]);
		
 		// This checks if the randomisation has pushed
 		// the color value beyond 0 or 1	
		if (np < 0) {
			np = cols[b] + r2 - np;
		} else if (np > 1) {
			var a = np - 1;
 			np = cols[b] - r2 - a;
		}
		
		if (b==2) {
			cols[b] = np * 100;
		} else {
			cols[b] = (np * 255) - 128;
		}	 				
	
	}
			
	var colour = new SolidColor;
	colour.lab.a = cols[0];
	colour.lab.b = cols[1];
	colour.lab.l = cols[2];
	return colour;
}


function ranColTV(a, b, l, ra, rb, rl) {
	
	var cols = [a,b,l]
	
	var ranRange = rb - ra
	
	var ranA = Math.random() * ranRange
	
	var ranB = ranRange - ranA
	
	var rans = [(ranA+ra)/100, (ranB+ra)/100, rl/100]
	
	
	for (b=0; b < 3; b++) {
	
		// Initial processing in case a wave Gen has 
		// pushed the col value out of range
	
		if (cols[b] > 100) {
		
			cols[b] = 100 - (cols[b] - 100)
		
		} else if (cols[b] < 0) {
		
			cols[b] = Math.abs(cols[b])
		
		}
		
		cols[b] = cols[b] / 100

		var r2 = rans[b] / 2;
		
		var np = Math.random() * 100 > 50 ? cols[b] - rans[b] : cols[b] + rans[b]
		
 		// This checks if the randomisation has pushed
 		// the color value beyond 0 or 1	
		if (np < 0) {
			np = 0;
		} else if (np > 1) {
 			np = 1
		}
		
		if (b==2) {
			cols[b] = np * 100;
		} else {
			cols[b] = (np * 255) - 128;
		}	 				
	
	}
			
	var colour = new SolidColor;
	colour.lab.a = cols[0];
	colour.lab.b = cols[1];
	colour.lab.l = cols[2];
	return colour;
}

function resizeDoc(nw, nh, m) {

	// m = resize mode
	// m = 0 is concertina 
	// m = 1 is blow up
	// m = 2 is stretch

	// Functions within functions
	function flipVer() {
	
		var idflip = stringIDToTypeID( "flip" );
 	   var desc357 = new ActionDescriptor();
   		 var idnull = stringIDToTypeID( "null" );
        var ref42 = new ActionReference();
        var idlayer = stringIDToTypeID( "layer" );
        var idordinal = stringIDToTypeID( "ordinal" );
        var idtargetEnum = stringIDToTypeID( "targetEnum" );
        ref42.putEnumerated( idlayer, idordinal, idtargetEnum );
  		  desc357.putReference( idnull, ref42 );
  		  var idaxis = stringIDToTypeID( "axis" );
  		  var idorientation = stringIDToTypeID( "orientation" );
  		  var idvertical = stringIDToTypeID( "vertical" );
  		  desc357.putEnumerated( idaxis, idorientation, idvertical );
		executeAction( idflip, desc357, DialogModes.NO );
		
	}
	
	function horFlip() {

		var idflip = stringIDToTypeID( "flip" );
		var desc103 = new ActionDescriptor();
		var idnull = stringIDToTypeID( "null" );
		var ref59 = new ActionReference();
		var idlayer = stringIDToTypeID( "layer" );
		var idordinal = stringIDToTypeID( "ordinal" );
		var idtargetEnum = stringIDToTypeID( "targetEnum" );
		ref59.putEnumerated( idlayer, idordinal, idtargetEnum );
		desc103.putReference( idnull, ref59 );
		var idaxis = stringIDToTypeID( "axis" );
		var idorientation = stringIDToTypeID( "orientation" );
		var idhorizontal = stringIDToTypeID( "horizontal" );
		desc103.putEnumerated( idaxis, idorientation, idhorizontal );
		executeAction( idflip, desc103, DialogModes.NO );

	}
	
	var doc = app.activeDocument
	var dal = doc.artLayers
	var dw = doc.width
	var dh = doc.height
	
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
		
		} else if (m == 2) {
		
			doc.resizeImage(nw, nh)
		
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
		
		} else if (m == 2) {
			
			doc.resizeImage(nw,nh)
		
		}
	
	
	} else if (dw / dh == nw / nh) {
	// The final option is if the image to be resized and resize target share the same
	// aspect ratio
	
		doc.resizeImage(nw, nh)
	
	}
	  

}