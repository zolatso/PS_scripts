//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/ps_functions.js'

var columns = 5
var rows = 5

function do_something() {
    // app.activeDocument.selection.fill(ranColHSB(300, 50, 50, 35, 20, 40))
    random_image()
}

function main(columns, rows) {
    var doc = app.activeDocument
    var cell_width = doc.width / columns
    var cell_height = doc.height / rows
    for (y = 0; y < rows; y++) {
        for (x = 0; x < columns; x++) {
            doc.selection.select(get_sc(x * cell_width, y * cell_height, (x + 1) * cell_width, (y + 1) * cell_height))
            do_something()
            doc.selection.deselect()
        }
    }
}

main(columns, rows)