//@include '~/Pictures/scripts/imports/functions.js'

function displace(total, blur) {
    var doc = app.activeDocument
    var dims = doc.activeLayer.bounds
    var width = dims[2] - dims[0]
    var height = dims[3] - dims[1]
    doc.selection.select(get_sc(
        dims[0],
        dims[1],
        dims[2],
        dims[3]
    ))
    doc.activeLayer.visible = false
    doc.selection.copy(true)
    doc.activeLayer.visible = true
    doc.selection.deselect()
    var alpha = create_alpha(width, height, blur)
    doc = app.activeDocument
    doc.activeLayer.applyDisplace(
        total, 
        total, 
        DisplacementMapType.STRETCHTOFIT, 
        UndefinedAreas.WRAPAROUND, 
        alpha
    )
} 

function create_alpha(width, height, blur) {
    var new_doc = app.documents.add(width, height)
    doc = app.activeDocument
    doc.paste()
    doc.activeLayer.applyGaussianBlur(blur)
    doc.changeMode(ChangeMode.GRAYSCALE)
    doc.flatten()
    var alpha = File("~/Pictures/Alphas/alpha-bg-"+random(100000)+".psd")
    doc.saveAs(alpha)
    doc.close()
    return alpha
}