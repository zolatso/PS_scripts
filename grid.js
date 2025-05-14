//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/ps_functions.js'

var columns = 5
var rows = 1

function do_something() {
    var doc = app.activeDocument
    var max = 500 + random(299)
	var min = max - (30+random(70))
	doc.activeLayer.applyWave(
        random(50),
        min,
        max,
        1,
        1 + Math.ceil((60 - 5) / 8),
        random(100),
        random(100),
        WaveType.SQUARE,
        UndefinedAreas.WRAPAROUND,
        0
    )
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