var thisFolder = File($.fileName).parent;
$.evalFile(File(thisFolder + '/imports/functions.js'));
$.evalFile(File(thisFolder + '/imports/ps_functions.js'));


function adjustment_outline(group) {
    // First of all you have to check for any adjustment layers in the group
    // as they are handled differently
    // Create a channel for each of them
    var specialLayerCounter = 0

    for (i = 0; i < group.length; i++) {

        doc.activeLayer = group[i]
        
        if (dallo[i].kind != LayerKind.NORMAL) {
            selectAdjOutline()		
            var channel = doc.channels.add()
            doc.selection.store(channel)
            doc.activeChannels = doc.componentChannels
            doc.selection.deselect()
            specialLayerCounter++
        }
    }
    // Select all the adjument layer channels
    for (j = 0; j < specialLayerCounter; j++) {
        doc.selection.load(doc.channels[doc.channels.length-1], SelectionType.EXTEND)
        doc.channels[doc.channels.length-1].remove()
    }
    // Create one single channel for the adjustment layer selections
    var adjustment_layer_outline = doc.channels.add()
    doc.selection.store(adjustment_layer_outline)
    doc.activeChannels = doc.componentChannels
    doc.selection.deselect()
    return adjustment_layer_outline
}

function main() {
    var doc = app.activeDocument
    var origLength = doc.layers.length
    var group = doc.activeLayer
    var adjustment_channel = adjustment_outline(group)

    // Make all layerse above the selected layers invisible
    var i = 0
    while (dal[i] != group) {
        dal[i].visible = false
        i++
    }

    var duplicate = group.duplicate()
    var merged_layer = duplicate.merge()
    doc.activeLayer = merged_layer
    selectLayerOutline()
    // Combine the adjustment selection
    doc.selection.load(adjustment_channel, SelectionType.EXTEND)

    doc.selection.copy(true)

    // This is needed for when the bottom layer of the layers
    // to be grouped is the bottom layer of the entire file
    if (layerId == origLength-1) {
        doc.paste()
        dal[dal.length-1].move(dal[dal.length-2], ElementPlacement.PLACEBEFORE)
    } else {
        doc.paste()
    }

    // Make upper layers visible again
    i = 0
    while (dal[i] != group) {
        dal[i].visible = true
        i++
    }
}

main()

