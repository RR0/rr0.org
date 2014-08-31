// Network functions
function NetModule() {
    var netThis = this;
    /**
     *
     * @param e The element to replace into
     * @param toReplace The text to link in the element contents
     * @param l The link address
     * @param replacement The replacement text, if different from toReplace
     * @param {boolean} cacheIt If the association text->link should be cached (if no fallback)
     * @param {string} [t] title on the link
     */
    this.checkedLink=function(e, toReplace, l, replacement, cacheIt, t) {
        if (l) {
            l = org.addEndingSlash(l);
        }
        if (e.className != org.constantClass) {
            if (!replacement) replacement = toReplace;
            var newText = org.text(e).replace(toReplace, replacement);  // Replace text early, the link will come later
            if (e.nodeType == Node.TEXT_NODE) {
                e.nodeValue = newText;
            } else {
                e.innerHTML = newText;
            }
            if (t) {
                e.title = t;
            }
            if (l && l != org.getUri()) {
                toReplace = replacement;
                var failProc = function () {
                    var pLink = org.parentLink(l);
                    if (org.getUri().indexOf("/time/") < 0) {
                        org.log("failed " + l + " trying " + pLink + " for e'sparent=" + e.parentNode);
                        cacheIt = false;
                        netThis.checkedLink(e, toReplace, pLink, replacement, cacheIt, t);
                    }
                };
                org.rr0.net.onExists(l, function () {
                    if (l != (org.rr0.time.uriPart + "0/0/")) {
                        org.rr0.net.onExists(l + "/index.html", function () {
                            org.log("found link " + l + " for e'sparent=" + e.parentNode);
                            e = org.linkify(e, replacement, l, replacement, cacheIt);
                            if (t) e.title = t;
                        }, failProc);
                    }
                }, failProc);
            }
        }
    };

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
}
org.rr0.net = new NetModule();