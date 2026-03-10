var thisFolder = File($.fileName).parent;
$.evalFile(File(thisFolder + '/imports/functions.js'));
$.evalFile(File(thisFolder + '/imports/mc_threads.js'));
$.evalFile(File(thisFolder + '/imports/ps_functions.js'));
$.evalFile(File(thisFolder + '/imports/random_HSB.js'));

var columns = 8    
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

function do_something(counter_row, counter_col, colors) {
    var doc = app.activeDocument
    var total_counter = counter_col + (counter_row * columns)
    var colors = [
        color_hsb(
            0 + wave_gen(8, counter_col, 180, 0), 
            100, 
            97),
        color_hsb(
            0,
            0 + wave_gen(40, total_counter, 50, 0),
            50 + 0 + wave_gen(40, total_counter, 50, 0))
    ]
    doc.artLayers.add()
    mc_threads(
        wave_gen(8, counter_col, 180, 1),
        100,
        0,
        colors,
        [0,0,0]
    )
    if (total_counter > 0) {
        doc.activeLayer.merge()
    }
    // if(counter_col == columns - 1) {
    //     alert(wave_gen(8, counter_col, 0, 180, 1))
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