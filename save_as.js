var doc = app.activeDocument
var root = "~/Pictures/ideas/"
var fileName = "new-image-" + Math.round(Math.random() * 1000000000) + ".psd"
var file = new File(root + fileName)
doc.saveAs(file)