function flipVer() {
	
    var idflip = stringIDToTypeID( "flip" );
    var desc357 = new ActionDescriptor();
        var idnull = stringIDToTypeID( "null" );
    var ref42 = new ActionReference();
    var idlayer = stringIDToTypeID( "layer" );
    var idordinal = stringIDToTypeID( "ordinal" );
    var idtargetEnum = stringIDToTypeID( "targetEnum" );
    ref42.putEnumerated( idlayer, idordinal, idtargetEnum );
        desc357.putReference( idnull, ref42 );
        var idaxis = stringIDToTypeID( "axis" );
        var idorientation = stringIDToTypeID( "orientation" );
        var idvertical = stringIDToTypeID( "vertical" );
        desc357.putEnumerated( idaxis, idorientation, idvertical );
    executeAction( idflip, desc357, DialogModes.NO );
    
}

function flipHor() {

    var idflip = stringIDToTypeID( "flip" );
    var desc103 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref59 = new ActionReference();
    var idlayer = stringIDToTypeID( "layer" );
    var idordinal = stringIDToTypeID( "ordinal" );
    var idtargetEnum = stringIDToTypeID( "targetEnum" );
    ref59.putEnumerated( idlayer, idordinal, idtargetEnum );
    desc103.putReference( idnull, ref59 );
    var idaxis = stringIDToTypeID( "axis" );
    var idorientation = stringIDToTypeID( "orientation" );
    var idhorizontal = stringIDToTypeID( "horizontal" );
    desc103.putEnumerated( idaxis, idorientation, idhorizontal );
    executeAction( idflip, desc103, DialogModes.NO );

}

function applySelectionAsLayerMask() {

	var idmake = stringIDToTypeID( "make" );
    var desc195 = new ActionDescriptor();
    var idnew = stringIDToTypeID( "new" );
    var idchannel = stringIDToTypeID( "channel" );
    desc195.putClass( idnew, idchannel );
    var idat = stringIDToTypeID( "at" );
    var ref166 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idchannel = stringIDToTypeID( "channel" );
    var idmask = stringIDToTypeID( "mask" );
    ref166.putEnumerated( idchannel, idchannel, idmask );
    desc195.putReference( idat, ref166 );
    var idusing = stringIDToTypeID( "using" );
    var iduserMaskEnabled = stringIDToTypeID( "userMaskEnabled" );
    var idrevealSelection = stringIDToTypeID( "revealSelection" );
    desc195.putEnumerated( idusing, iduserMaskEnabled, idrevealSelection );
	executeAction( idmake, desc195, DialogModes.NO );

}

function selectLayerOutline() {
	var idset = stringIDToTypeID( "set" );
    var desc77 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref76 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idselection = stringIDToTypeID( "selection" );
    ref76.putProperty( idchannel, idselection );
    desc77.putReference( idnull, ref76 );
    var idto = stringIDToTypeID( "to" );
    var ref77 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idchannel = stringIDToTypeID( "channel" );
    var idtransparencyEnum = stringIDToTypeID( "transparencyEnum" );
    ref77.putEnumerated( idchannel, idchannel, idtransparencyEnum );
    desc77.putReference( idto, ref77 );
	executeAction( idset, desc77, DialogModes.NO );
}

function selectAdjOutline () {

	var idset = stringIDToTypeID( "set" );
    var desc114 = new ActionDescriptor();
    var idnull = stringIDToTypeID( "null" );
    var ref102 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idselection = stringIDToTypeID( "selection" );
    ref102.putProperty( idchannel, idselection );
    desc114.putReference( idnull, ref102 );
    var idto = stringIDToTypeID( "to" );
    var ref103 = new ActionReference();
    var idchannel = stringIDToTypeID( "channel" );
    var idordinal = stringIDToTypeID( "ordinal" );
    var idtargetEnum = stringIDToTypeID( "targetEnum" );
    ref103.putEnumerated( idchannel, idordinal, idtargetEnum );
    desc114.putReference( idto, ref103 );
	executeAction( idset, desc114, DialogModes.NO );
	
}