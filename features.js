define(["requirejs-dplugins/has"], function (has) {
	has.add("Intl-api", function (global) {
		return typeof global.Intl !== "undefined" && global.Intl.NumberFormat && global.Intl.DateTimeFormat;
	});
	return has;
});