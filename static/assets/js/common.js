$(document).ready(function(){
	$('.typeahead').typeahead({
	  minLength: 1,
	  highlight: true
	},
	{
	  name: 'my-dataset',
	  source: substringMatcher(states)
	});
}); 

var substringMatcher = function(strs) {
	  return function findMatches(q, cb) {
	    var matches, substringRegex;

	    // an array that will be populated with substring matches
	    matches = [];

	    // regex used to determine if a string contains the substring `q`
	    substrRegex = new RegExp(q, 'i');

	    // iterate through the pool of strings and for any string that
	    // contains the substring `q`, add it to the `matches` array
	    $.each(strs, function(i, str) {
	      if (substrRegex.test(str)) {
	        matches.push(str);
	      }
	    });

	    cb(matches);
	  };
	};

var states = ["Assam", "Bihar", "Chandigarh", "Delhi", "Goa", "Gujarat", "Haryana", 
"Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Maharashtra", "Manipur", "Meghalaya", 
"Mizoram", "Nagaland", "Punjab", "Rajasthan", "Sikkim", "Uttarakhand"];