// Network functions
org.rr0.net = (function () {

    function httpRequest() {
        return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    }

    function corsHttpRequest() {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // Check if the XMLHttpRequest object has a "withCredentials" property. "withCredentials" only exists on XMLHTTPRequest2 objects.
        } else if (typeof XDomainRequest != "undefined") {
            // Otherwise, check if XDomainRequest. XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
        } else {    // Otherwise, CORS is not supported by the browser.
            xhr = null;
        }
        return xhr;
    }

    function processRequest(asyncProc, req, address, reqType) {
        if (asyncProc) req.onreadystatechange = function () {
            // in case of network errors this might not give reliable results
            if (this.readyState == 4) {
                asyncProc(this);
            }
        }; else req.timeout = 4000;  // Reduce default 2mn-like timeout if synchronous
        if (org.debug && address.indexOf("http://") == 0) {
            address = "http://rr0.org" + address;
        }
        req.open(reqType, address, !(!asyncProc));
        req.send();
    }

    this.onRequest = function (address, reqType, asyncProc) {
        var req = httpRequest();
        processRequest(asyncProc, req, address, reqType);
    };

    this.onCorsRequest = function (address, reqType, asyncProc) {
        var req = corsHttpRequest();
        processRequest(asyncProc, req, address, reqType);
    };

    this.onHead = function (address, proc) {
        this.onRequest(address, "HEAD", proc);
    };

    this.onExists = function (address, proc, failProc) {
        this.onHead(address, function (req) {
            if (req.status == 200) proc();
            else if (failProc) failProc();
        });
    };
    return this;
}());
