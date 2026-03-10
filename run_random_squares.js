var thisFolder = File($.fileName).parent;
$.evalFile(File(thisFolder + '/imports/random_squares.js'));

var square_size = [20, 40]
var repetitions = 100

random_squares(square_size, repetitions)