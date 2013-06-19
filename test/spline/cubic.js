// cubic.js
// tests for cubic
//

test("SPLINE.CubicBSpline", function() {
	var k = [0, 0, 0, 1, 2, 3, 3, 3, 3];
	var c = [1, 2, 3, 4];

	throws(function() { new SPLINE.CubicBSpline(k, c); }, Error, "throws an exception when degree is not 3");

	var c1 = [1, 2, 3, 4, 5, 6, 7];
	var s = new SPLINE.CubicBSpline(k, c1);

	ok(s.totalDuration() == 3, "figures the correct duration from knot vector");
});
