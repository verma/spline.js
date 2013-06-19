// utils.js
// SPLINE.Utils tests
//

test("SPLINE.Utils.last", function() {
	var a = [];
	var b = [1, 2, 3];
	var c = {};
	var d = 'hello';
	var e = [1];

	ok(SPLINE.Utils.last(a) == undefined, "Passed!");
	ok(SPLINE.Utils.last(b) == 3, "Passed!");
	ok(SPLINE.Utils.last(c) == undefined, "Passed!");
	ok(SPLINE.Utils.last(d) == undefined, "Passed!");
	ok(SPLINE.Utils.last(e) == 1, "Passed!");
});

test("SPLINE.Utils.findIndex", function() {
	var a = [];
	var b = [1, 2, 3, 4];
	var c = 'hello';
	var d = 10;
	var e = undefined;

	ok(SPLINE.Utils.findIndex(a, function(v) { return v == 10; }) == -1, "Passed!");
	ok(SPLINE.Utils.findIndex(b, function(v) { return v == 3; }) == 2, "Passed!");
	ok(SPLINE.Utils.findIndex(b, function(v) { return v == 10; }) == -1, "Passed!");
});
