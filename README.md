# Ashe Javascript Template Engine

Simple and lightweight templating library which supports simple variable replacement, convinient loops and conditions, plus ability to set new variables right in template for later use. 

## Usage

Typically template content is stored inside `script` tags. This approach allows us easily get template when we need:

```html
<script type="html/template" id="tpl-example">
<!-- template html content goes here -->
</script>
```

Usage is simple: pass template content and template data to Ashe.parse method. It returns parsed HTML content.

```javascript
var template = document.getElementById('tpl-example').innerHTML;
var parsed = Ashe.parse(template, {
    title: 'Brand new boots',
    items: [
        {id: 23, rate: .5, size: 11},
        {id: 34, rate: .7, size: 10}
    ]
});
document.getElementById('content').innerHTML = parsed;
```

## Markers

To insert a variable in template use curly brackets:

```html
<!-- Simple var -->
<h1>{{ title }}</h1>

<!-- Object property -->
<h2>Author: {{ author.name }}</h2>
```

If a variable is a function it will be executed in context of the object passed to template and returned result will be used to replace marker.


Several control structures are supported. Unlike markers controls use {% and %} syntax.

## For

Loop over each item in an array or an object. For example:

```html
<ul>
    {% for book in books %}
    <li>{{ book.title }}</li>
    {% endfor %}
</ul>
</script>
```

Previous example iterates over the values of the sequence. For an object, you will probably need to access corresponding keys as well. To do so you need to specify references to the key and value separated by comma:

```html
<ul>
    {% for key, comment in comments %}
    <li>
        <div><b>{{ key }}: {{ comment.author }}</b>, {{ comment.date }}</div>
        <div>{{ comment.text }}</div>
    </li>
    {% endfor %}
</ul>
```

If the sequence is empty instead you can render replacement block defined by `else`:

```html
<h1>Plans</h1>
<ul>
    {% for plan in plans %}
    <li>{{ plan.title }}</li>
    {% else %}
    <li><em>No plans</em></li>
    {% endfor %}
</ul>
```

## If

`If` statement lets you test any variable or expression. Everything following `if` keyword is treated as condition.

```html
{% if user.confirmed %}
<p>
    View your <a href="/account/records/{{ user.id }}">records</a>.
</p>
{% else %}
<p class="red">
    Please <a href="/account/confirm/{{ user.id }}">confirm</a> your account.
</p>
{% endif %}
```

## Set

`Set` expression allows you to set variables inside template for later use. For example you can capture html chunks:

```html
{% set info %}
<div class="infoblock">
    <div class="title"></div>
    ...
</div>
{% endset %}

<div class="aside">
    ...
    {{ infoblock }}
    ...
</div>
```

or like this:

```html
{% set name %}{{ user.firstName }} {{ user.lastName }}{% endset %}
...
<a href="#">Author: {{ name }}</a>
```

## Modifiers

Modifiers allow you to change value of the variable dynamically on the fly. Several modifiers are currently implemented, additional can be added easily. By default modifiers are not included into the Ashe function. If you need to use some modifier you need to register it with Ashe.

```javascript
Ashe.addModifiers({
    stripTags: function(str) {
        return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
    }
    // , oneMoreModifier: function(str) { ... }
});
```

Now you can use modifier in your template:

```html
<div class="entry">{{ record.text|stripTags }}</div>
```

Ashe first tries to find requested modifier in the registered list and if this look up failed that modifier is searched in global scope. It means that any global function can be used as a modifier although it's recommended to register them with `addModifiers` method.

List of currently available functions can be found in `ashe.modifiers.js`.