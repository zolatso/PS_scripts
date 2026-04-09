var thisFolder = File($.fileName).parent;
$.evalFile(File(thisFolder + '/imports/functions.js'));
$.evalFile(File(thisFolder + '/imports/ps_functions.js'));


function adjustment_outline(group) {
    // First of all you have to check for any adjustment layers in the group
    // as they are handled differently
    // Create a channel for each of them
    var doc = app.activeDocument
    var layers = group.artLayers
    var created_channels = []

    for (i = 0; i < layers.length; i++) {
        doc.activeLayer = layers[i]
        if (layers[i].kind != LayerKind.NORMAL) {
            doc.activeLayer = layers[i]
            selectAdjOutline()		
            created_channels.push(doc.channels.add())
            doc.selection.store(created_channels[i])
            doc.activeChannels = doc.componentChannels
            doc.selection.deselect()
        }
    }
    // Check length of channels array. If 1, return only that 1.
    // If more than 1, group and return all of them.
    // Otherwise, don't return anything.
    if (created_channels.length == 1) {
        return created_channels[0]
    } else if (created_channels.length > 1) {
        // Select all the adjument layer channels
        for (j = 0; j < channels.length; j++) {
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
}

function main() {
    var doc = app.activeDocument
    var dal = doc.layers
    var origLength = doc.layers.length
    var group = doc.activeLayer
    var adjustment_channel = adjustment_outline(group)

    // Make all layerse above the selected layers invisible
    var layer_id = 0
    while (dal[layer_id] != group) {
        dal[layer_id].visible = false
        layer_id++
    }

    // At this point, we need to merge a duplicate of the group
    // to select its outline. We do this on a duplicate because
    // the merge process effectively removes any areas of adjustment layers
    // that are not physically present in this group
    var duplicate = group.duplicate()
    var merged_layer = duplicate.merge()
    doc.activeLayer = merged_layer
    selectLayerOutline()
    merged_layer.remove()

    // If needed, we then add the selection mask that was created from the 
    // adjustment layers
    if (adjustment_channel != undefined) {
        // Combine the adjustment selection (if there were any adjustment layers)
        doc.selection.load(adjustment_channel, SelectionType.EXTEND)
    }
    
    doc.selection.copy(true)

    // Now delete the group once it's all copied to the clipboard
    // If not the pasting happens inside the group and it goes wrong
    group.remove()

    // This is needed for when the bottom layer of the layers
    // to be grouped is the bottom layer of the entire file
    // Unfortunately it gets a bit hacky here as we had to use 
    // a custom action to paste in place, otherwise the layers
    // just get pasted in center if we use doc.paste()
    if (layer_id == origLength-1) {
        pasteInPlace()
        var pasted_layer = doc.activeLayer
        pasted_layer.move(dal[dal.length-1], ElementPlacement.PLACEAFTER)
    } else {
        pasteInPlace()
        var pasted_layer = doc.activeLayer
    }

    // Make upper layers visible again
    i = 0
    while (dal[i] != pasted_layer) {
        dal[i].visible = true
        i++
    }

    pasted_layer.name = "stamped_layer_"+random(100000000000)
}

main()

