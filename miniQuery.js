/**
    MiniQuery
    Useful for fast DOM interaction without incurring a full jQuery overhead.
    Made with loads of help from http://tech.pro/blog/1385/out-growing-jquery
    Author - Graham Smith
**/
;(function(undefined) {
    'use strict';
    
    // internal variables and functions
    var slice = Array.prototype.slice,
        forEach = function(array,callback){
            var i = 0;
            var length = array.length;
            for (; i < length; i++) {
                callback.call( array[i], i, array[i] );
            }
        },
        isMini = function(d) {return d instanceof _;},
        isElement = function(o) {
            return (
                typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                    o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
            );
        };
    
    var miniQuery = function(selector) {
        if(!isMini(this)){
            return new miniQuery(selector);
        }
        var self = this, nodes;

        if(isElement(selector)){
            //element was passed in...  shortcut this case.
            nodes = [selector];
        } else {
            nodes = slice.call(document.querySelectorAll(selector));
        }

        // add them to this object like it's an array
        for (var i = 0; i < nodes.length; i++) {
            self[i] = nodes[i];
        }

        self.length = nodes.length;
    };

    miniQuery.fn = miniQuery.prototype;

    miniQuery.fn.slice = slice;

    miniQuery.fn.each = function(callback) {
        forEach(this, callback);
        return this;
    }

    /*
        get()

        Returns the HTMLElement for calling basic JS on the object.

        e.g: _('.class').get().toLowerCase();
    */
    miniQuery.fn.get = function(idx) {
        if( !idx || parseInt(idx) === 0 ) {
            return this[0];
        }
        else {
            return this[idx];
        }
    }

    /*
        first()

        Returns the first element in the array (as a miniQuery object)
    */
    miniQuery.fn.first = function() {
        return new miniQuery(this[0]);
    }

    /*
        css()

        *Only works on the first element in the array*

        Either returns an css property value, or allows you to set a css property on an element.
        Uses non jQuery css class nomenclature, so 'background-image' becomes 'backgroundImage'. General rule is remove the dash and then camelCase.
    */
    miniQuery.fn.css = function(s, t) {
        if(arguments.length == 2) {
            for(var i = this.length - 1; i >= 0; --i) {
                this[i].style[s] = t;
            };
            return this;
        }
        else {
            return window.getComputedStyle(this[0])[s];
        }
    }

    /*
        addClass()

        Adds the specified class to all elements in the array
    */
    miniQuery.fn.addClass = function (className) {
        var i = 0;
        var length = this.length;
        if (this[0].classList) {
            for (; i < length; i++) {
                this[i].classList.add(className);
            }
        }
        else {
            for (; i < length; i++) {
                this[i].className += ' ' + className;
            }
        }
    }

    /*
        addClass()

        Removes the specified class to all elements in the array
    */
    miniQuery.fn.removeClass = function (className) {
        var i = 0;
        var length = this.length;
        if (this[0].classList) {
            for (; i < length; i++) {
                this[i].classList.remove(className);
            }
        }
        else {
            for (; i < length; i++) {
                this[i].className = this[i].className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }
    }

    /*
        offset()

        *Only works on the first element in the array*

        Gets the position of the element within the document.
    */
    miniQuery.fn.offset = function() {
        var rect = this[0].getBoundingClientRect();

        return {
          top: rect.top + document.body.scrollTop,
          left: rect.left + document.body.scrollLeft
        }
    }

    //export constructors
    window._ = window._ || miniQuery;
}());
