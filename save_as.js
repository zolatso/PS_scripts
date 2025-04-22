var doc = app.activeDocument
var root = "~/Pictures/wip/"
var fileName = "new-image-" + Math.round(Math.random() * 1000000000) + ".psd"
var file = new File(root + fileName)
doc.saveAs(file)