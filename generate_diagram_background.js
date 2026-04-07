var thisFolder = File($.fileName).parent;
$.evalFile(File(thisFolder + '/imports/functions.js'));
$.evalFile(File(thisFolder + '/imports/tiler.js'));


var folder = "md/diagrams"

tiler(true, folder, "", 20, true)
