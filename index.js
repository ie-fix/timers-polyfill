// IE fix  ## typeof clearInterval == 'object'
var ieFix = {
	'setTimeout' : function(orig) {
		return function(func, time) {
			return orig(func, time);
		}
	},
	'clearTimeout' : function(orig) {
		return function(num) {
			return orig(num);
		}
	},
	'setInterval' : function(orig) {
		return function(func, time) {
			return orig(func, time);
		}
	},
	'clearInterval' : function(orig) {
		return function(num) {
			return orig(num);
		}
	},
	'alert' : function(orig) {
		return function(x) {
			return orig(x);
		}
	}
};
//for each function prone to breaking
for (var func in ieFix) {
	//check if not broken
	if (typeof window[func] !== 'object')
		continue;
	//generate the new function from the old
	ieFix[func] = ieFix[func](window[func]);
	//allows us to edit IE window variables
	// eval('var ' + func + ';');
	window.func = window.func;
	//override the function
	window[func] = ieFix[func];
}
