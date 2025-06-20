//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/ps_functions.js'
//@include '~/Pictures/scripts/imports/resize_doc.js'


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

function random_image(resize_to, resize_mode, zoom, folder) {
    var doc = app.activeDocument
    // If the zoom feature is activated, we always resize to original document size
    resize_to = zoom ? 0 : resize_to
    // Also if the zoom feature is activated, resize_mode is always just getting it to fit
    resize_mode = zoom ? 3 : resize_mode
    var resize_dims = get_resize_dims(resize_to)
    var paste_location = get_sc(
        doc.selection.bounds[0],
        doc.selection.bounds[1],
        doc.selection.bounds[2],
        doc.selection.bounds[3],
    )
    var create_channel = store_selection_as_channel()
    var file_list = get_files_in_folder(folder)

    // Create new document. Not really sure why we do this but can't
    // be bothered to change it right now
    app.documents.add(resize_dims[0], resize_dims[1])
    var dal = app.activeDocument.artLayers
    dal[dal.length-1].isBackgroundLayer = false

    // Open randomly chosen image
    var selected_file = file_list[random(file_list.length)]
    open(selected_file)
    // Log which file was chosen for reference
    createLog(selected_file)
    // Flatten and resize the image
    doc = app.activeDocument
    dal = doc.artLayers
    doc.flatten()
    dal[0].isBackgroundLayer = false
    // If zoom mode is activated, you first need to crop a tiny bit of the image
    if (zoom) {
        // Define the size of a small box
        var small_box = [
            resize_dims[0] / 10,
            resize_dims[1] / 10,
        ]
        // Randomly generate a left and top point
        var left = random(resize_dims[0] - small_box[0])
        var top = random(resize_dims[1] - small_box[1])
        // Crop to randomly generated point
        doc.crop([
            left, 
            top, 
            left + small_box[0], 
            top + small_box[1]])
    }
    resize_doc(resize_dims[0], resize_dims[1], resize_mode)
    // ADD A WAVE EFFECT HERE
    // Copy the reized image, close the file, and paste in the canvas image created previously
    doc.selection.selectAll()
    doc.selection.copy()
    doc.close(SaveOptions.DONOTSAVECHANGES)
    doc = app.activeDocument
    dal = doc.artLayers
    doc.selection.selectAll()
    doc.paste()
    doc.selection.deselect()

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
