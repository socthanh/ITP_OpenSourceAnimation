// Ease and Wizz 1.12 : inBack : All keyframes
// Ian Haigh (http://ianhaigh.com/easeandwizz/)
// Last built: 2008-11-14T09:34:33+11:00

// some defaults
var p = 0.8;		// period for elastic
var a = 50;			// amplitude for elastic
var s = 1.70158;	// overshoot amount for "back"

function tween(t, b, c, d, a, p) {
		if (s == null) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
}

function easeAndWizz() {
	
	var n = 0;
	if (numKeys > 0) {
		n = nearestKey(time).index;
		if (key(n).time > time)	{ n-- }
	}

	try {
		var key1 = key(n);
		var key2 = key(n+1);
	} catch(e) {
		return null;
	}
	
	// determine how many dimensions the keyframes need
	var dim = 1; // It's gotta have at least ONE dimension
	try {
		key(1)[1];
		dim = 2;
		key(1)[2];
		dim = 3;
	} catch(e) {}

	t = time - key1.time;
	d = key2.time - key1.time;

	sX = key1[0];
	eX = key2[0] - key1[0];

	if (dim >= 2) {
		sY = key1[1];
		eY = key2[1] - key1[1];

		if (dim >= 3) {
			sZ = key1[2];
			eZ = key2[2] - key1[2];
		}
	}

	if ((time < key1.time) || (time > key2.time)) {
		return value;
	} else {
		val1 = tween(t, sX, eX, d, a, p, s);
		switch (dim) {
			case 1:
			     return val1;
			     break;
			case 2:
			     val2 = tween(t, sY, eY, d, a, p, s);
			     return [val1, val2];
			     break;
			case 3:
			     val2 = tween(t, sY, eY, d, a, p, s);
			     val3 = tween(t, sZ, eZ, d, a, p, s);
			     return [val1, val2, val3];
			     break;
			default:
			     return null;
		}
	}
	
}

(easeAndWizz() || value);