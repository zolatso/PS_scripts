var thisFolder = File($.fileName).parent;
$.evalFile(File(thisFolder + '/functions.js'));
$.evalFile(File(thisFolder + '/ps_functions.js'));

function fill_random_square(i) {
    var doc = app.activeDocument
    // This is what executes inside the random squares that are selected
    doc.selection.fill(color_hsb(random(100), 100, 100))
}

function random_squares(init_size, repetitions) {
    var doc = app.activeDocument
    var bounds = doc.selection.bounds
    var width = bounds[2] - bounds[0]
    var height = bounds[3] - bounds[1]
    doc.artLayers.add()
    // Main square selection loop
    for (j = 0; j < repetitions; j++) {
        var square_size = init_size[0] + random(init_size[1])
        var random_x = random(width - square_size)
        var random_y = random(height - square_size)
        doc.selection.select(get_sc(
            random_x + bounds[0], 
            random_y + bounds[1], 
            random_x + square_size + bounds[0], 
            random_y + square_size + bounds[1]
        ))
        fill_random_square(j)
        doc.selection.deselect()
    }
}