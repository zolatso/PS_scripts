//@include '~/Pictures/scripts/functions.js'
//@include '~/Pictures/scripts/ps_functions.js'

var columns = 1000
var rows = 1000

function do_something() {
    doc.selection.fill(ranColHSB(50, 50, 50, 20, 20, 20))
}

function main(columns, rows) {
    var doc = app.activeDocument
    var cell_width = doc.width / columns
    var cell_height = doc.height / rows
    for (y = 0; y < rows; y++) {
        for (x = 0; x < columns; x++) {
            doc.selection.select(getSC(x * cell_width, y * cell_height, (x + 1) * cell_width, (y + 1) * cell_height))
            do_something()
            doc.selection.deselect()
        }
    }
}

main()