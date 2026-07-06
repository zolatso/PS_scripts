// Really nice subtle squiggly
function squiggly_wave() { 
    app.activeDocument.activeLayer.applyWave(
        120, 
        1,
        100+random(899),
        1,
        10,
        100,
        100,
        WaveType.SINE,
        UndefinedAreas.WRAPAROUND,
        0
    )
}