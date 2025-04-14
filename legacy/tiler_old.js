//@include '~/Google Drive/PS Scripts/functions.js'

var doc = app.activeDocument


var bounds = doc.selection.bounds
var dims = [bounds[2]-bounds[0],bounds[3]-bounds[1]]
var left = bounds[0]
var top = bounds[1]


// Do we need to cut out the shape afterwards?
var wholeDoc = dims[0] < doc.width || dims[1] < doc.height ? false : true

// spef = = rando file 1 = specific file as detailed below
var spef = 0

var spefFile = "~/Pictures/md/diagrams/F1fI5WnagAIHDfo.jpeg"

if (!wholeDoc) {
	
	doc.channels.add()
	doc.activeChannels = doc.componentChannels
	doc.selection.store(doc.channels[doc.channels.length-1])
		
}

// this expression will match strings that end with .jpg, .tif, or .psd and ignore the case
var fileTypes = new RegExp(/\.(jpg|tif|psd|png|heic)$/i);

var root = "~/Pictures/"
var focFol = "md/diagrams";
var fileLoc = Folder(root+focFol);
var fileList = fileLoc.getFiles(fileTypes);

var fileToOpen = spef == 0 ? fileList[riz(fileList.length)] : File(spefFile)

open(fileToOpen)

doc = app.activeDocument
var w = doc.width
var h = doc.height

var area = dims[0] * dims[1]

var percentage = 10+riz(8)

area = area * (percentage / 100)

var newH = Math.sqrt((area / w) * h)

var newW = newH * (w / h)

doc.flatten()
doc.resizeImage(newW,newH)

var dal = doc.artLayers
dal[0].isBackgroundLayer = false

doc.selection.selectAll()
doc.selection.copy()

doc.resizeCanvas(newW*2,newH*2,AnchorPosition.TOPLEFT)

// start doing the repetition into 4

var sc = []

sc[0] = [newW,0]
sc[1] = [newW*2,0]
sc[2] = [newW*2,newH]
sc[3] = [newW,newH]

doc.selection.select(sc)

doc.paste()

doc.activeLayer = dal[0]

flipHor()

// Second paste

sc[0] = [0,newH]
sc[1] = [newW,newH]
sc[2] = [newW,newH*2]
sc[3] = [0,newH*2]

doc.selection.select(sc)

doc.paste()

doc.activeLayer = dal[0]

flipVer()

// Third paste

sc[0] = [newW,newH]
sc[1] = [newW*2,newH]
sc[2] = [newW*2,newH*2]
sc[3] = [newW,newH*2]

doc.selection.select(sc)

doc.paste()

doc.activeLayer = dal[0]

flipVer()
flipHor()

// Abstract it


doc.flatten()
dal[0].isBackgroundLayer = false
// dal[0].posterize(3)

// Copy the pattern and close the doccy

newW = doc.width
newH = doc.height

doc.selection.selectAll()
doc.selection.copy()
doc.close(SaveOptions.DONOTSAVECHANGES)

doc = app.activeDocument
dal = doc.artLayers

doc.selection.deselect()

// doc.paste()

// Start the pasting into rows

var counterC = 0
var counterR = 0

// Parent row loop
for (i = 0; i * newH < dims[1]; i++) {

	var sT = i * newH
	var sB = (i + 1) * newH
	
	// Child column loop
	
	for (j = 0; j * newW < dims[0]; j++) {
	
		sc[0] = [left + (j * newW), top + sT]
		sc[1] = [left + ((j + 1) * newW), top + sT]
		sc[2] = [left + ((j + 1) * newW), top + sB]
		sc[3] = [left + (j * newW), top + sB]
		
		doc.selection.select(sc)
				
		doc.paste()
		
		counterC++
		
	}
	
	// Annoying feature of my pasting style.
	//Have to break out of loop to sort last tile before another loop to merge
	// This is only required when the final tile
	// Goes beyond the edge of the document
	
	if (counterC * newW > doc.width) {
		var rem = dims[0] - ((counterC - 1) * newW)
		dal[0].translate(newW - rem, 0)
	}
	
	for (k = 0; k < (counterC - 1); k++) {
	
		dal[0].merge()
	
	}
	
	counterC = 0
	counterR++

}

// Similar to the column situation, the last row is annoying

if (counterR * newH > doc.height) {
	rem = dims[1] - ((counterR - 1) * newH)
	dal[0].translate(0, newH - rem)
}

for (k = 0; k < (counterR - 1); k++) {
	
	dal[0].merge()
	
}

// Offset certain strips for more visual interest

for (i=0; i < counterR-1; i++) {


	var j = 1 + (i * 2)
	
	//only applies every other band
	if (i%2==0) {
	
// 			alert(newW)

	
		var halfHeight = newH/2

		sc[0] = [0, j * halfHeight]
		sc[1] = [doc.width, j * halfHeight]
		sc[2] = [doc.width, (j * halfHeight) + newH]
		sc[3] = [0, (j * halfHeight) + newH]

// 	sc[0] = [0,1000]
// 	sc[1] = [1000,1000]
// 	sc[2] = [1000, 2000]
// 	sc[3] = [0,2000]
	
		doc.selection.select(sc)
		
// 		dal[0].applyGaussianBlur(100)
	
// 		dal[0].invert


	
		dal[0].applyOffset(newW/2, 0, OffsetUndefinedAreas.WRAPAROUND)
		
	
	}
	
}

// If shuffle, do a square wave to move the pattern around a bit
if (shuffle) {

	var w = [];
	w[0] = 1;
	w[1] = roz(500);
	w[2] = 999;
	w[3] = roz(500);
	w[4] = 999;
	w[5] = 100;
	w[6] = 100;
	w[7] = WaveType.SQUARE;
	w[8] = UndefinedAreas.WRAPAROUND;
	w[9] = 0;
	dal[0].applyWave(w[0],w[1],w[2],w[3],w[4],w[5],w[6],w[7],w[8],w[9]);
}






// Tidying differs depending on whether the selection fits the document or not

if (!wholeDoc) { 


	doc.selection.load(doc.channels[doc.channels.length-1])
	doc.selection.invert()
	doc.selection.clear()
	doc.selection.deselect()
	doc.channels[doc.channels.length-1].remove()

}

doc.crop([0,0,doc.width,doc.height])

 
