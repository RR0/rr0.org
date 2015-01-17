angular.module('rr0.people')
    .service('peopleService', ['$log', 'commonsService', 'peopleRoot', function ($log, commonsService, peopleRoot) {
        "use strict";

        var authors = [];
        var copyright;

        function setPName(name) {
            if (name && name.length > 0) {
                org.rr0.context.people = new People(name);
                return org.rr0.context.people;
            }
        }

        return {
            getCopyright: function () {
                return copyright;
            },
            getAuthors: function () {
                return authors;
            },
            setAuthor: function (a, aLink) {
                if (a) {
                    var author = setPName(a);
                    author.link = this.peopleLink(a, aLink);
                    authors.push(author);
                }
            },
            setCopyright: function (c, cLink) {
                copyright = window.copyright = c;
            },
            addAuthor: function (a, aLink, c, cLink) {
                if (a) {
                    this.setAuthor(a, aLink);
                }
                if (c) {
                    this.setCopyright(c, cLink);
                }
            },
            setPeopleName: function (name) {
                setPName(name);
            },
            /**
             * @param {String} p People's name
             * @param {String} [pLink] a href link, or a symbolic link, or null
             */
            peopleLink: function (p, pLink) {
                if (p) {
                    if (!pLink) {
                        pLink = org.cache[p];
                        if (!pLink) {
                            setPName(p);
                            pLink = org.cache[this.getPeople().lastName];
                            if (!pLink) {
                                p = (this.getPeople().lastName + this.getPeople().firstName);
                                pLink = commonsService.validLink(p);
                            } else {
                                return pLink;
                            }
                        } else {
                            return pLink;
                        }
                    }
                    var firstLinkChar = pLink.charAt(0);
                    if (firstLinkChar !== '.' && firstLinkChar !== '/') {
                        pLink = peopleRoot + firstLinkChar.toLowerCase() + "/" + pLink;
                    }
                    pLink = commonsService.validLink(pLink);
                    org.cache[p] = pLink;
                    org.cache[this.getPeople().lastName] = pLink;
                } else {
                    pLink = null;
                }
                return pLink;
            },
            getPeople: function () {
                return org.rr0.context.people;
            }
        };
    }]);