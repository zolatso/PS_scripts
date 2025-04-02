//@include '~/Google Drive/PS Scripts/functions.js'


var doc = app.activeDocument
var dal = doc.artLayers

var selBo = []
selBo[0] = doc.selection.bounds[0]
selBo[1] = doc.selection.bounds[1]
selBo[2] = doc.selection.bounds[2]
selBo[3] = doc.selection.bounds[3]

var width = selBo[2]-selBo[0]
var height = selBo[3]-selBo[1]

doc.channels.add()
doc.activeChannels = doc.componentChannels
doc.selection.store(doc.channels[doc.channels.length-1])


var latticeCheck = 0
var channels = 0
var hideTiles = 0
var displaceIt = 0
var verOffset = 0
var watercolourFX = 0



app.documents.add(width, height)

var doc = app.activeDocument
var dal = doc.artLayers

doc.selection.selectAll()

tiler()

dal[1].isBackgroundLayer = false
dal[1].remove()

randomHorFlipping()

hueShiftPlusFifty()

// Add lattice effect if needed	
	
if (latticeCheck == 1) {

	dal.add()

	doc.activeLayer = dal[0]

	doc.selection.selectAll()

	doc.selection.fill(ranColHSB(0,0,100,0,0,0))
	
	app.foregroundColor = ranColHSB(0,0,0,0,0,0)

	doc.selection.deselect()

	var latAng = riz(45)
	var latThick = 15
	var hue = 0
	var sat = 0
	var bri = 0
	var density = 5

	dal[0].name = latAng+" "+latThick+" "+hue+" "+sat+" "+bri+" "+density

	lattice()

	dal[0].applyMaximum(latThick / 5)

	dal[2].duplicate()

	dal[2].applyGaussianBlur(18)

	dal[2].applyMinimum(40)

	dal[2].move(dal[1], ElementPlacement.PLACEBEFORE)


	dal[0].name = "100 1"

	displace()

	flipHor()

	displace()

	dal[1].remove()
	
	dal[0].applyOffset(riz(2000),riz(2000),OffsetUndefinedAreas.WRAPAROUND)
	
	if (hideTiles == 1){

		dal.add()
		doc.selection.selectAll()
		doc.selection.fill(ranColHSB(0,0,100,0,0,0))
		doc.selection.deselect()
		dal[0].move(dal[3], ElementPlacement.PLACEAFTER)		
		dal[1].visible = false;
		dal[2].visible = false;

	}

}
// End lattice

if (verOffset == 1) {

	doc.activeLayer = dal[0]
	
	randomVerFlipping()
	
	dal[0].applyOffset(riz(2000),riz(2000),OffsetUndefinedAreas.WRAPAROUND)

}
	
if (displaceIt == 1) {
	
	doc.selection.selectAll()
	doc.selection.copy()
	doc.paste()
	
	dal[0].name = "100 20"
	
	displace()

	flipHor()

	displace()

	}

if (watercolourFX == 1) {

	doc.activeLayer = dal[0]
	watercolour()
	dal[0].blendMode = BlendMode.MULTIPLY

}

//Add a channels effect if needed
if (channels == 1) {

	doc.activeLayer = dal[0]

	dal.add()

	doc.selection.selectAll()

	doc.selection.fill(ranColHSB(0,0,100,0,0,0))

	var colours = riz(100) > 30 ? 0 : 1 

	dal[0].name = "0 "+colours+" 0 15 1"

	channels()

	dal[0].opacity=50
	
}
	
doc.selection.selectAll()
doc.selection.copy(true)

doc.close(SaveOptions.DONOTSAVECHANGES)

var doc = app.activeDocument
var dal = doc.artLayers

doc.selection.select(giveSC(selBo[0],selBo[2],selBo[1],selBo[3]))
doc.paste()
doc.selection.load(doc.channels[doc.channels.length-1])
applySelectionAsLayerMask()
doc.channels[doc.channels.length-1].remove()
	
