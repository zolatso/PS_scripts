//@include '~/Google Drive/PS Scripts/functions.js'

var doc = app.activeDocument
var dal = doc.artLayers

var dims = doc.activeLayer.bounds

var info = dal[0].name.split(" ")
var total = info[0]
var blur = info[1]


var layerWidth = dims[2] - dims[0]
var layerHeight = dims[3] - dims[1]

var smith = app.documents.add(layerWidth, layerHeight)

app.activeDocument = app.documents[app.documents.length-2]

var sc = Array()
sc[0] = [dims[0], dims[1]]
sc[1] = [dims[0]+layerWidth, dims[1]]
sc[2] = [dims[0]+layerWidth, dims[1]+layerHeight]
sc[3] = [dims[0], dims[1]+layerHeight]

doc.selection.select(sc)

doc.activeLayer.visible = false

doc.selection.copy(true)

app.activeDocument = smith

doc = app.activeDocument

dal = doc.artLayers

doc.paste()

dal[0].applyGaussianBlur(blur)

addBWGradient()
// doc.activeLayer.threshold(128)

// doc.activeLayer.autoLevels()

doc.changeMode(ChangeMode.GRAYSCALE)

doc.flatten()

var fName = "alpha-bg-"+roz(100000)

var newAlphaA = File("~/Pictures/Alphas/"+fName+"-a.psd")

doc.saveAs(newAlphaA)

// dal[0].invert()
// 
// var newAlphaB = File("~/Pictures/Alphas/"+fName+"-b.psd")
// 
// doc.saveAs(newAlphaB)
// 
doc.close()

doc = app.activeDocument 

doc.activeLayer.visible = true

doc.selection.deselect()

var flip = riz(100) > 49 ? 0 : 1

var flip = true

	var reps = 1 
// 	var xDis = flip == 0 ? total / reps : riz(total / reps)	
// 	var yDis = flip == 0 ? riz(total / reps) : total / reps
	var yDis = total
	var xDis = total
	
	var alphaFinal = flip == true ? newAlphaA : newAlphaA 
	doc.activeLayer.applyDisplace(xDis, yDis, DisplacementMapType.STRETCHTOFIT, UndefinedAreas.WRAPAROUND, alphaFinal)
	
	flip = !flip



