/**
 * Generals Ashe tests.
 */
describe('General Tests', function() {
	
	// Test Ashe is globally available
	it('Ashe should be defined as window.Ashe', function() {
		expect(window.Ashe).toBeDefined();
	});
	
	// Test Ashe has public methods
	it('should have public method "parse"', function() {
		expect(typeof Ashe.parse == 'function').toBe(true);
	});
	
	it('should have public method "addModifiers"', function() {
		expect(typeof Ashe.addModifiers == 'function').toBe(true);
	});
	
	it('should have property "modifiers"', function() {
		expect(typeof Ashe.modifiers == 'object').toBe(true);
	});
});

/**
 * Test rendering functionality.
 */
describe("Render variables", function() {
	it("Simple variable {{simpleVar}}", function() {
		var out = Ashe.parse("This is a test {{simpleVar}}", {simpleVar: "string"});
		expect(out).toEqual("This is a test string");
	});
	
	it("Object property {{object.property}}", function() {
		var out = Ashe.parse("This is an object {{object.property}}", {
			object: {property: 'property'}
		});
		expect(out).toEqual("This is an object property");
	});
	
	it("Function as a variable {{someFunction}}", function() {
		var out = Ashe.parse("This is a {{someFunction}} as variable", {
			someFunction: function() {
				return "function reference";
			}
		});
		expect(out).toEqual("This is a function reference as variable");
	});
});
	
describe("Render loops", function() {
	
	var tpl;
	
	beforeEach(function() {
		tpl = 
			"<ul> \
				{% for user in users %} \
				<li>{{user.name}}, {{user.age}}</li> \
				{% else %} \
				<li>No users yet</li> \
				{% endfor %} \
			</ul>";
	});
	
	it("Simple non-empty loop", function() {
		var out = Ashe.parse(tpl, {
			users: [
				{name: 'Thomas Mann', age: 26},
				{name: 'Jassy Brook', age: 23}
			]
		});
		expect(out).htmlToBeEqual("<ul><li>Thomas Mann, 26</li><li>Jassy Brook, 23</li></ul>");
	});
	
	it("Empty loop with else block", function() {
		var out = Ashe.parse(tpl, {users: []});
		expect(out).htmlToBeEqual("<ul><li>No users yet</li></ul>");
	});
	
	it("Empty loop without else-block", function() {
		var tpl = 
			"<ul> \
				{% for user in users %} \
				<li>{{user.name}}, {{user.age}}</li> \
				{% endfor %} \
			</ul>",
			out = Ashe.parse(tpl, {});
		expect(out).htmlToBeEqual('<ul></ul>');
	})
});