//@include '~/Pictures/scripts/functions.js'
//@include '~/Pictures/scripts/ps_functions.js'

var resize_to = 0
var resize_mode = 2
var folder_a = 'iphone'
var folder_b = 'md/galleries'

function get_resize_dims(resize_to) {
    var doc = app.activeDocument
    var resize_dims = []
    if (resize_to == 0) {
        resize_dims.push(doc.width, doc.height)
    } else if (resize_to == 1) {
        var sel_bounds = doc.selection.bounds
        resize_dims.push(sel_bounds[2] - sel_bounds[0], sel_bounds[3] - sel_bounds[1])
    }
    return resize_dims
}

function main(resize_to, resize_mode, folder_a, folder_b) {
    var doc = app.activeDocument
    var resize_dims = get_resize_dims(resize_to)
    var paste_location = get_sc(
        doc.selection.bounds[0],
        doc.selection.bounds[1],
        doc.selection.bounds[2],
        doc.selection.bounds[3],
    )
    var create_channel = store_selection_as_channel()
    var file_list_a = get_files_in_folder(folder_a)
    var file_list_b = get_files_in_folder(folder_b)

    // Create new document
    app.documents.add(resize_dims[0], resize_dims[1])
    var dal = app.activeDocument.artLayers
    dal[dal.length-1].isBackgroundLayer = false

    for (i = 0; i <2; i++) {
        // Open randomly chosen image
        var selected_file = i % 2 == 0 ? file_list_a[random(file_list_a.length)] : file_list_b[random(file_list_b.length)]
        open(selected_file)
        // Log which file was chosen for reference
        createLog(selected_file)
        // Flatten and resize the image
        doc = app.activeDocument
        dal = doc.artLayers
        doc.flatten()
        dal[0].isBackgroundLayer = false
        resizeDoc(resize_dims[0], resize_dims[1], resize_mode)
        // ADD A WAVE EFFECT HERE
        // Copy the reized image, close the file, and paste in the canvas image created previously
        doc.selection.selectAll()
        doc.selection.copy()
        doc.close(SaveOptions.DONOTSAVECHANGES)
        // Pasting behavior differs depending on whether its supposed to be the base layer or channel layer
        doc = app.activeDocument
        dal = doc.artLayers
        doc.selection.selectAll()
        doc.paste()
        doc.selection.deselect()
    }

    // Copy from temporary canvas and close document
    doc.selection.selectAll()
    doc.selection.copy(true)
    doc.close(SaveOptions.DONOTSAVECHANGES)
    // Location of pasting in original document uses a selection based on the original selection
    doc = app.activeDocument
    dal = doc.artLayers
    doc.selection.select(paste_location)
    doc.paste()
    // Apply the channel we created at the start of the script
    doc.selection.load(create_channel)
    applySelectionAsLayerMask()
    doc.selection.deselect()
    create_channel.remove()
}

main(resize_to, resize_mode, folder_a, folder_b)