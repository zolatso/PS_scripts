//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/ps_functions.js'
//@include '~/Pictures/scripts/imports/random_image.js'

var square_size = [20, 40]
var repetitions = 100

function fill_random_square(i) {
    var doc = app.activeDocument
    // This is what executes inside the random squares that are selected
    doc.selection.fill(color_hsb(0, 0, 100))
}

function random_squares(init_size, repetitions) {
    var doc = app.activeDocument
    var bounds = doc.selection.bounds
    var width = bounds[2] - bounds[0]
    var height = bounds[3] - bounds[1]
    // Main square selection loop
    for (i = 0; i < repetitions; i++) {
        var square_size = init_size[0] + random(init_size[1])
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