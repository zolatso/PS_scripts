//@include '~/Pictures/scripts/functions.js'

var square_size = 400
var repetitions = 10

function do_something() {
    // This is what executes inside the random squares that are selected
    random_image()
}

function main(square_size, repetitions) {
    var doc = app.activeDocument
    // Main square selection loop
    for (i = 0; i < repetitions; i++) {
        var random_x = random(doc.width - square_size)
        var random_y = random(doc.height - square_size)
        doc.selection.select(get_sc(random_x, random_y, random_x + square_size, random_y + square_size))
        do_something()
        doc.selection.deselect()
    }
}

main(square_size, repetitions)