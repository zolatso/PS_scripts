//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/presets.js'
//@include '~/Pictures/scripts/imports/ps_functions.js'
//@include '~/Pictures/scripts/imports/random_HSB.js'

var columns = 5    
var rows = 5

function color_array_for_loop() {
    // random assign
    var cols = []
    for (i = 0; i < 4; i++) {
        cols.push(color_hsb(
            random(360),
            random(20)+80,
            random(100),
        ))
    }
    // deliberate assign
    return cols
}

function do_something(counter_main, counter_row, colors) {
    var doc = app.activeDocument
    var colors = [
        color_hsb(12, 100, 97),
        color_hsb(40, 100, 100),
        color_hsb(0, 100, 26),
        color_hsb(0, 100, 59)
    ]
    doc.artLayers.add()
    mc_threads(
        wave_gen(4, counter_row, 0, 90),
        50,
        0,
        colors,
        0,0,0
    )
    if (counter_main > 0) {
        doc.activeLayer.merge()
    }
}

function grid(columns, rows) {
    var doc = app.activeDocument
    var bounds = doc.selection.bounds
    var width = bounds[2] - bounds[0]
    var height = bounds[3] - bounds[1]
    var cell_width = width / columns
    var cell_height = height / rows
    var counter = 0
    var colors = color_array_for_loop()
    for (y = 0; y < rows; y++) {
        for (x = 0; x < columns; x++) {
            doc.selection.select(get_sc(
                x * cell_width + bounds[0], 
                y * cell_height + bounds[1], 
                (x + 1) * cell_width + bounds[0], 
                (y + 1) * cell_height + bounds[1] 
            ))
            do_something(y, x, colors)
            doc.selection.deselect()
            counter++
        }
    }
}

grid(columns, rows)