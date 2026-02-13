//@include '~/Pictures/scripts/imports/random_squares.js'
//@include '~/Pictures/scripts/imports/functions.js'

var doc = app.activeDocument

var layers = 10
var init_repetitions = 50
var init_size = [80, 120]

for (i = 0; i < layers; i++) {
    var size = [
        init_size[0] - wave_gen(layers, i, 60, 1),
        init_size[1] - wave_gen(layers, i, 80, 1),
    ]
    random_squares(size, init_repetitions + wave_gen(layers, i, 50, 1))
    doc.artLayers[0].applyGaussianBlur(init_size[1] - wave_gen(layers, i, 118, 1))
    // All but the final iteration need you to select the whole document for the next random squares iteration
    if (i != layers - 1) {
        doc.selection.selectAll()
    }
}

