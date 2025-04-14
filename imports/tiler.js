//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/resize_doc.js'

function tiler(random_file, folder, specific_file, scale, offset) {
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
    var fileToOpen = random_file == 1 ? fileList[random(fileList.length)] : File(specific_file)
    var resize_scale = [doc.width * (scale / 100), doc.height * (scale / 100)] 
    pattern_xy = get_initial_pattern(fileToOpen, resize_scale)

    // Get one complete row of the pattern
    get_first_row(pattern_xy[0], pattern_xy[1])
    fill_in_other_rows(pattern_xy[0], pattern_xy[1], offset)
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
    resize_doc(scale[0], scale[1], 3)
    doc.selection.selectAll()
    doc.selection.copy()
    // Once target image is resized, we create the initial pattern by copying
    // and rotating
    var old_dims = [doc.width, doc.height]
    doc.resizeCanvas(doc.width*2, doc.height * 2, AnchorPosition.TOPLEFT)
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 2; j++) {
            // Skip first grid square as it is the original image
            if (i==0 && j==0) {
                continue
            }
            doc.selection.select(get_sc(
                j * old_dims[0], i * old_dims[1], (j * old_dims[0]) + old_dims[0],  (i * old_dims[1]) + old_dims[1]))
            doc.paste()
            doc.selection.deselect()
            // Each of the three grid squares needs to be flipped
            // differently to create the pattern
            if (i == 0 && j == 1) {
                flipHor()
            } else if (i == 1 && j == 0) {
                flipVer()
            } else if (i== 1 && j == 1) {
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
    var slices = Math.ceil(doc.width / width)
    var remainder = (doc.width / width) - Math.floor(doc.width / width)
    for (i = 0; i < slices; i++) {
        var last_slice = i == slices - 1 ? true : false
        if (last_slice && remainder > 0) {
            var partial_width = width * remainder
            doc.selection.select(get_sc(0, 0, partial_width, height))
            doc.selection.copy(true)
            doc.selection.select(get_sc(doc.width - partial_width, 0, doc.width, height))
        } else{
            doc.selection.select(get_sc(i * width, 0, (i * width) + width, height))
        }
        doc.paste()
        doc.selection.deselect()
        if (i > 0) {
            doc.artLayers[0].merge()
        }
    }
}

function fill_in_other_rows(width, height, offset) {
    doc = app.activeDocument
    var slices = Math.ceil(doc.height / height)
    var remainder = (doc.height / height) - Math.floor(doc.height / height)
    for (i = 1; i < slices; i++) {
        var last_slice = i == slices - 1 ? true : false
        if (last_slice && remainder > 0) {
            var final_slice_height = height * remainder
            doc.selection.select(get_sc(0, 0, doc.width, final_slice_height))
            doc.selection.copy()
            doc.selection.select(get_sc(0, i * height, doc.width, doc.height))
        } else {
            doc.selection.select(get_sc(0, 0, doc.width, height))
            doc.selection.copy()
            doc.selection.select(get_sc(0, i * height, doc.width, (i * height) + height))
        }
        doc.paste()
        // Apply offset effect if requested
        if (i % 2 != 0 && offset == 1) {
            doc.artLayers[0].applyOffset(width / 2, 0, OffsetUndefinedAreas.WRAPAROUND)
        }
        if (i > 0) {
            doc.artLayers[0].merge()
        }
    }
}