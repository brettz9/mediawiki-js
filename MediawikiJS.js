(function () {'use strict';

/**
* @static
* @private
*/
var JSONP = (function (global) {
    // (C) WebReflection Essential - Mit Style
    // cleaned up by Brett Zamir for JSLint and avoiding additional globals and need for conventional [?&]callback= in URL)
    // 'use strict'; // Added above
    var id = 0,
        ns = 'MediaWikiJS',
        prefix = '__JSONP__',
        document = global.document,
        documentElement = document.documentElement;
    return function (uri, callback) {
        var src = prefix + id++,
            script = document.createElement('script'),
            JSONPResponse = function () {
                try { delete global[ns][src]; } catch(e) { global[ns][src] = null; }
                documentElement.removeChild(script);
                callback.apply(this, arguments);
            };
        global[ns][src] = JSONPResponse;
        documentElement.insertBefore(
            script,
            documentElement.lastChild
        ).src = uri + (uri.indexOf('?') > -1 ? '&' : '?') + 'callback=' + ns + '.' + src;
    };
}(window));

/**
* @constructor
* @param {object|string} opts The options (currently "baseURL" and "apiPath" args only); if a string is supplied, it will be used as the baseURL
* @param {object} argObj Object of key-value pairs to be serialized
* @param {function} cb The callback to execute upon server (JSONP) reply
*/
function MediaWikiJS(opts, argObj, cb) {
    if (!(this instanceof MediaWikiJS)) {
        return new MediaWikiJS(opts, argObj, cb);
    }
    if (typeof opts === 'string') {
        this.baseURL = opts;
    }
    else {
        this.apiPath = opts.apiPath;
        this.baseURL = opts.baseURL;
    }
    if (!this.apiPath) {
        this.apiPath = '/w/api.php';
    }
    if (argObj) {
        this.send(argObj, cb);
    }
}

/**
* Send the API request to the server
* @param {object} argObj Object of arguments to be serialized
* @param {function} cb The callback to execute upon server (JSONP) reply
*/
MediaWikiJS.prototype.send = function MediaWikiJS__send (argObj, cb) {
    cb = cb || function () {}; // Are there API calls with side effects?
    var uri, arg, args = '';
    for (arg in argObj) {
        if (argObj.hasOwnProperty(arg)) {
            args += '&' + arg + '=' + encodeURIComponent(argObj[arg]);
        }
    }
    uri = this.baseURL +  this.apiPath + '?format=json' + args;
    JSONP(uri, cb);
};

// EXPORTS
window.MediaWikiJS = MediaWikiJS;
}());
