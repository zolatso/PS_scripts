var thisFolder = File($.fileName).parent;
$.evalFile(File(thisFolder + '/imports/displace.js'));

displace(100, 20)