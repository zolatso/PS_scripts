//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/ps_functions.js'
//@include '~/Pictures/scripts/imports/random_image.js'

var square_size = 400
var repetitions = 10

function fill_random_square(i) {
    var doc = app.activeDocument
    // This is what executes inside the random squares that are selected
    if (i == 0) {
        random_image(1, 3, 'drawings/clips_converted')
    } else {
        doc.paste()
    }
    if (random(100) > 50) {
        flipHor()
    }
    doc.activeLayer.blendMode = BlendMode.MULTIPLY
    if (i > 0) {
        doc.activeLayer.merge()
    }
}

function random_squares(square_size, repetitions) {
    var doc = app.activeDocument
    var bounds = doc.selection.bounds
    var width = bounds[2] - bounds[0]
    var height = bounds[3] - bounds[1]
    // Main square selection loop
    for (i = 0; i < repetitions; i++) {
        var random_x = random(width - square_size)
        var random_y = random(height - square_size)
        doc.selection.select(get_sc(
            random_x + bounds[0], 
            random_y + bounds[1], 
            random_x + square_size + bounds[0], 
            random_y + square_size + bounds[1]
        ))
        fill_random_square(i)
        doc.selection.deselect()
    }
}

random_squares(square_size, repetitions)