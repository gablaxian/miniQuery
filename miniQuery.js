
/**
    MiniQuery

    Useful for fast DOM interaction without incurring a full jQuery overhead.
    Takes a class name and only returns 1 element.

    Author - Graham Smith
**/
function $2(elm) {
    this.elm = document.querySelectorAll ? document.querySelectorAll(elm).item(0) : document.getElementsByClassName( elm.replace('.', '') )[0];

    this.style = function(s, t) { if(arguments[1]) { this.elm.style[s] = t; return this; } else { return window.getComputedStyle(this.elm)[s]; } }
    this.removeClass = function (c) { arr = this.elm.getAttribute('class').replace(/[\s]{2}/, ' ').split(' '); idx = arr.indexOf(c); if(idx != -1) { arr.splice(idx); this.elm.setAttribute('class', arr.join(' ')); } }
    this.addClass = function (c) { arr = this.elm.getAttribute('class').replace(/[\s]{2}/, ' ').split(' '); arr.push(c); this.elm.setAttribute('class', arr.join(' ')); }

    return this;
}