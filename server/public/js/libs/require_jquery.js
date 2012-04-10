// hack found here : http://stackoverflow.com/questions/4535926/requirejs-and-jquery
define(["libs/jquery-1.7.1.min"], function() {
	// Raw jQuery does not return anything, so return it explicitly here.
	return jQuery;
});
