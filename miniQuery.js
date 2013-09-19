/**
    MiniQuery

    Useful for fast DOM interaction without incurring a full jQuery overhead.
    Takes a class name and only returns 1 element.

    Author - Graham Smith
**/
;(function(undefined) {
    'use strict';
    
    var slice = Array.prototype.slice,
        forEach = function(array,callback){
            var i, length = array.length;
            for(i = 0; i < length; i++)
                callback.call( array[i], i, array[i] );
        },
        isTwo = function(d) {return d instanceof $2;},
        isElement = function(o) {
            return (
                typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                    o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
            );
        };
    
    var two = function(selector) {
        if(!isTwo(this)){
            return new two(selector);
        }
        var self    = this, nodes;

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

    two.fn = two.prototype;

    two.fn.slice = slice;

    two.fn.each = function(callback) {
        forEach(this, callback);
        return this;
    }

    two.fn.first        = function() { return new two(this[0]); }
    two.fn.css          = function(s, t) {
        if(arguments.length == 2) {
            for(var i = this.length - 1; i >= 0; --i) { this[i].style[s] = t; };
            return this;
        }
        else {
            return window.getComputedStyle(this[0])[s];
        }
    }
    two.fn.addClass     = function (c) { arr = this.elm.getAttribute('class').replace(/[\s]{2}/, ' ').split(' '); arr.push(c); this.elm.setAttribute('class', arr.join(' ')); }
    two.fn.removeClass  = function (c) { arr = this.elm.getAttribute('class').replace(/[\s]{2}/, ' ').split(' '); idx = arr.indexOf(c); if(idx != -1) { arr.splice(idx); this.elm.setAttribute('class', arr.join(' ')); } }

    //export constructors
    window.$2 = window.$2 || two;
}());
