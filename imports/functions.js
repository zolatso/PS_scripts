function get_sc(l, t, r, b) {
    l = Math.round(l)
    t = Math.round(t)
    r = Math.round(r)
    b = Math.round(b)
    return [[l,t],[r,t],[r,b],[l,b]]
}

function randomly_vary_color_balance(x, copy) {
    var doc = app.activeDocument
    if (copy) {
        doc.selection.copy(true)
        doc.paste()
    }
    var x = 50
    var rv = (0 - (x / 2)) + (Math.random() * x)
    var gv = (0 - (x / 2)) + (Math.random() * x)
    var bv = (0 - (x / 2)) + (Math.random() * x)
    doc.activeLayer.adjustColorBalance(
        [rv, gv, bv],
        [rv, gv, bv],
        [rv, gv, bv],
        false
    )
}

function colour_rgb(r, g, b) {
    colour = new SolidColor
    colour.rgb.red = r
    colour.rgb.green = g
    colour.rgb.blue = b
    return colour
}

function get_files_in_folder(folder) {
    var fileTypes = new RegExp(/\.(jpg|tif|psd|png|heic|jpeg)$/i)
    var root = "~/Pictures/"
    var fileLoc = Folder(root + folder)
    return fileLoc.getFiles(fileTypes)
}

function store_selection_as_channel() {
	// Saves a selection as an alpha channel, returns the channel
    var doc = app.activeDocument
    var channel = doc.channels.add()
    doc.activeChannels = doc.componentChannels
    doc.selection.store(channel)
    doc.selection.deselect()
    return channel    
}

function random(a) {
    return Math.round(Math.random() * a)
}

function createLog(chuffy) {
	var captain = new String(chuffy)
	var splitAddress = captain.split("/")
	var getName = splitAddress[splitAddress.length-1]
	app.documents.add(1,1)
	var folder = "~/Pictures/logs/"
	var fName = folder + getName + ".psd";
	var file = new File(fName);
	var doc = app.activeDocument
	doc.saveAs(file);
	doc.close(SaveOptions.DONOTSAVECHANGES)
}


