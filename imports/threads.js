//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/random_HSB.js'

function threads(angle, thickness, spacing, initial_color, h_vary, s_vary, b_vary) {
    var doc = app.activeDocument

    var left = doc.selection.bounds[0]
    var right = doc.selection.bounds[2]
    var top = doc.selection.bounds[1]
    var bottom = doc.selection.bounds[3]
    var width = right - left
    var height = bottom - top
    var create_channel = store_selection_as_channel()

    // Ensure the angle is within 180
    angle = angle > 180 ? angle - 180 : angle
    var int_vars = int_var(angle, thickness, width, height)
    var push_x = int_vars[0] 
    var push_y = int_vars[1] 
    var slice_quantity = int_vars[2]

    for (i = 0; i < slice_quantity; i++) {
        doc.selection.select(select_coordinates(
            i, 
            angle, 
            width, 
            height, 
            left, 
            right, 
            top, 
            bottom, 
            push_x, 
            push_y
        ))
        doc.selection.fill(
            random_HSB(
                initial_color.hsb.hue,
                initial_color.hsb.saturation,
                initial_color.hsb.brightness,
                h_vary,
                s_vary,
                b_vary,
            )
        )
    }
    doc.selection.load(create_channel)
    try {
        doc.selection.invert()
        doc.selection.clear()
        doc.selection.deselect()
    } catch (error) {
        var ignore = 'nothing'
    }
    create_channel.remove()
}

function int_var(a, thickness, width, height) {
    a = a > 90 ? 90 - (a - 90): a
    // Defining variables and stuff
    if (a == 0) {
        return [0, thickness, Math.ceil(height / thickness)]
     } else if (a == 90) {
        return [thickness, 0, Math.ceil(width / thickness)]
    } else {
        var b = deg_to_r(a)
        // Get thickness of strip for given angle
        // Find opposite of triangle formed by stick line
        var o1 = thickness * Math.sin(b)
        // Find adjacent of the same
        var a1 = thickness * Math.cos(b)
        // Find opposite of tiny triangle
        var o2 = o1 * Math.tan(b)
        // straight line of stick at angle
        var stick = a1 + o2
        // Get the amount things should be increased for each iteration of the loop
        var push_x = stick / Math.tan(b)
        var push_y = stick
        // Get quantity of slices
        var toptri = b < 45 ? width * Math.tan(b) : width / Math.tan(b)
        var bigedge = toptri + height
        var sliceq = Math.ceil(bigedge / push_y)
    
        return [push_x, push_y, sliceq]
    }
}

function deg_to_r(x) {
	return x * Math.PI / 180
}

function select_coordinates(i, a, width, height, left, right, top, bottom, p_x, p_y) {
	
	var b = a > 90 ? 90 - (a - 90): a
	// Initial counters
	var z = i + 1
    var y = i

	// Number of slices before change
	var ydiv = Math.floor(height / p_y);
	var xdiv = Math.floor(width / p_x);

	// Second set of counters
	var x = y - ydiv; 	
	var w = y - xdiv;
	
	// Top right push
	var rem_tr = p_x * (1 - ((width / p_x) - xdiv));
	var tr_push = Math.tan(deg_to_r(b)) * rem_tr;
	
	// Bottom left 
	var rem_bl = p_y * (1 - ((height / p_y) - ydiv));
	var bl_push = rem_bl / Math.tan(deg_to_r(b));
	
	var sc = [[],[],[],[]];
	
	
	// set up coordinates
	

		if (a > 90 && a < 180) {

			if (y < ydiv) {
			sc[0][0] = right;
			sc[0][1] = (z * p_y) + top;
			sc[3][0] = right; 
			sc[3][1] = sc[0][1] - p_y;
			} else {
			sc[0][0] = (right - bl_push - (x * p_x)); 
			sc[0][1] = bottom;
			sc[3][0] = sc[0][0] + p_x,
			sc[3][1] = bottom;
			}
		
			if (y < xdiv) {
			sc[1][0] = right - (z * p_x);
			sc[1][1] = top;
			sc[2][0] = sc[1][0] + p_x;
			sc[2][1] = top;
			} else {
			sc[1][0] = left;
			sc[1][1] = (tr_push + top + (w * p_y));
			sc[2][0] = left;
			sc[2][1] = sc[1][1] - p_y;
			}
		
		} else if (a > 0 && a < 90) {
		
			if (y < ydiv) {
			sc[0][0] = left;
			sc[0][1] = (z * p_y) + top;
			sc[3][0] = left; 
			sc[3][1] = sc[0][1] - p_y;
			} else {
			sc[0][0] = (bl_push + left + (x * p_x)); 
			sc[0][1] = bottom;
			sc[3][0] = sc[0][0] - p_x;
			sc[3][1] = bottom;
			}
	
			if (y < xdiv) {
			sc[1][0] = (z * p_x) + left;
			sc[1][1] = top;
			sc[2][0] = sc[1][0] - p_x;
			sc[2][1] = top;
			} else {
			sc[1][0] = right;
			sc[1][1] = (tr_push + top + (w * p_y));
			sc[2][0] = right;
			sc[2][1] = sc[1][1] - p_y;
			}
		
		} else if (a == 0 || a == 180) {
		
			sc[0] = [right, (z * p_y) + top];
			sc[1] = [left, (z * p_y) + top];
			sc[2] = [left, (y * p_y) + top];
			sc[3] = [right, (y * p_y) + top];
		
		} else if (a == 90) {
		
			sc[0] = [(z * p_x) + left, top];
			sc[1] = [(z * p_x) + left, bottom];
			sc[2] = [(y * p_x) + left, bottom];
			sc[3] = [(y * p_x) + left, top]; 
		}
	return sc;
}