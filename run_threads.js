var thisFolder = File($.fileName).parent;
$.evalFile(File(thisFolder + '/imports/threads.js'));
$.evalFile(File(thisFolder + '/imports/functions.js'));
$.evalFile(File(thisFolder + '/imports/mc_threads.js'));

mc_threads(
    45,
    20,
    3,
    [
        color_hsb(0, 100, 0),
    ],
    [0,0,0]
)