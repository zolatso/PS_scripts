//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/ps_functions.js'

var columns = 1
var rows = 5

function do_something() {
    var doc = app.activeDocument
    var max = 500 + random(299)
	var min = max - (30+random(70))
	var gen = 5
    var waves = [WaveType.SINE, WaveType.SQUARE]
	var maxamp = Math.ceil((60 - gen) / 8)
    var wrap = [UndefinedAreas.REPEATEDGEPIXELS, UndefinedAreas.WRAPAROUND];
    var w = []
	w[0] = random(50)
	w[1] = min
	w[2] = max
	w[3] = 1
	w[4] = 1+maxamp
	w[5] = random(100)
	w[6] = random(100)
	w[7] = waves[1]
	w[8] = wrap[0]
	w[9] = 0

	doc.activeLayer.applyWave(w[0],w[1],w[2],w[3],w[4],w[5],w[6],w[7],w[8],w[9])
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