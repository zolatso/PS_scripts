var thisFolder = File($.fileName).parent;
$.evalFile(File(thisFolder + '/imports/functions.js'));
$.evalFile(File(thisFolder + '/imports/ps_functions.js'));
$.evalFile(File(thisFolder + '/imports/resize_doc.js'));

// resize_to 0 = resize to document
// resize_to 1 = resize to selection
// irrelevant if selection == document size
var resize_to = 1
var resize_mode = 2
// 0 = Choose a random image from the specified folders
// 1 = Choose the specific image given in variables below from the specified folders
var selection_mode = 0
var folder_a = 'md/galleries'
var folder_b = 'iphone'
var file_a = 'IMG_0065.JPG'
var file_b = 'IMG_2704.JPG'

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

function effects(){
    var doc = app.activeDocument
    var dal = doc.artLayers
    dal[0].applyWave(
        2, 
        700,
        900,
        1,
        40,
        random(100),
        random(100),
        WaveType.SQUARE,
        UndefinedAreas.WRAPAROUND,
        0
    )
    dal[0].duplicate()
    dal[0].applyHighPass(40)
    dal[0].blendMode = BlendMode.OVERLAY
    dal[0].opacity = 50
    dal[0].merge()
}

function assemble_image_in_separate_document(resize_dims, resize_mode, selected_image, selected_alpha) {
    // Create new document
    app.documents.add(resize_dims[0], resize_dims[1])
    var doc = app.activeDocument
    var dal = app.activeDocument.artLayers
    dal[dal.length-1].isBackgroundLayer = false

    for (i = 0; i <2; i++) {
        // Open randomly chosen image
        var selected_file = i % 2 == 0 ? selected_image : selected_alpha
        open(selected_file)
        // Flatten and resize the image
        doc = app.activeDocument
        dal = doc.artLayers
        doc.flatten()
        dal[0].isBackgroundLayer = false
        resize_doc(resize_dims[0], resize_dims[1], resize_mode)
        effects()
        // Copy the reized image, close the file, and paste in the canvas image created previously
        doc.selection.selectAll()
        doc.selection.copy()
        doc.close(SaveOptions.DONOTSAVECHANGES)
        // Pasting behavior differs depending on whether its supposed to be the base layer or channel layer
        doc = app.activeDocument
        dal = doc.artLayers
        // Channel layer dealt with first
        if (i == 1) {
            var paste_channel = doc.channels.add()
            doc.selection.selectAll()
            doc.paste()
            doc.activeChannels = doc.componentChannels
			doc.activeLayer = doc.artLayers[0]
			doc.selection.load(paste_channel)
			doc.selection.clear()
			paste_channel.remove()
        } else if (i == 0) {
            doc.paste()
        }
        doc.selection.deselect()
    }
    // Copy from temporary canvas and close document
    doc.selection.selectAll()
    doc.selection.copy()
    doc.close(SaveOptions.DONOTSAVECHANGES)
}

function get_or_create_log(doc) {
    var docPath = doc.fullName.parent
    var docName = doc.name.replace(/\.[^\.]+$/, '')
    var logFile = new File(docPath + '/' + docName + '.json')
    if (!logFile.exists) {
        logFile.open('w')
        logFile.write('[]')
        logFile.close()
    }
    return logFile
}

function append_to_log(log_file, selected_image, selected_alpha, folder_a, folder_b) {
    log_file.open('r')
    var content = log_file.read()
    log_file.close()

    var entries = (content && content.length > 0) ? eval('(' + content + ')') : []
    var d = new Date()
    var timestamp = d.getFullYear() + '-'
        + pad(d.getMonth() + 1) + '-'
        + pad(d.getDate()) + 'T'
        + pad(d.getHours()) + ':'
        + pad(d.getMinutes()) + ':'
        + pad(d.getSeconds())
    entries.push({
        timestamp: timestamp,
        folder_a: folder_a,
        folder_b: folder_b,
        image: selected_image.name,
        alpha: selected_alpha.name
    })
    log_file.open('w')
    log_file.write(stringify_log(entries))
    log_file.close()
}

function pad(n) { return n < 10 ? '0' + n : '' + n }

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
    var selected_image = selection_mode == 1 ? get_file_from_folder(folder_a, file_a) : get_random_file_from_folder(folder_a)
    var selected_alpha = selection_mode == 1 ? get_file_from_folder(folder_b, file_b) : get_random_file_from_folder(folder_b)
    var log_file = get_or_create_log(doc)
    append_to_log(log_file, selected_image, selected_alpha, folder_a, folder_b)

    assemble_image_in_separate_document(resize_dims, resize_mode, selected_image, selected_alpha)
    
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