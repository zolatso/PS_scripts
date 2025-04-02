//@include '~/Pictures/scripts/functions.js'

var folder = 'drawings/clips_converted'

function do_something() {
    doc.trim(TrimType.TRANSPARENT)
}

function main(folder) {
    var files = get_files_in_folder(folder)
    
    for (i = 0; i < files.length; i++) {
        open(files[i])
        var doc = app.activeDocument
        do_something()
        doc.save()
        doc.close()
    }
}

main(folder)