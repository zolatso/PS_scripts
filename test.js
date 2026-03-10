var thisFolder = File($.fileName).parent;
$.evalFile(File(thisFolder + '/imports/resize_doc.js'));

resize_doc(1000, 100, 0)