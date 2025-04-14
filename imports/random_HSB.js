function random_HSB(h, s, b, rh, rs, rb) {

	// this is quite badly organised as there are a lot of if else statements that
	// could be grouped

	
	var cols = [h,s,b]
	var rans = [rh/100, rs/100, rb/100]
	
	
	for (b=0; b < 3; b++) {
	
			
	
		// Initial processing in case a wave Gen has 
		// pushed the col value out of range
		// this treats the h value differently from the s and b values
		
		if (b > 0) {
			if (cols[b] > 100) {
		
				cols[b] = 100 - (cols[b] - 100)
		
			} else if (cols[b] < 0) {
		
				cols[b] = Math.abs(cols[b])
		
			}
			cols[b] = cols[b]/100
		} else if (b==0){
		
			if (cols[b]>360) {
			
				cols[b] = 0 + (cols[b]-360)
			
			} else if (cols[b]<0) {
			
				cols[b] = 360 + cols[b]
			
			}
			cols[b] = cols[b]/360
		
		}
	

		var r2 = rans[b] / 2;
		
		var np = (cols[b] - r2) + (Math.random() * rans[b]);
		
 		// This checks if the randomisation has pushed
 		// the color value beyond 0 or 1
 		// It has different effects for h s and b as h is a loop
 		
 		
 		if (b > 0) {	
			if (np < 0) {
				np = cols[b] + r2 - np;
			} else if (np > 1) {
				var a = np - 1;
				np = cols[b] - r2 - a;
			}
		} else {
		
			if (np < 0) {
				np = 1 - (r2 + np)
			} else if (np > 1) {
				np = 0 + (r2 - np)
			}
		
		} 
		
		
				
		if (b==0) {
			cols[b] = np * 360;
		} else {
			cols[b] = np * 100;
		}	 		
		
		
	
	}
	
			
	var colour = new SolidColor;
	colour.hsb.hue = cols[0];
	colour.hsb.saturation = cols[1];
	colour.hsb.brightness = cols[2];
	return colour;
	

}