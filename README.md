miniQuery
=========

A super small, super lean querying framework, similar to jQuery, but far more restrictive as it only returns one element and _technically_ only supports classes.
So, if you have several elements each with a class of 'list-item', then you will only get the first element with that className.

## Usage

Works just like jQuery, but with far fewer functions:

$2('.list-item').addClass('my-class');
$2('.popup').style('display', 'hidden');

## API

Just the 4 functions at the moment.

style(property, value)
addClass(classname)
removeClass(classname)
