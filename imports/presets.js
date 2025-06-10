//@include '~/Pictures/scripts/imports/mc_threads.js'
//@include '~/Pictures/scripts/imports/threads.js'

function apply_wave() {
    var doc = app.activeDocument
    doc.activeLayer.applyWave(
        3,
        500,
        999,
        20,
        30,
        random(50) + 50,
        random(50) + 50,
        WaveType.SQUARE,
        UndefinedAreas.WRAPAROUND,
        0
    )
}

function fill_the_selection(bri, vary) {
    var doc = app.activeDocument
    bri = bri - (vary / 2) + random(vary)
    alert(bri)
    doc.selection.fill(color_hsb(0, 0, bri))
    return bri
}

function mc_threads_on_new_layers(counter, colors) {
    var doc = app.activeDocument
    doc.artLayers.add()
    
    mc_threads(
        random(180),
        20,
        1,
        colors,
        0,0,0
    )
    if (counter > 0) {
        doc.activeLayer.merge()
    }
}

function threads_on_new_layers(counter) {
    var doc = app.activeDocument
    doc.artLayers.add()
    threads(
        random(180),
        150,
        0,
        color_hsb(0, 0, 0),
        0,0,0
    )
    if (counter > 0) {
        doc.activeLayer.merge()
    }
}

function random_walk_brightness(counter, vary) {

    function fill_square(brightness, vary) {
        brightness = (brightness - (vary / 2)) + random(vary)
        doc.selection.fill(colour_hsb(
            0,
            0,
            brightness
        ))
        return brightness
    }
}
