"use strict";
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
    /**
     * Transform some text into a link.
     *
     * @param {HTMLElement} e The element containing the text.
     * @param {string} k The text to look for.
     * @param {string} l The URI of the link to create
     * @param {string} [r] The text replacement, if any (matched text remains otherwise)
     * @param {boolean} [cacheIt]
     * @return {HTMLElement}
     */
    function linkify(e, k, l, r, cacheIt) {
        if (!org.hasClass(e, org.constantClass) && l !== org.getUri() && (l + "/") !== org.getUri()) {
            var txt = org.text(e);
            if (txt) {
                var pos = txt.indexOf(k);
                if (pos >= 0) {
                    org.log("linkify('" + txt + "', " + k + ", '" + l + "' for e'sparent=" + e.parentNode);
                    if (!r) {
                        r = k;
                    }
                    var text1;
                    if (pos > 0) {
                        text1 = document.createTextNode(txt.substring(0, pos));
                    }
                    var re = document.createTextNode(r);
                    var le = org.linkElement(l, re);
                    var endPos = pos + k.length;
                    var text2;
                    if (endPos < txt.length) {
                        text2 = document.createTextNode(txt.substring(endPos));
                    }
                    var pNode = e.parentNode;
                    if (pNode) {    // TODO: Should not occur
                        pNode.replaceChild(le, e);
                        if (text1) {
                            pNode.insertBefore(text1, le);
                        }
                        if (text2) {
                            pNode.insertBefore(text2, le.nextSibling);
                        }
                    }
                    if (cacheIt) {
                        org.toLink(l, r);
                    }
                    e = le;
                }
            }
        }
        return e;
    }

    function httpRequest() {
        return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    }

    function corsHttpRequest() {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // Check if the XMLHttpRequest object has a "withCredentials" property. "withCredentials" only exists on XMLHTTPRequest2 objects.
        } else if (typeof XDomainRequest !== "undefined") {
            // Otherwise, check if XDomainRequest. XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
        } else {    // Otherwise, CORS is not supported by the browser.
            xhr = null;
        }
        return xhr;
    }

    function processRequest(asyncProc, req, address, reqType) {
        if (asyncProc) {
            req.onreadystatechange = function () {
                // in case of network errors this might not give reliable results
                if (this.readyState === 4) {
                    asyncProc(this);
                }
            };
        } else {
            req.timeout = 4000;
        }  // Reduce default 2mn-like timeout if synchronous
        if (org.debug && address.indexOf("http://") === 0) {
            address = "http://rr0.org" + address;
        }
        req.open(reqType, address, !(!asyncProc));
        req.send();
    }

    netThis.onRequest = function (address, reqType, asyncProc) {
        var req = httpRequest();
        processRequest(asyncProc, req, address, reqType);
    };

    netThis.onCorsRequest = function (address, reqType, asyncProc) {
        var req = corsHttpRequest();
        processRequest(asyncProc, req, address, reqType);
    };

    netThis.onHead = function (address, proc) {
        this.onRequest(address, "HEAD", proc);
    };

    netThis.onExists = function (address, proc, failProc) {
        this.onHead(address, function (req) {
            if (req.status === 200) {
                proc();
            } else if (failProc) {
                failProc();
            }
        });
    };
    return netThis;
}
org.rr0.net = new NetModule();
angular.module('rr0.net', ['rr0.commons'])
    .service('netService', ['commonsService', '$log', function (commonsService, $log) {
        return {
            onExists: function (l, cb, fp) {
                return org.rr0.net.onExists(l, cb, fp);
            },
            checkedLink: function (e, toReplace, l, replacement, cacheIt, t) {
                var thisService = this;
                if (l) {
                    l = commonsService.addEndingSlash(l);
                }
                if (e.className !== org.constantClass) {
                    if (!replacement) {
                        replacement = toReplace;
                    }
                    var newText = org.text(e).replace(toReplace, replacement);  // Replace text early, the link will come later
                    if (e.nodeType === Node.TEXT_NODE) {
                        e.nodeValue = newText;
                    } else {
                        e.innerHTML = newText;
                    }
                    if (t) {
                        e.title = t;
                    }
                    if (l && l !== commonsService.getUri()) {
                        toReplace = replacement;
                        var failProc = function () {
                            var pLink = commonsService.parentLink(l);
                            if (commonsService.getUri().indexOf("/time/") < 0) {
                                $log.debug("failed " + l + " trying " + pLink + " for e'sparent=" + e.parentNode);
                                cacheIt = false;
                                thisService.checkedLink(e, toReplace, pLink, replacement, cacheIt, t);
                            }
                        };

                        thisService.onExists(l, function () {
                            if (l !== (org.rr0.time.uriPart + "0/0/")) {
                                org.rr0.net.onExists(l + "/index.html", function () {
                                    $log.debug("found link " + l + " for e'sparent=" + e.parentNode);
                                    e = org.rr0.net.linkify(e, replacement, l, replacement, cacheIt);
                                    if (t) {
                                        e.title = t;
                                    }
                                }, failProc);
                            }
                        }, failProc);
                    }
                }
            }
        };
    }]);