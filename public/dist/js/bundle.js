(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = require('./wiq.js');

// function allowDrop(ev) {
//     ev.preventDefault();
// }

// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
// }

// // console.log($('div'))

// $(document).ready(function(){
// 	console.log('Readyyy')
// })
},{"./wiq.js":2}],2:[function(require,module,exports){
function $(selector) {

    var self = {}

    if (selector == document) {

        self.ready = function(cb) {
            if (window.addEventListener) {
                window.addEventListener('load', cb)
            } else {
                window.attachEvent('onload', cb)
            }
        }
        return self
    }

    if (typeof selector === 'object') {
        self = selector
    } else {

        self.selector = selector
        self.element = document.querySelectorAll(self.selector)

        if (self.element.length < 2) {
            self.element = self.element[0]
        }

        // if(typeof self.selector === 'string'){
        //     if(self.selector.indexOf("#") !=-1){
        //         // selector.split
        //         console.log(document.getElementById(selector))
        //     }
        // }
    }

    //if changed make self.element this. Example:
    /*
    $(ul).click(function(){
        $(this).attr('data-position')
    })
    */
    if(typeof self.element === 'undefined'){
        self.element = selector
    }


    self.html = function(value) {
        if (!value) {
            return self.element
        }
        self.element.innerHTML = value
        return self
    }

    self.attr = function(name, value) {
        if (!value) {
            return self.element.getAttribute(name)
        }
        self.element.setAttribute(name, value)
        return self
    }

    self.unvisible = function(){
        self.element.style.visibility = 'hidden'
        return self
    }

    self.visible = function(){
        self.element.style.visibility = 'visible'
        return self
    }

    self.hide = function(speed) {
        if (typeof speed === 'number') {
            self.element.style.display = 'block'
            // self.element.style.opacity = 1;

            var last = +new Date();
            var tick = function() {
                self.element.style.opacity = +self.element.style.opacity - (new Date() - last) / speed;
                last = +new Date();

                if (+self.element.style.opacity > 0) {
                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                }else{
                    self.element.style.visibility = 'hidden'
                }
            };
            tick();
            return self
        } else {
            self.element.style.display = 'none'
            return self
        }
    }

    self.show = function(speed) {
        if (typeof speed === 'number') {
            self.element.style.display = 'block'
            self.element.style.visibility = 'visible'
            // self.element.style.opacity = 0;

            var last = +new Date();
            var tick = function() {
                self.element.style.opacity = +self.element.style.opacity + (new Date() - last) / speed;
                last = +new Date();

                if (+self.element.style.opacity < 1) {
                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                }
            };
            tick();
            return self
        } else {
            self.element.style.display = 'block'
            return self
        }
    }

    self.find = function(value){
        return document.querySelector(selector).querySelector(value)
    }

    self.addClass = function(value) {
        self.element.classList.add(value)
        return self
    }

    self.removeClass = function(value) {
        self.element.classList.remove(value)
        return self
    }

    self.toggleClass = function(value) {
        self.element.classList.toggle(value)
        return self
    }

    self.hasClass = function(value) {
        if (self.element.className.indexOf(value) !== -1) {
            return true
        }
        return false
    }

    self.height = function(value) {
        if (value) {
            if ((Number(value) * 0) == 0) {
                self.element.style.height = value + 'px'
                return self
            }
            self.element.style.height = value
            return self
        }
        return self.element.offsetHeight
    }

    self.width = function(value) {
        if (value) {
            if ((Number(value) * 0) == 0) {
                self.element.style.width = value + 'px'
                return self
            }
            self.element.style.width = value
            return self
        }
        return self.element.offsetWidth
    }

    self.remove = function() {
        self.element.parentElement.removeChild(self.element)
    }

    // $('ul').on('click',function(){})
    self.on = function(value,cb){
        if(self.element.length > 0){
            self.element.forEach(function(el,i){
                el.addEventListener(value, cb)
            })
        }else{
            self.element.addEventListener(value, cb)
        }
        return self
    }

    self.storage = {
        //check if there is already something stored
        defined: function(value) {
            return typeof localStorage[value] === 'undefined' ? false : true
        },
        //get something from localStorage
        get: function(value) {
            return JSON.parse(localStorage[value])
        },
        //set something in localStorage
        set: function(value, data) {
            localStorage[value] = JSON.stringify(data)
            return self
        }
    }

    self.template = function(parts){

        var html = ''
        var template = self.element.innerHTML
        var htmlArray = String(template).split('{')
        console.log(htmlArray)
        htmlArray.forEach(function(el,index){
            if(index > 0){
                console.log(el)
                var cutString = String(el).split('}')
                html += cutString[0] = parts[index-1]
                html += cutString[1]
            }else{
                html += el
            }
        })
        return html
    }

    self.extend = function(value){
        return JSON.parse(JSON.stringify(value))
    }

    self.ajax = function(requestObj) {

        // var requestObj = {
        //     requestType: String, //GET | POST
        //     url: String, //request url
        //     cb: Function(err,data) //callback
        // }

        var request = new XMLHttpRequest();
        request.open(requestObj.requestType, requestObj.url, false);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success ajax call!
                var data = JSON.parse(request.responseText);
                if (typeof requestObj.cb === 'function') {
                    requestObj.cb(false, data);
                }
            } else {
                // Success connection but no data or error page
                if (typeof requestObj.cb === 'function') {
                    // returns error status
                    requestObj.cb(request.status, false);
                }
            }
        };
        request.send();
    }

    self.fetch = function(url, headers, cb) {
        // fetch('//google.nl/test.json',{mode: 'cors'},function(err,data));
        fetch(url, headers)
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }
                    // Examine the text in the response  
                    response.json().then(function(data) {
                        if (typeof cb === 'function') {
                            cb(false, data)
                        }
                    });
                }
            )
            .catch(function(err) {
                if (typeof cb === 'function') {
                    cb(err, false)
                }
            });
    }


    // http://stackoverflow.com/a/13045312/5490735
    self.jsonp = (function() {
        // $().jsonp.send('http://zb.funda.info/frontend/geo/suggest/?query=amsterdam&max=7&type=koop&callback=callback', {
        //     callbackName: 'callback',
        //     onSuccess: function(json) {
        //         console.log('success!', json);
        //     },
        //     onTimeout: function() {
        //         console.log('timeout!');
        //     },
        //     timeout: 5
        // });
        var that = {};

        that.get = function(src, options) {
            var callback_name = options.callbackName || 'callback',
                on_success = options.onSuccess || function() {},
                on_timeout = options.onTimeout || function() {},
                timeout = options.timeout || 10; // sec

            var timeout_trigger = window.setTimeout(function() {
                window[callback_name] = function() {};
                on_timeout();
            }, timeout * 1000);

            window[callback_name] = function(data) {
                window.clearTimeout(timeout_trigger);
                on_success(data);
            }

            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = src;

            document.getElementsByTagName('head')[0].appendChild(script);
        }

        return that;
    })()


    return self
}

},{}]},{},[1]);
