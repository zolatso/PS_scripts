function value(x) {
    return (0 - (x / 2)) + (Math.random() * x)
}

var doc = app.activeDocument
doc.selection.copy(true)
doc.paste()
var rv = value(50)
var gv = value(50)
var bv = value(50)
doc.activeLayer.adjustColorBalance(
    [rv, gv, bv],
    [rv, gv, bv],
    [rv, gv, bv],
    false
)

