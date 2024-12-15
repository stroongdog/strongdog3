window.cmgGameEvent = function() {

	var output = "";

	console.log(arguments);

	for(var i = 0; i < arguments.length; i++) {
		output += arguments[i]+" ";
	}
	switch(arguments[0]) {
		case "":
			break;
		default:
			//alert(output);
	}
}