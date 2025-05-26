//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/ps_functions.js'
//@include '~/Pictures/scripts/imports/mc_threads.js'
//@include '~/Pictures/scripts/imports/random_HSB.js'

var columns = 5    
var rows = 5

function do_something(counter, cols, rows) {
    var doc = app.activeDocument
    doc.activeLayer.applyWave(
        3,
        500,
        999,
        1,
        20,
        random(50) + 50,
        random(50) + 50,
        WaveType.SQUARE,
        UndefinedAreas.WRAPAROUND,
        0
    )
    // doc.artLayers.add()
    // threads(
    //     random(180),
    //     40,
    //     0,
    //     [color_hsb(0, 0, 100), app.foregroundColor, color_hsb(47, 100, 100), color_hsb(0, 0, 0)],
    //     0,0,0
    // )
    // if (counter > 0) {
    //     doc.activeLayer.merge()
    // }

}

function grid(columns, rows) {
    var doc = app.activeDocument
    var bounds = doc.selection.bounds
    var width = bounds[2] - bounds[0]
    var height = bounds[3] - bounds[1]
    var cell_width = width / columns
    var cell_height = height / rows
    var counter = 0
    for (y = 0; y < rows; y++) {
        for (x = 0; x < columns; x++) {
            doc.selection.select(get_sc(
                x * cell_width, 
                y * cell_height, 
                (x + 1) * cell_width, 
                (y + 1) * cell_height 
            ))
            do_something(counter, columns, rows)
            doc.selection.deselect()
            counter++
        }
    }
}

grid(columns, rows)