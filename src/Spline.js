// spline.js - http://github.com/verma/spline.js
//
// (C) Copyright Uday Verma 2013
//


var SPLINE = SPLINE || {
	VERSION: "v0.0.1"
};

SPLINE.Utils = {
	last: function(arr) {
		if (Object.prototype.toString.call(arr) == '[object Array]' &&
			arr.length > 0) {
			return arr[arr.length - 1];
		}

		return undefined;
	},
	findIndex: function(arr, cb) {
		for (i = 0, il = arr.length ; i < il ; i ++) {
			if(cb(arr[i]))
				return i;
		}

		return -1;
	}
};

SPLINE.CubicBSpline = function(knots, controlPoints) {
	this.knots = knots;
	this.cps = controlPoints;

	this.degree = this.knots.length - this.cps.length + 1;
	if (this.degree != 3)
		throw new Error('The spline degree needs to be 3 for cubic BSplines');
};

SPLINE.CubicBSpline.prototype.totalDuration = function() {
	return SPLINE.Utils.last(this.knots);
};

SPLINE.CubicBSpline.prototype.valueForTime = function(t) {
	if (t > this.totalDuration())
		return undefined;


	var i = SPLINE.Utils.findIndex(this.knots.slice(this.degree-1), function(v) {
		return v > t;
	}) - 1;

	i = i + (this.degree - 1);

	// cubic spline basis function
	var basis3 = function(knot) {
		var u = t;
		var i = 0;

		var v1 = knot[i], v2 = knot[i+1], v3 = knot[i+2], v4 = knot[i+3], v5 = knot[i+4], v6 = knot[i+5];

		var bq = [];
		var pow = function(a, b) { return Math.pow(a, b); };

		bq[0] = pow(-u + v4,3)/((-v1 + v4)*(-v2 + v4)*(-v3 + v4));
		bq[1] = ((u - v1)*pow(-u + v4,2))/((-v1 + v4)*(-v2 + v4)*(-v3 + v4)) +
			((u - v2)*(-u + v4)*(-u + v5))/((-v2 + v4)*(-v3 + v4)*(-v2 + v5)) +
			((u - v3)*pow(-u + v5,2))/((-v3 + v4)*(-v2 + v5)*(-v3 + v5));
		bq[2] = (pow(u - v2,2)*(-u + v4))/((-v2 + v4)*(-v3 + v4)*(-v2 + v5)) +
			((u - v2)*(u - v3)*(-u + v5))/((-v3 + v4)*(-v2 + v5)*(-v3 + v5)) +
			(pow(u - v3,2)*(-u + v6))/((-v3 + v4)*(-v3 + v5)*(-v3 + v6));
		bq[3] =  pow(u - v3,3)/((-v3 + v4)*(-v3 + v5)*(-v3 + v6));

		return bq;
	};

	var start = Math.max(0, i - (this.degree - 1));
	var knots = this.knots.slice(start, start + 6);
	var cp = this.cps.slice(start, start + 4);

	console.log(t, i, start, this.cps.length, this.knots.length);

	bq = basis3(knots);

	var val = 0.0;
	for (var j = 0 ; j < 4 ; j ++) {
		val += cp[j] * bq[j];
	}

	return val;
}
