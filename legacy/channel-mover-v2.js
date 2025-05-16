
app.preferences.rulerUnits = Units.PIXELS;
cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

var doc = app.activeDocument;
var origName = doc.activeLayer.name
var info = doc.activeLayer.name.split(" ");
var amp = info[0] 
var warm = info[1]
var fuzz = info[2]
var move = info[3]
var loops = info.length > 4 ? info[4] : 1;

// Need to check if layer is inside folder
if (doc.activeLayer.parent.name !== app.activeDocument.name) {
var parent = doc.activeLayer.parent.name;
var orig_layer = doc.layerSets.getByName(parent).artLayers.getByName(move);
}

// Create channel from current layer for cutting out
doc.selection.selectAll();
doc.selection.copy();
doc.channels.add();
pasteInPlace();

// Put channels back
// for (y = 0; y < 3; y++){
// if (y < doc.channels.length - 1) {
// doc.channels[y].visible = true;
// } else {
doc.channels[doc.channels.length - 1].visible = false;
// }
// }
doc.activeChannels = doc.componentChannels;

// Clear layer to remove shape blob
doc.selection.selectAll();
doc.selection.clear();


// default is only 1 overall loop
for (j = 0; j < loops; j++) {

// Create Layers from Channels
	for (var i = 0; i < 3; i++) {
		doc.artLayers.add();
		doc.activeLayer.name = i+'-choc';
		doc.activeLayer.blendMode = BlendMode.LIGHTEN;
		doc.selection.load(doc.channels[i]);
		doc.selection.fill(colour(i == 0? 255 : 0,i == 1? 255 : 0,i == 2? 255 : 0));
		doc.selection.deselect()
		}

// 		Delete original image
//  		doc.artLayers[3].remove();
// 
// 		Add plain black background
 		doc.artLayers.add();
 		doc.activeLayer.name = 'bb';
 		doc.selection.selectAll();
 		doc.selection.fill(colour(0,0,0));
 		doc.activeLayer.move(doc.artLayers['0-choc'], ElementPlacement.PLACEAFTER);
 		doc.selection.deselect()
// 		
// 		Random movement
 		doc.artLayers[0].translate((move/2)-(Math.random() * move),(move/2)-(Math.random() * move));
 		doc.artLayers[1].translate((move/2)-(Math.random() * move),(move/2)-(Math.random() * move));
 		doc.artLayers[2].translate((move/2)-(Math.random() * move),(move/2)-(Math.random() * move));
 	
 	if (amp != 0) {
			//wave them layers
		for (q = 0; q < 3; q++) {
		
			if (fuzz==1) {
								doc.artLayers[q].applyGaussianBlur(30)

// 				var w = Array();	
// 				w[0] = 250;
// 				w[1] = 1;
// 				w[2] = roz(6);
// 				w[3] = 1;
// 				w[4] = roz(8);
// 				w[5] = 100;
// 				w[6] = 100;
// 				w[7] = WaveType.SINE;
// 				w[8] = UndefinedAreas.REPEATEDGEPIXELS;
// 				w[9] = 0;
// 				doc.artLayers[q].applyWave(w[0],w[1],w[2],w[3],w[4],w[5],w[6],w[7],w[8],w[9]);
			} else {
			
	
				
					doc.artLayers[q].name = amp
	
					doc.activeLayer = doc.artLayers[q]
					multiWaver()
				
			
			}	
	// 		var w = Array();	
// 			w[0] = roz(50);
// 			w[1] = 1;
// 			w[2] = roz(999);
// 			w[3] = 1;
// 			w[4] = amp;
// 			w[5] = 100;
// 			w[6] = 100;
// 			w[7] = WaveType.SINE;
// 			w[8] = UndefinedAreas.REPEATEDGEPIXELS;
// 			w[9] = 0;
// 			}
// 		
// 			
		
		}
	
	}
	
///

// Merge layers
	for (y = 0; y < 3; y++) {
		doc.artLayers[0].merge();
	}


//Apply a selective coloring that fucks the greens and magentas around mainly
if (info[1] == 1) {

	naturalColors()

}
	
// Move it back where its supposed to be. Code differs if original layer was in a folder.
// if (parent) {
// doc.activeLayer.move(orig_layer, ElementPlacement.PLACEBEFORE);
// orig_layer.remove();
// } else {
// doc.activeLayer.move(doc.artLayers.getByName(origName), ElementPlacement.PLACEBEFORE);
// doc.artLayers.getByName(origName).remove();
// }
	
 		
// 	cut shape out
// 	Add channel intersection
	doc.selection.load(doc.channels[doc.channels.length-1]);
	doc.selection.invert();
// // 	Clearing won't work if the selection is the entire document
	try {
	doc.selection.clear();
	} catch(e) {
	var nothing = "don't do anything";
	}

// 	if (j>0) {
// 	
// 		doc.artLayers[0].merge()
// 	}
// Close overall loops	
}
	
doc.selection.deselect();
doc.channels[doc.channels.length-1].remove();





function colour(r,g,b) {
var q = new SolidColor;
	q.rgb.red = r;
	q.rgb.green = g;
	q.rgb.blue = b;
	return q;
}

function pasteInPlace(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putBoolean(sTID("inPlace"), true);
    desc1.putEnumerated(cTID('AntA'), cTID('Annt'), cTID('Anno'));
    executeAction(cTID('past'), desc1, dialogMode);
  };
  
function riz(a) {
	return Math.floor(Math.random() * a);
}
function roz(a) {
	return Math.ceil(Math.random() * a);
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

function naturalColors() {

var idselectiveColor = stringIDToTypeID( "selectiveColor" );
    var desc16 = new ActionDescriptor();
    var idpresetKind = stringIDToTypeID( "presetKind" );
    var idpresetKindType = stringIDToTypeID( "presetKindType" );
    var idpresetKindCustom = stringIDToTypeID( "presetKindCustom" );
    desc16.putEnumerated( idpresetKind, idpresetKindType, idpresetKindCustom );
    var idmethod = stringIDToTypeID( "method" );
    var idcorrectionMethod = stringIDToTypeID( "correctionMethod" );
    var idabsolute = stringIDToTypeID( "absolute" );
    desc16.putEnumerated( idmethod, idcorrectionMethod, idabsolute );
    var idcolorCorrection = stringIDToTypeID( "colorCorrection" );
        var list7 = new ActionList();
            var desc17 = new ActionDescriptor();
            var idcolors = stringIDToTypeID( "colors" );
            var idcolors = stringIDToTypeID( "colors" );
            var idradius = stringIDToTypeID( "radius" );
            desc17.putEnumerated( idcolors, idcolors, idradius );
            var idyellowColor = stringIDToTypeID( "yellowColor" );
            var idpercentUnit = stringIDToTypeID( "percentUnit" );
            desc17.putUnitDouble( idyellowColor, idpercentUnit, 100.000000 );
        var idcolorCorrection = stringIDToTypeID( "colorCorrection" );
        list7.putObject( idcolorCorrection, desc17 );
            var desc18 = new ActionDescriptor();
            var idcolors = stringIDToTypeID( "colors" );
            var idcolors = stringIDToTypeID( "colors" );
            var idgraininess = stringIDToTypeID( "graininess" );
            desc18.putEnumerated( idcolors, idcolors, idgraininess );
            var idmagenta = stringIDToTypeID( "magenta" );
            var idpercentUnit = stringIDToTypeID( "percentUnit" );
            desc18.putUnitDouble( idmagenta, idpercentUnit, 70.000000 );
        var idcolorCorrection = stringIDToTypeID( "colorCorrection" );
        list7.putObject( idcolorCorrection, desc18 );
            var desc19 = new ActionDescriptor();
            var idcolors = stringIDToTypeID( "colors" );
            var idcolors = stringIDToTypeID( "colors" );
            var idblues = stringIDToTypeID( "blues" );
            desc19.putEnumerated( idcolors, idcolors, idblues );
            var idcyan = stringIDToTypeID( "cyan" );
            var idpercentUnit = stringIDToTypeID( "percentUnit" );
            desc19.putUnitDouble( idcyan, idpercentUnit, -1.000000 );
            var idmagenta = stringIDToTypeID( "magenta" );
            var idpercentUnit = stringIDToTypeID( "percentUnit" );
            desc19.putUnitDouble( idmagenta, idpercentUnit, -30.000000 );
        var idcolorCorrection = stringIDToTypeID( "colorCorrection" );
        list7.putObject( idcolorCorrection, desc19 );
            var desc20 = new ActionDescriptor();
            var idcolors = stringIDToTypeID( "colors" );
            var idcolors = stringIDToTypeID( "colors" );
            var idmagenta = stringIDToTypeID( "magenta" );
            desc20.putEnumerated( idcolors, idcolors, idmagenta );
            var idcyan = stringIDToTypeID( "cyan" );
            var idpercentUnit = stringIDToTypeID( "percentUnit" );
            desc20.putUnitDouble( idcyan, idpercentUnit, 100.000000 );
        var idcolorCorrection = stringIDToTypeID( "colorCorrection" );
        list7.putObject( idcolorCorrection, desc20 );
    desc16.putList( idcolorCorrection, list7 );
executeAction( idselectiveColor, desc16, DialogModes.NO );

}