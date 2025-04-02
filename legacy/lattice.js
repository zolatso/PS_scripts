//@include '~/Google Drive/PS Scripts/functions.js'
// Needs 6 variables: angle of lattice, thickness of lines,
// 3 x colour randomness extent variables for LAB axes
// and a hatch density number (1 = no gaps, then increases)
// with a no-gap density, the overlaid thread effect looks shit

app.displayDialogs = DialogModes.NO;
app.preferences.rulerUnits = Units.PIXELS;
cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

var doc = app.activeDocument;
var layer = doc.activeLayer.name;
var getdims = doc.activeLayer.bounds;
var docx = parseInt(getdims[2] - getdims[0], 10);
var docy = parseInt(getdims[3] - getdims[1], 10);
var left = parseInt(getdims[0],10);
var top = parseInt(getdims[1],10);
var right = left + docx;
var bottom = top + docy;
var intc = app.foregroundColor;
var intc2 = app.backgroundColor;
var intgr = (intc.lab.a + 128) / 2.55
var intby = (intc.lab.b + 128) / 2.55;
var intbw = intc.lab.l;
// Set two variables per colour range - range and speed (number of threads)
var hRange = 0
var sRange = 0
var bRange = 0
var hSpeed = 100
var sSpeed = 10
var bSpeed = 50

var inthue = intc.hsb.hue 
var intsat = intc.hsb.saturation
var intbri = intc.hsb.brightness 

var inthue2 = intc2.hsb.hue 
var intsat2 = intc2.hsb.saturation
var intbri2 = intc2.hsb.brightness 

// Gets variables from layer name
var vars = layer.split(" ");
var a, a_orig;
a = a_orig = parseInt(vars[0],10);
var slice = vars[1];

var ranny = [vars[2], vars[3], vars[4]];
for (i = 0; i < ranny.length; i++) {
	ranny[i] = parseInt(ranny[i],10);
}

var flip = false;
var switchb = true;
// Little flip for two colour jobby
var switchC = true;

// Quantity of hatches
var hatch = vars[5];



////////////////////////////////////
// INITIAL LAYER ACTIONS/////////
// Create channel from current layer
var pig = doc.channels.add();
pig.name = "cutter0";
doc.activeChannels = doc.componentChannels
selectLayerOutline()
doc.selection.store(pig)


// Put channels back
for (y = 0; y < doc.channels.length; y++){
if (y < doc.channels.length - 1) {
doc.channels[y].visible = true;
} else {
doc.channels[y].visible = false;
}
}
doc.activeChannels = doc.componentChannels;

// Clear layer 
doc.selection.selectAll();
doc.selection.clear();
//////////////////////

/////////////////////////////////
////////// COLOURS ///////////
//////////////////////////////////	


// For loop iterating through selections and filling with colors
// THe main loop is done twice - once for the horizontal and once for the vertical lines.
for (t = 0; t < 2; t++) {

	var beat = 0;
	var counter = 0;

	if (t > 0) { 

	var chick = doc.artLayers.add(); 
	chick.name = "hortense";

	}

	a = a_orig + (t * 90);

	if (a > 180) {
		a = a - 180;
	}

	var int_var = intvar(a,slice);
	var p_x = int_var[0];
	var p_y = int_var[1];
	var s_q = int_var[2];


	for (var i = 0; i < s_q; i++) {	
		
		// Try catch on the fill in case of dodgy slice calculation
		try {
			// Fill the selection with color
			// Select from slice
			if (counter == beat) {
			// Make selection
			doc.selection.select(selco2(i));
			// Only do fills when the colour layers are needed
				var bSE = getSE(intbri, bRange)
				var hSE = getSE(inthue, hRange)
// 				var bwse = getSE(intbw, bwRange)

				var bWave = waveGen(bSpeed, i, bSE[0], bSE[1])
				var hWave = waveGen(hSpeed, i, hSE[0], hSE[1])
// 				var bw = waveGen(bwSpeed, i, bwse[0], bwse[1])
				
				// Switch for alternating 2 colour binary threads
				
				doc.selection.fill(ranColHSB(hWave, intsat, bWave, ranny[0], ranny[1], ranny[2]));

// 				if (switchC) {
// 					switchC = !switchC
// 				} else {
// 					doc.selection.fill(ranColHSB(inthue2, intsat2, intbri2, ranny[0], ranny[1], ranny[2]));
// 					switchC = !switchC
				//}
			}
			// Flip the switch if this thing needs to be alternated
			counter++;
			// If filling throws an error the selection has gone off the document
		} catch(x) {
			alert(x);
			break;
		}
		// End layer creation for loop
		
		counter = counter < hatch ? counter : 0; 
		
	}
	
	// selectLayerOutline()
// 	var newChan = doc.channels.add()
// 	newChan.name = "cutter"+(t+1)
// 	doc.selection.store(newChan)
// 	doc.activeChannels = doc.componentChannels 

}



var partridge = true

if (partridge) {

for (c = 0; c < 2; c++) {

	doc.selection.deselect();
	var c_len = hatch * 2;
	beat = c * hatch;

	for (h = 0; h < 2; h++) {

		// doc.artLayers.add();

		a = a_orig + (h * 90);


		if (a > 180) {
			a = a - 180;
		}

		var int_var = intvar(a,slice);
		var p_x = int_var[0];
		var p_y = int_var[1];
		var s_q = int_var[2];

		counter = 0; 

		for (r = 0; r < s_q; r++) {

			if (counter == beat) {
				// Make selection
				doc.selection.select(selco2(r), SelectionType.EXTEND);
			}
			counter++;
			counter = counter < c_len ? counter : 0; 
		}
	
	}

	saveAlpha("cutter"+(c+1));

}

doc.selection.deselect();

doc.selection.load(doc.channels.getByName("cutter1"));

doc.selection.load(doc.channels.getByName("cutter2"), SelectionType.INTERSECT);

doc.activeLayer = doc.artLayers.getByName(layer);

try {
doc.selection.expand(2);
}
catch(x) {
var thomas = "sorry thomas";
}

doc.selection.copy();
pasteInPlace();

doc.activeLayer.move(doc.artLayers.getByName("hortense"), ElementPlacement.PLACEBEFORE);

doc.activeLayer.merge();

// doc.activeLayer.move(doc.artLayers.getByName(layer),ElementPlacement.PLACEBEFORE);

doc.activeLayer.merge();

// Cut out original shape from merged layers
doc.selection.load(doc.channels["cutter0"]);
doc.selection.invert();
// Clearing won't work if the selection is the entire document
try {
doc.selection.clear();
} catch(e) {
var nothing = "don't do anything";
}

// Remove the channels
for (q = 0; q < 3; q++){

	var quail = "cutter"+q;
	doc.channels.getByName(quail).remove();

}

doc.selection.deselect();

}

//////////////////////////
////// FUNCTIONS /////////
//////////////////////////

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

// Get initial variables for measuring stuff
function intvar(a, slice) {
a = a > 90 ? 90 - (a - 90): a;
// Defining variables and stuff
// Procedure for zero degrees
if (a == 0) {
	var push_x = 0;
	var push_y = slice;
	var sliceq = Math.ceil(docy / slice);
	return [push_x, push_y, sliceq];
// Procedure for 90
 } else if (a == 90) {
	var push_x = slice;
	var push_y = 0;
	var sliceq = Math.ceil(docx / slice);
	return [push_x, push_y, sliceq];
// For anything else
} else {
	var b = deg_to_r(a);
	// Get thickness of strip for given angle
	// Find opposite of triangle formed by stick line
	var o1 = slice * Math.sin(b);
	// Find adjacent of the same
	var a1 = slice * Math.cos(b);
	// Find opposite of tiny triangle
	var o2 = o1 * Math.tan(b);
	// straight line of stick at angle
	var stick = a1 + o2;
	
	// Get the amount things should be increased for each iteration of the loop
	var push_x = stick / Math.tan(b);
	var push_y = stick;

	// Get quantity of slices
	var toptri = b < 45 ? docx * Math.tan(b) : docx / Math.tan(b);
	var bigedge = toptri + docy;
	var sliceq = Math.ceil(bigedge / push_y);

	return [push_x, push_y, sliceq];
 }
 }

function selco2(chick) {
	
	var b = a > 90 ? 90 - (a - 90): a;
	// Initial counters
	var z = chick + 1;
    var y = chick;

	// Number of slices before change
	var ydiv = Math.floor(docy / p_y);
	var xdiv = Math.floor(docx / p_x);

	// Second set of counters
	var x = y - ydiv; 	
	var w = y - xdiv;
	
	// Top right push
	var rem_tr = p_x * (1 - ((docx / p_x) - xdiv));
	var tr_push = Math.tan(deg_to_r(b)) * rem_tr;
	
	// Bottom left 
	var rem_bl = p_y * (1 - ((docy / p_y) - ydiv));
	var bl_push = rem_bl / Math.tan(deg_to_r(b));
	
	var sc = [[],[],[],[]];
	
	
	// set up coordinates
	

		if (a > 90 && a < 180) {

			if (y < ydiv) {
			sc[0][0] = right;
			sc[0][1] = (z * p_y) + top;
			sc[3][0] = right; 
			sc[3][1] = sc[0][1] - p_y;
			} else {
			sc[0][0] = (right - bl_push - (x * p_x)); 
			sc[0][1] = bottom;
			sc[3][0] = sc[0][0] + p_x,
			sc[3][1] = bottom;
			}
		
			if (y < xdiv) {
			sc[1][0] = right - (z * p_x);
			sc[1][1] = top;
			sc[2][0] = sc[1][0] + p_x;
			sc[2][1] = top;
			} else {
			sc[1][0] = left;
			sc[1][1] = (tr_push + top + (w * p_y));
			sc[2][0] = left;
			sc[2][1] = sc[1][1] - p_y;
			}
		
		} else if (a > 0 && a < 90) {
		
			if (y < ydiv) {
			sc[0][0] = left;
			sc[0][1] = (z * p_y) + top;
			sc[3][0] = left; 
			sc[3][1] = sc[0][1] - p_y;
			} else {
			sc[0][0] = (bl_push + left + (x * p_x)); 
			sc[0][1] = bottom;
			sc[3][0] = sc[0][0] - p_x;
			sc[3][1] = bottom;
			}
	
			if (y < xdiv) {
			sc[1][0] = (z * p_x) + left;
			sc[1][1] = top;
			sc[2][0] = sc[1][0] - p_x;
			sc[2][1] = top;
			} else {
			sc[1][0] = right;
			sc[1][1] = (tr_push + top + (w * p_y));
			sc[2][0] = right;
			sc[2][1] = sc[1][1] - p_y;
			}
		
		} else if (a == 0 || a == 180) {
		
			sc[0] = [right, (z * p_y) + top];
			sc[1] = [left, (z * p_y) + top];
			sc[2] = [left, (y * p_y) + top];
			sc[3] = [right, (y * p_y) + top];
		
		} else if (a == 90) {
		
			sc[0] = [(z * p_x) + left, top];
			sc[1] = [(z * p_x) + left, bottom];
			sc[2] = [(y * p_x) + left, bottom];
			sc[3] = [(y * p_x) + left, top]; 
		}
	
		
	
	return sc;
}

// Give me selection coordinates for slices
function selco(counter) {

	var t = counter;
	var y = counter + 1;

	// Set variables. X movement is negative if angle bigger than 90
	var co1 = co_1[0] + (y * p_x);	
	var co2 = co_1[1] + (y * p_y);
	var co3 = co_2[0] + (y * p_x);
	var co4 = co_2[1] + (y * p_y);
	var co5 = co_2[0] + (t * p_x);
	var co6 = co_2[1] + (t * p_y);
	var co7 = co_1[0] + (t * p_x);
	var co8 = co_1[1] + (t * p_y);
	co1 = Math.round(co1);
	co2 = Math.round(co2);
	co3 = Math.round(co3);
	co4 = Math.round(co4);
	co5 = Math.round(co5);
	co6 = Math.round(co6);
	co7 = Math.round(co7);
	co8 = Math.round(co8);

//Put variables into array
//  	var sel_co = [[co1,co2],[co3,co4],[co5,co6],[co7,co8]];
// 	Put variables into array
	var sel_co = [[co1+left,co2+top],[co3+left,co4+top],[co5+left,co6+top],[co7+left,co8+top]];

	return sel_co;
}

//Get translation movement
function trans_cord(q) {
	var b = deg_to_r(a);
	var ymov = Math.sin(b) * move;
	var xmov = Math.cos(b) * move;
	var mc = [xmov,ymov];
	// translation coordinates move differently depending on the angle
	if (vars[0] <= 90) {
	mc[0] = switchb ? mc[0] : -mc[0];
 	mc[1] = switchb ? -mc[1] : mc[1];
	} else {
	mc[0] = switchb ? mc[0] : -mc[0];
 	mc[1] = switchb ? mc[1] : -mc[1];
	}
	return mc;
}

//degrees to rad
function deg_to_r(x) {
	x = x*Math.PI/180;
	return x;
}

function getSE(c, r) {

	var d = Math.abs(c - 100 / 2)
	
	// If the distance from the center is greater than half the range, 
	// the special range is required
	if (d + r / 2 > 50) {
		
		// Different values are required depending on what 
		//side of the range the center is on
		if (c > 50) {
		
			var s = c - r / 2 - ((c + r / 2) - 100)
			var e = 100 
		} else if (c < 50) {
		
			var s = 0
			var e = c + r / 2 + Math.abs(c - r / 2)
			
		}
	
	} else {
	
		var s = c - r / 2
		var e = c + r / 2
	
	}
	
	var se = [s, e]
	return se

}

function ranVar(a, b) {

	a = a - (b / 2) + riz(b)
	
	return a

}
// Give me a random colour
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


function pasteInPlace(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putBoolean(sTID("inPlace"), true);
    desc1.putEnumerated(cTID('AntA'), cTID('Annt'), cTID('Anno'));
    executeAction(cTID('past'), desc1, dialogMode);
  };

function SelectTransparency()
{
    var idChnl = charIDToTypeID( "Chnl" );

    var actionSelect = new ActionReference();
    actionSelect.putProperty( idChnl, charIDToTypeID( "fsel" ) );     

    var actionTransparent = new ActionReference();    
    actionTransparent.putEnumerated( idChnl, idChnl, charIDToTypeID( "Trsp" ) );

    var actionDesc = new ActionDescriptor();
    actionDesc.putReference( charIDToTypeID( "null" ), actionSelect );
    actionDesc.putReference( charIDToTypeID( "T   " ), actionTransparent );

    executeAction( charIDToTypeID( "setd" ), actionDesc, DialogModes.NO );
}

function  saveAlpha(alphaName){

  var idDplc = charIDToTypeID( "Dplc" );

     var desc27 = new ActionDescriptor();

    var idnull = charIDToTypeID( "null" );

         var ref11 = new ActionReference();

         var idChnl = charIDToTypeID( "Chnl" );

         var idfsel = charIDToTypeID( "fsel" );

         ref11.putProperty( idChnl, idfsel );

     desc27.putReference( idnull, ref11 );

     var idNm = charIDToTypeID( "Nm  " );

     desc27.putString( idNm, alphaName );

  try {

  executeAction( idDplc, desc27, DialogModes.NO );

  }

  catch(e) {}

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