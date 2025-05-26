//@include '~/Pictures/scripts/imports/functions.js'

var max_move = 50

function main(max_move) {
    var doc = app.activeDocument
    var cutout = store_selection_as_channel()
    create_rgb_layers()
    black_background()
    move_and_merge_layers(max_move)
    doc.selection.load(cutout)
	doc.selection.invert()
	try {
	    doc.selection.clear()
	} catch(e) {
	    var nothing = "don't do anything";
	}
    doc.selection.deselect()
    cutout.remove()    
}

function create_rgb_layers() {
    var doc = app.activeDocument
    for (var i = 0; i < 3; i++) {
        if (i > 0) { doc.artLayers.add() }
        doc.activeLayer.blendMode = BlendMode.LIGHTEN
        doc.selection.load(doc.channels[i])
        doc.selection.fill(color_rgb(
            i == 0 ? 255 : 0,
            i == 1 ? 255 : 0,
            i == 2 ? 255 : 0
        ))
        doc.selection.deselect()
        effects()
    }
}

function black_background() {
    var doc = app.activeDocument
    var black_layer = doc.artLayers.add()
    doc.selection.selectAll()
    doc.selection.fill(color_rgb(0, 0, 0))
    black_layer.move(doc.artLayers[3], ElementPlacement.PLACEAFTER)
    doc.selection.deselect()
}

function move_and_merge_layers(max_move) {
    var doc = app.activeDocument
    // Move
    for (var i = 0; i < 3; i++) {
        doc.artLayers[i].translate(
            (max_move / 2) - random(max_move), 
            (max_move / 2) - random(max_move)
        )
    }
    // Merge
    for (i = 0; i < 3; i++) {
		doc.artLayers[0].merge();
	}
}

function effects() {
    var doc = app.activeDocument
    doc.activeLayer.applyWave(
        1,
        10,
        50,
        1,
        3,
        random(100),
        random(100),
        WaveType.SINE,
        UndefinedAreas.WRAPAROUND,
        0
    )
}

main(max_move)
