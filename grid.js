//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/ps_functions.js'

var columns = 6
var rows = 8

function do_something() {
    var doc = app.activeDocument
    var max = 500 + random(299)
	var min = max - (30+random(70))
	doc.activeLayer.applyWave(
        3,
        min,
        max,
        1,
        10,
        random(100),
        random(100),
        WaveType.SQUARE,
        UndefinedAreas.WRAPAROUND,
        0
    )
    doc.activeLayer.applyOffset(
        random(200), 
        random(200), 
        OffsetUndefinedAreas.WRAPAROUND
    )
    randomly_vary_color_balance(50, false)
}

function main(columns, rows) {
    var doc = app.activeDocument
    var cell_width = doc.width / columns
    var cell_height = doc.height / rows
    for (y = 0; y < rows; y++) {
        for (x = 0; x < columns; x++) {
            doc.selection.select(get_sc(
                x * cell_width, 
                y * cell_height, 
                (x + 1) * cell_width, 
                (y + 1) * cell_height
            ))
            do_something()
            doc.selection.deselect()
        }
    }
}

main(columns, rows)