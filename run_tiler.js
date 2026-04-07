var thisFolder = File($.fileName).parent;
$.evalFile(File(thisFolder + '/imports/tiler.js'));

var random_file = true
var folder = "~/Pictures/md/diagrams"
var specific_file = "~/Pictures/md/diagrams/F1fI5WnagAIHDfo.jpeg"
var scale = 20
var offset = 1

tiler(random_file, folder, specific_file, scale, offset)