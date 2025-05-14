// This has not been refactored

var doc = app.activeDocument
var dal = doc.layers

var ranName = roz(10000000000000)

var origLength = dal.length

doc.activeLayer.name = ranName

var dallo = doc.layerSets.getByName(ranName).artLayers
var specialLayerCounter = 0


// First of all you have to check for any adjustment layers in the group
// as they are handled differently

for (i = 0; i < dallo.length; i++) {

	doc.activeLayer = dallo[i]
	
	if (dallo[i].kind != LayerKind.NORMAL) {
		
		// This has to be wrapped in a try catch
		// because some of the older files
		// have fully blacked out layer masks
		// which otherwise confuse the script
		
			selectAdjOutline()

				
		var pig = doc.channels.add()
		doc.selection.store(pig)
		doc.activeChannels = doc.componentChannels
		doc.selection.deselect()
		
		specialLayerCounter++
	
	}

}

for (i = 0; i < dal.length; i++) {

	if (dal[i].name != ranName) {
		dal[i].visible = false
	} else {
		var layerId = i
		// This breaks the loop and leaves the layer under the layers to be stamped
		// visible, which is required for the copy all
		break;
	}

}

dal[layerId].duplicate()

dal[layerId].merge()

doc.activeLayer = dal[layerId]

selectLayerOutline()

// After selecting the layer outline for the merged layers, you need to add the outlines
// of the adjustment layers that were created as channels at the beginning of the script

for (j = 0; j < specialLayerCounter; j++) {

	doc.selection.load(doc.channels[doc.channels.length-1], SelectionType.EXTEND)
	doc.channels[doc.channels.length-1].remove()

}


dal[layerId].remove()

doc.selection.copy(true)

dal[layerId].remove()

for (i = 0; i < layerId; i++) {

	dal[i].visible = true

}

// This is needed for when the bottom layer of the layers
// to be grouped is the bottom layer of the entire file
if (layerId == origLength-1) {

	doc.paste()
	dal[dal.length-1].move(dal[dal.length-2], ElementPlacement.PLACEBEFORE)
	
} else {

	doc.paste()

}

dal[layerId].name = "Stamp" + roz(10000000000000)

function riz(a) {
	return Math.floor(Math.random() * a);
}
function roz(a) {
	return Math.ceil(Math.random() * a);
}

function selectLayerOutline() {
	var idset = stringIDToTypeID( "set" );
    var desc77 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref76 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idselection = stringIDToTypeID( "selection" );
    ref76.putProperty( idchannel, idselection );
    desc77.putReference( idnull, ref76 );
    var idto = stringIDToTypeID( "to" );
    var ref77 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idchannel = stringIDToTypeID( "channel" );
    var idtransparencyEnum = stringIDToTypeID( "transparencyEnum" );
    ref77.putEnumerated( idchannel, idchannel, idtransparencyEnum );
    desc77.putReference( idto, ref77 );
	executeAction( idset, desc77, DialogModes.NO );
}

function selectAdjOutline () {

	var idset = stringIDToTypeID( "set" );
    var desc114 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref102 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idselection = stringIDToTypeID( "selection" );
    ref102.putProperty( idchannel, idselection );
    desc114.putReference( idnull, ref102 );
    var idto = stringIDToTypeID( "to" );
    var ref103 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idordinal = stringIDToTypeID( "ordinal" );
    var idtargetEnum = stringIDToTypeID( "targetEnum" );
    ref103.putEnumerated( idchannel, idordinal, idtargetEnum );
    desc114.putReference( idto, ref103 );
	executeAction( idset, desc114, DialogModes.NO );
	
}