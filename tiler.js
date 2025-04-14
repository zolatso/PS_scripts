//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/resize_doc.js'


var random_file = 1
var folder = "~/Pictures/md/diagrams"
var specific_file = "~/Pictures/md/diagrams/F1fI5WnagAIHDfo.jpeg"
var shuffle = true 
var scale = 10

function main(random_file, folder, specific_file, scale) {
    var doc = app.activeDocument
    var bounds = doc.selection.bounds
    var selection_xy = [bounds[2]-bounds[0], bounds[3]-bounds[1]]
    // Do we need to cut out the shape afterwards?
    var wholeDoc = selection_xy[0] < doc.width || selection_xy[1] < doc.height ? false : true
    if (!wholeDoc) {
        var channel = store_selection_as_channel()
    }
    // Figure out which file to open, send it to the first function
    var fileList = Folder(folder).getFiles(new RegExp(/\.(jpg|tif|psd|png|heic)$/i))
    var fileToOpen = random_file == 1 ? fileList[riz(fileList.length)] : File(specific_file)    
    pattern_xy = get_initial_pattern(fileToOpen, scale)
    // Get one complete row of the pattern
    get_first_row(pattern_xy[0], pattern_xy[1])
    fill_in_other_rows(pattern_xy[1])
}

function get_initial_pattern(fileToOpen, scale) {
    // Gets told which file to open and what scale to use
    // Finishes by copying the initial pattern to clipboard ready for further work
    // Returns dimensions of pattern
    open(fileToOpen)
    doc = app.activeDocument
    doc.flatten
    var dal = doc.artLayers
    dal[0].isBackgroundLayer = false
    resize_doc(doc.width * (scale / 100), doc.height * (scale / 100), 3)
    doc.selection.selectAll()
    doc.selection.copy()
    // Once target image is resized, we create the initial pattern by copying
    // and rotating
    doc.resizeCanvas(doc.width*2, doc.height * 2, AnchorPosition.TOPLEFT)
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 2; j++) {
            // Skip first grid square as it is the original image
            if (i==0 && j==0) {
                continue
            }
            doc.selection.select(get_sc(
                j * doc.width, i * doc.height, (j * doc.width) + doc.width,  (i * doc.height) + doc.height))
            doc.paste()
            // Each of the three grid squares needs to be flipped
            // differently to create the pattern
            switch(i, j) {
                case 0, 1:
                    flipHor()
                    break;
                case 1, 0:
                    flipVer()
                    break;
                case 1, 1:
                    flipHor()
                    flipVer()
            }
        }
    }
    doc.selection.selectAll()
    doc.selection.copy(true)
    var pattern_xy = [doc.width, doc.height]
    doc.close(SaveOptions.DONOTSAVECHANGES)
    return pattern_xy
}

function get_first_row(width, height) {
    doc = app.activeDocument
    var hor_slices = Math.floor(doc.width / width)
    for (i = 0; i < hor_slices; i++) {
        if (i == hor_slices - 1) {
            doc.selection.select(get_sc(0, 0, doc.width - ((hor_slices - 1) * width), height))
        } else{
            doc.selection.select(get_sc(0, 0, width, height))
        }
        doc.paste()
        doc.selection.deselect()
    }
}

function fill_in_other_rows(height) {
    doc = app.activeDocument
    var slice_no = Math.floor(doc.height / height)
    var normal_selection = get_sc(0, 0, doc.width, height)
    // Check
    var final_slice_height = Math.remainder(doc.height / height) * height
    var last_selection = get_sc(0, 0, doc.width, final_slice_height)
    // for loop starts from 1 as the first line is already filled in
    for (i = 1; i < slice_no; i++) {
        var last_slice = i == slice_no - 1 ? true : false
        // Copy
        var copy_selection = last_slice ? last_selection : normal_selection
        doc.selection.select(copy_selection)
        doc.selection.copy()
        // Paste
        var normal_paste = get_sc(0, i * height, doc.width, (i * height) + height)
        var last_paste = get_sc(0, i * height, doc.width, doc.height)
        paste_selection = last_slice ? last_paste : normal_paste
        doc.selection.select(paste_selection)
        doc.paste()
    }
}

main(random_file, folder, specific_file, scale, shuffle)