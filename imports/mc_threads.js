//@include '~/Pictures/scripts/imports/functions.js'
//@include '~/Pictures/scripts/imports/random_HSB.js'

function threads(angle, thickness, spacing, colors, h_vary, s_vary, b_vary) {
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

	var color_counter = 1
	var gap_counter = 0
    for (i = 0; i < slice_quantity; i++) {
		if (gap_counter == 0) {
			var sc = select_coordinates(
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
			)
			// I used a return false to test the selection function,
			// this is no longer really required
			if (sc) {
				doc.selection.select(sc)
			} else {
				break;
			}
			doc.selection.fill(
				random_HSB(
					colors[color_counter - 1].hsb.hue,
					colors[color_counter - 1].hsb.saturation,
					colors[color_counter - 1].hsb.brightness,
					h_vary,
					s_vary,
					b_vary,
				)
			)
		// This goes inside the 'if' as color counter should only increase
		// on a line where there has been a fill
		color_counter = color_counter < colors.length ? color_counter+=1 : 1
		}
	gap_counter = gap_counter < spacing ? gap_counter+=1 : 0 
    }
	trim_edges(create_channel)
}

function trim_edges(channel) {
	var doc = app.activeDocument
	doc.selection.load(channel)
    try {
        doc.selection.invert()
        doc.selection.clear()
        doc.selection.deselect()
    } catch (error) {
        var ignore = 'nothing'
    }
    channel.remove()
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
	switch (a) {
		case 0:
			var sc = get_sc(
				left, 
				(i * p_y) + top, 
				right, 
				((i + 1) * p_y) + top
			)
			return sc
		case 90:
			var sc = get_sc(
				(i * p_x) + left,
				top,
				((i + 1) * p_x) + left,
				bottom
			)
			return sc
		// The most complex option
		default:
			// Convert all angles to a 90 degree or less angle
			// Larger angles will be manually flipped
			a = a > 90 ? 90 - (a - 90): a

			// Number of slices before change
			var y_slices = Math.ceil(height / p_y)
			var x_slices = Math.ceil(width / p_x)

			// Two counters needed. One for the coordinates that traverse
			// left and bottom sides, one for top and right sides
			var lb_counter = i < y_slices ? i : i - y_slices
			var tr_counter = i < x_slices ? i : i - x_slices
		
			// Top right push
			//var rem_tr = p_x * (1 - ((width / p_x) % 1))
			var rem_tr = Math.abs(((x_slices) * p_x) - width)
			var tr_push = rem_tr * Math.tan(deg_to_r(a))
			//var tr_push = Math.tan(deg_to_r(a)) * rem_tr
			
			// Bottom left 
			var rem_bl = Math.abs(((y_slices) * p_y) - height)
			var bl_push = rem_bl / Math.tan(deg_to_r(a))

			// Get left and bottom coords
			if (i < y_slices) {
				var lb_coord_front = [
					left, 
					((lb_counter + 1) * p_y) + top,
				]
				var lb_coord_back = [
					left,
					(lb_counter * p_y) + top,
				]
			} else if (i >= y_slices) {
				var lb_coord_front = [
					((lb_counter + 1) * p_x) + left + bl_push,
					bottom
				]
				var lb_coord_back = [
					(lb_counter * p_x) + left + bl_push,
					bottom
				]
				//return false
			}

			// Get top and right coords
			if (i < x_slices) {
				var tr_coord_front = [
					((tr_counter + 1) * p_x) + left,
					top
				]
				var tr_coord_back = [
					(tr_counter * p_x) + left,
					top
				]
			} else if (i >= x_slices) {
				//alert(rem_tr)
				//alert(tr_push)
				var tr_coord_front = [
					right,
					tr_push + top + ((tr_counter + 1) * p_y)
				] 
				var tr_coord_back = [
					right, 
					tr_push + top + (tr_counter * p_y)
				]
				//return false
			}
			
			var sc = [lb_coord_front, lb_coord_back, tr_coord_back, tr_coord_front]
			return sc
	}
}