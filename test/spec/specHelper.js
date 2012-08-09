var Util = (function() {
	
	var __cleanWhitespace = function(node) {
		for (var i = 0; i < node.childNodes.length; i++) {
			var child = node.childNodes[i];
			if (child.nodeType == 3 && !/\S/.test(child.nodeValue)) {
				node.removeChild(child);
				i--;
			}
			if (child.nodeType == 1) {
				__cleanWhitespace(child);
			}
		}
		return node;
	};
	
	return {
		cleanWhitespace: __cleanWhitespace
	}
})();


beforeEach(function() {
	this.addMatchers({
		htmlToBeEqual: function(expected) {
			var actualObj = document.createElement('div');
			actualObj.innerHTML = this.actual;
			
			var expectedObj = document.createElement('div');
			expectedObj.innerHTML = expected;
			
			return Util.cleanWhitespace(actualObj).innerHTML == Util.cleanWhitespace(expectedObj).innerHTML;
		}
	});
});