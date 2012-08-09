/**
 * List of Ashe modifiers.
 */
var Ashe = Ashe || {};
Ashe.addModifiers({
	/**
	 * Convert value to uppercase.
	 */
	upper: function(str) {
		return str.toUpperCase();
	},

	/**
	 * Convert value to lowercase.
	 */
	lower: function(str) {
		return str.toLowerCase();
	},

	/**
	 * Make the first letter of the sentence uppercase.
	 */
	capitalize: function(str) {
		return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
	},

	/**
	 * Make each word beginning from uppercase letter.
	 */
	ucwords: function(str) {
		return str.replace(/^(.)|\s(.)/g, function($1) {
			return $1.toUpperCase();
		});
	},

	/**
	 * Set default value if variable is empty string or 0-integer, or false.
	 * @param def string|mixed, default value.
	 * @example {{ title|empty('Untitled') }}
	 */
	empty: function(val, def) {
		return val ? val : String(def);
	},

	/**
	 * Strip whitespaces from the beginning and end of a string.
	 * @param char string, additional characters to be trimmed.
	 * @example {{ email|trim(',.') }}
	 */
	trim: function(str, char) {
		var r = (typeof char != 'undefined') ? '[\\s' + char + ']' : '\\s';
		return str.replace(new RegExp('(^' + r + '*)|(' + r + '*$)', 'g'), '');
	},

	/**
	 * Convert special characters to HTML entities.
	 */
	esc: function(str) {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	},

	/**
	 * Remove HTML tags.
	 */
	stripTags: function(str) {
		return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
	},

	/**
	 * Truncate a variable to a character length and appends a suffix to it.
	 * @param length integer, the default is 50.
	 * @param repl string, a text string that replaces the truncated text.
	 * Its length is included in the truncation length setting. Default is "...".
	 * @example {{ abstract|truncate(100, '...') }}
	 */
	truncate: function(str, length, repl) {
		length = length || 50;
		repl = repl || '...';
		return str.length > length ? str.slice(0, length - repl.length) + repl : String(str);
	},

	/**
	 * Repeat string given number of times.
	 * @param count integer, number of repetitions.
	 * @example {{ '-'|repeat(3) }}
	 */
	repeat: function(str, count) {
		return new Array((parseInt(count) || 1) + 1).join(str);
	},

	/**
	 * Concatenate one or more strings together.
	 * @example {{ name|cat(' ', lastname) }}
	 */
	cat: function() {
		return Array.prototype.slice.call(arguments).join('');
	},

	/**
	 * Convert newlines to HTML line breaks.
	 */
	nl2br: function(str) {
		return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>');
	},

	/**
	 * Search and replace all the occurrences on a variable.
	 * Search is global and case insensitive.
	 * @param search string, search string. Can be regular expression string.
	 * @param replace string, string to replace search string.
	 * @example {{ '1234567890'|replace('(\\d{3})(\\d{4})(\\d{3})', '($1) $2 $3') }}
	 */
	replace: function(str, search, replace) {
		return String(str).replace(new RegExp(search, 'gi'), replace);
	},

	/**
	 * Encode URL.
	 * @param full boolean, if true this will encode the widest range of characters.
	 * Usefull for encoding URL parameters, will use encodeURIComponent().
	 * Do not use full=true for encoding whole URL as it will make it broken.
	 * @example <a href="{{ resource|urlEncode }}?{{ params|urlEncode(true) }}">Link</a>
	 */
	urlEncode: function(str, full) {
		return !full ? encodeURI(str) : encodeURIComponent(str);
	}
});