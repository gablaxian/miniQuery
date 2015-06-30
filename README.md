# miniQuery
==========

A super small, super lean querying framework, similar to jQuery, but with far fewer functions, error checking and browser support.

Much like jQuery, when called, it returns an object which behaves like an array. So you can call it on an element and either then call one of the public methods, or instead, access the array directly and return the HTMLElement for direct JS manipulation.

## Usage

### each()

```
_('.list-items').each(function() {
  // stuff here
});
```

### get()

Just a cleaner way to perform:

```
_('.list-items')[idx]

e.g.

_('.list-items').get(idx)
```

If no index is supplied it defaults to 0;

### css(property, value)

*only works on the first element in the array*

```
_('.list-items').css('display', 'none');
```

### addClass(classname)

Adds a single class to a single or array of elements

```
_('.list-items').addClass('show');
```

### removeClass(classname)

Removes a single class to a single or array of elements

```
_('.list-items').removeClass('show');
```

### offset

*only works on the first element in the array*

Works the same as in jQuery

```
_('.list-items').offset(); \\ returns { top: value, left: value }

_('.list-items').offset().top;
```
