// var org = org || {}; // Useless as we depend on org functions
org.rr0 = org.rr0 || {};
org.rr0.time = (function () {
    /**
     * http://www.w3.org/html/wg/drafts/html/master/text-level-semantics.html#the-time-element
     * http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#global-dates-and-times
     *
     * ((-)?[1-9]\d{3})(-(\d{1,2})(-(\d{1,2})(T\d{1,2}:\d{1:2])?)?)?
     *
     * 1947-06-21T14:20-02:00
     */
    var uriPart = "/time/";

    function isTimeURL(u) {
        if (!u) {
            u = org.getUri();
        }
        return u.indexOf(uriPart) === 0;
    }

    var dayOfWeekNames = {
        "fr": [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ],
        "en": [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
    };
    var monthNames = {
        "fr": [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ],
        "en": [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    };

    function paramLang(lang) {
        return (!lang) ? org.rr0.context.language : lang;
    }

    this.dayOfWeekNam = function (d, lang) {
        return dayOfWeekNames[paramLang(lang)][d];
    };

    function monthNam(m, lang) {
        return monthNames[paramLang(lang)][m];
    }

    var times;

    function getTimes() {
        if (!times) {
            times = new google.visualization.DataTable();
            times.addColumn('string', 'Heure');
            times.addColumn('number');
            for (var i = 0; i < 24; i++) {
                times.addRow([i + "", 0]);
            }
        }
        return times;
    }

    function parseForTimes() {
        org.nounToLink(uriPart + "Vagues.html", "vague");
        org.nounToLink(uriPart + "pluies", "pluie");

        org.handleTags.apply(this, [timeTextHandler]);
    }

    var chartZone;
    var chart;

    function initGoogleCharts(chartsApiLoaded) {
        google.load('visualization', '1.0', {
            'packages': ['corechart'],
            callback: chartsApiLoaded
        });
    }

    this.drawChart = function () {
        if (times) {
            var options = {
                'title': "Heures d'observation",
                'width': chartZone.offsetWidth,
                'height': chartZone.offsetHeight - document.getElementById("head").offsetHeight,
                legend: {position: 'none'}
            };
            chart.draw(times, options);
        } else {
            setChartsHeight(0);
        }
    };

    function Moment() {
        function clear() {
            this.decade = false;
            this.dayOfMonth = null;
            this.timeZone = null;
            this.year = null;
            this.month = null;
            this.hour = null;
            this.minutes = null;
            this.seconds = null;
        }

        clear.call(this);

        this.setSeconds = function (s) {
            this.seconds = s;
        };

        this.setMinutes = function (mn) {
            this.minutes = mn;
            this.setSeconds();
        };

        this.setHour = function (h) {
            this.hour = h;
            this.setMinutes();
        };

        this.setTimeZone = function (z) {
            this.timeZone = z;
        };

        this.setDayOfMonth = function (d) {
            this.dayOfMonth = d;
            this.setHour();
        };

        this.setMonth = function (m) {
            this.month = m;
            this.setDayOfMonth();
        };

        this.setYear = function (number) {
            this.year = number;
            this.setMonth();
        };

        this.getYear = function () {
            return this.year;
        };

        this.getMonth = function () {
            return this.month;
        };

        this.getDayOfMonth = function () {
            return this.dayOfMonth;
        };

        this.getHour = function () {
            return this.hour;
        };

        this.getMinutes = function () {
            return this.minutes;
        };

        this.getTimeZone = function () {
            return this.timeZone;
        };

        this.isApprox = function () {
            return this.approx;
        };

        this.fromString = function (dString) {
            var number;
            var era;
            var txt;
            var monthReady;
            var zReady;

            function resetParse() {
                clear.call(this);
                number = null;
                era = 1;
                txt = "";
                monthReady = undefined;
                zReady = undefined;
            }

            resetParse();

            function setTz(c) {
                var z;
                switch (txt) {
                    case 'Z':
                    case 'UTC':
                    case 'TU':
                    case 'UT':
                    case 'GMT':
                        z = 0;
                        break;
                    case 'EGT':
                        z = -1;
                        break;
                    case 'ADT':
                    case 'HAA':
                    case 'WGT':
                        z = -3;
                        break;
                    case 'EDT':
                    case 'AST':
                    case 'HAE':
                        z = -4;
                        break;
                    case 'EST': // Eastern Daylight Time
                    case 'CDT':
                    case 'ET':
                    case 'HAC':
                        z = -5;
                        break;
                    case 'CST':
                    case 'MDT':
                        z = -6;
                        break;
                    case 'MST':
                    case 'PDT':
                        z = -7;
                        break;
                    case 'PST':
                        z = -8;
                        break;
                    default:
                        return;
                }
                this.setTimeZone(z);
                txt = null;
            }

            function value() {
                return number != null ? zReady ? number : txt + number : txt != null ? txt : null;
            }

            var i;

            function timeSet() {
                if (this.year != null && number <= 59) {
                    monthReady = monthReady || dString.charAt(i) == '-';
                    if (this.month != null && !monthReady) {
                        if (this.dayOfMonth != null || this.hour != null) {
                            if (this.hour != null) {
                                if (this.minutes != null) {
                                    this.setDayOfMonth(value());     // setHour is processed after ':' only
                                } else {
                                    this.setMinutes(value());
                                }
                            } else {
                                this.setDayOfMonth(value());     // setHour is processed after ':' only
                            }
                        } else {
                            this.setDayOfMonth(value());
                        }
                    } else {
                        this.setMonth(value());
                        monthReady = false;
                    }
                } else if (this.hour != null) {
                    this.setMinutes(value());
                } else {
                    this.setYear(era * number);
                    monthReady = true;
                }
                number = null;
            }

            function parseEnd() {
                if (value() != null) {
                    timeSet.call(this); // End of date
                }
                if (txt) {
                    setTz.call(this);
                }
            }

            for (i = 0; i < dString.length; i++) {
                var c = dString.charAt(i);
                switch (c) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        var digit = (c - '0');
                        if (number == null) {
                            number = digit * era;
                        } else {
                            number = number * 10 + digit;
                        }
                        break;
                    case '-':
                        if (!txt) {
                            if (number == null) {
                                era = -1;
                            }
                            this.setHour(null);  // Next value cannot be minutes
                            timeSet.call(this); // End of year or month
                        } else {
                            txt += c;
                        }
                        break;
                    case 's':
                        if (number != null && txt.charAt(i - 1) != ' ') {
                            this.decade = true;
                        } else {
                            txt += c;
                        }
                        break;
                    case '+':
                        era = 1;
                        break;
                    case '~':
                        this.approx = true;
                        break;
                    case ':':
                        if (this.hour != null && zReady) {
                            this.setTimeZone(number * era);
                        } else {
                            this.setHour(value());
                            zReady = true;
                        }
                        number = null;
                        break;
                    case 'T':
                        if (txt || zReady) {
                            txt += c;
                        } else {
                            timeSet.call(this); // End of date
                        }
                        break;
                    case '/':
                        parseEnd.call(this);
                        this.startDate = org.clone(this);
                        resetParse();
                        break;
                    default:
                        txt += c;
                }
            }
            parseEnd.call(this);
            return this;
        };

        this.toISOString = function () {
            var s = this.year;
            if (this.month) {
                s += '-' + zero(this.month);
            }
            if (this.dayOfMonth) {
                s += '-' + zero(this.dayOfMonth);
            }
            if (this.hour) {
                s += zero(this.hour) + ":" + zero(this.minutes);
            }
            return s;
        }
    }

    org.rr0.context.time = new Moment();

    this.getTime = function () {
        return org.rr0.context.time;
    };

    var today = new Date();

    this.setYear = function (y) {
        if (y) this.getTime().year = y;
    };

    this.getYear = function () {
        var t = this.getTime();
        if (!t.year) {
            var u = org.getUri();
            if (isTimeURL(u)) {
                var parts = u.split("/");
                t.year = 0;
                var mul = 1000;
                for (var i = 2; i < parts.length; i++) {
                    var v = parts[i];
                    if (org.isNumber(v)) {
                        if (i <= 5) {
                            t.year += v * mul;
                            mul /= 10;
                        } else if (!t.month) t.month = parseInt(v, 10);
                        else if (!t.dayOfMonth) t.dayOfMonth = parseInt(v, 10);
                    } else
                        break;
                }
            }
        }
        return t.year;
    };

    /**
     *
     * @param w
     * @return {*} January = 1
     */
    function monthIndex(w) {
        return org.arrayIndex(w, monthNames[org.rr0.context.language]);
    }

    /**
     * Builds a address to link to a year page/directory.
     *
     * @param y The year
     * @param decade if the year (such as "1950") is to be understood as a decade (1950s).
     * @returns {string} The link
     */
    this.yearLink = function (y, decade) {
        var yString = y.toString();
        var yLink = uriPart;
        var pos = 0;
        yLink += (y < 1000 ? "0" : yString.substring(pos, ++pos)) + "/";
        yLink += (y < 100 ? "0" : yString.substring(pos, ++pos)) + "/";
        yLink += (y < 10 ? "0" : yString.substring(pos, ++pos)) + "/";
        if (!decade) yLink += yString.substring(pos, ++pos);
        return yLink;
    };

    this.setMonth = function (m) {
        if (m) {
            this.getTime().setMonth(m);
        }
    };

    this.monthName = function (m) {
        var t = this.getTime();
        if (!m && t.month) m = t.month;
        return monthNam(m - 1);
    };

    function addMonth(m) {
        var s = "";
        var t = this.getTime();
        if (m) t.month = m;
        if (t.month) {
            var mName = monthName();
            s += mName;
        }
        return s;
    }

    function addYear(y, yLink, t) {
        var s = "";
        if (!y) y = this.getTime().year;
        if (!yLink) yLink = this.yearLink(y);
        if (!t) {
            var p = getPeople();
            if (p) {
                t = p.toString();
                if (p.born) t += " a " + (y - p.born.getFullYear()) + " ans";
                else t = "Naissance de " + t;
            }
        }
        if (y) s += org.link(yLink, y, t);
        return s;
    }

    /**
     *
     * @param d
     * @param dow Day of week
     * @returns {string}
     */
    function addDayOfMonth(d, dow) {
        var s = "";
        var t = this.getTime();
        if (!d) d = t.dayOfMonth;
        if (d) {
            var dayName = dayOfWeekNam(this.getDayOfWeek(t.year, t.month, d));
            s += dayName + " ";
            s += (d == 1 ? "1<sup>er</sup>" : d);
        }
        return s;
    }

    function setHour(h) {
        if (h) this.getTime().hour = h;
    }

    function setMinutes(mn) {
        if (mn) this.getTime().minutes = mn;
    }

    function getHour() {
        return this.getTime().hour;
    }

    this.setDayOfMonth = function (d) {
        if (d) {
            var t = this.getTime();
            t.dayOfMonth = d;
            t.hour = null;
            t.minutes = null;
        }
    };

    this.getDayOfMonth = function () {
        return this.getTime().dayOfMonth;
    };

    function getMonth() {
        return this.getTime().month;
    }

    function getDate(y, m, d) {
        var dat;
        if (!y) y = this.getYear();
        if (y) {                    // No getTime().year set means no date set
            dat = new Date();
            dat.setFullYear(y);
            if (!m) m = getMonth();
            if (m) dat.setMonth(m - 1);
            if (!d) d = this.getDayOfMonth();
            dat.setDate(d);
        }
        return dat;
    }

    this.getDayOfWeek = function (y, m, d) {
        return getDate(y, m, d).getDay();
    };

    this.addDate = function (p, y, m, d) {
        if (!y) y = this.getTime().year;
        var s = "";
        if (y) {
            if (!m) m = getMonth();
            if (!d) d = this.getTime().dayOfMonth;
            var newDate = new Date();
            newDate.setFullYear(y);
            var dateLink = this.yearLink(y);
            if (m) {
                newDate.setMonth(m);
                dateLink += "/" + zero(m);
                if (d) {
                    newDate.setDate(d);
//                s = "le ";
                    s += addDayOfMonth(d);
                    dateLink += "/" + zero(d);
                } else {
//                s = "en ";
                }
                s += " " + addMonth(m);
            } else {
//            s += "en ";
            }
            var t = null;
            s += " " + addYear(y, dateLink, t);
        }
        return s;
    };

    this.findTimeSibling = function (oy, m, changeProc, foundProc) {
        var ret = changeProc(oy, m);
        var y = ret.y;
        var l = this.yearLink(y);
        m = ret.m;
        var label = y;
        if (m) {
            setContents(oy, this.yearLink(oy));
            l += "/" + zero(m);
            label = monthNam(m - 1);
            if (y != this.getTime().year) label += ' ' + y;
        } else {
            var cLink = this.yearLink(oy, true);
            if (cLink != this.getUri()) {
                setContents(~~(oy / 10) + "0s", cLink)
            }
        }
        org.onExists(l, function (req) {
            foundProc(label, l);
        }, function (failReq) {
            this.findTimeSibling(y, m, changeProc, foundProc);
        });
    };

    var preYearWords = ["en", "de", "à", "dès", "vers", "depuis", "jusqu'en", "année", "années", "fin", "début", "printemps", "été", "automne", "hiver", "avant", "entre", "et", "ou"];
    var preMonthWords = ["en", "de", "à", "dès", "vers", "depuis", "jusqu'en", "mois", "fin", "début", "avant", "entre", "et", "ou"];
    var preDayWords = ["au", "le", "du", "à", "vers", "jusqu'au",
        "Au", "Le", "Du", "À", "Vers", "Jusqu'au"];

    function preMonthWord(w) {
        return org.arrayIndex(w, preMonthWords);
    }

    function preDayWord(w) {
        return org.arrayIndex(w, preDayWords);
    }

    function preYearWord(w) {
        return org.arrayIndex(w, preYearWords);
    }

    function handleListItem(e) {
        var uls = e.getElementsByTagName("UL");
        if (uls.length > 0) {
            var details = document.createElement("details");
            details.setAttribute("open", "");
            var ul = uls[0];
            var sum = document.createElement("summary");
            sum.appendChild(e.children[0]);
            details.appendChild(sum);
            details.appendChild(ul);
            e.parentNode.replaceChild(details, e);
        }
    }

    function handleTimeTag(e) {
        var txt = org.text(e);

        var currentTime = org.rr0.time.getTime();
        var decodedTime = new Moment();
        decodedTime.year = currentTime.getYear();
        decodedTime.month = currentTime.getMonth();
        decodedTime.dayOfMonth = currentTime.getDayOfMonth();
        decodedTime.hour = currentTime.getHour();
        decodedTime.minutes = currentTime.getMinutes();
        decodedTime.fromString(txt);

        function toString(contextTime, time) {
            var timeLink;
            var repYear;
            var titYear;
            var repMonth;
            var titMonth;
            var repDay;
            var titDay;
            var repHour;
            var y = time.getYear();
            if (y != null) {
                var otherYear = y != contextTime.getYear();
                timeLink = org.rr0.time.yearLink(y);
                titYear = y;
                if (otherYear) {
                    contextTime.setYear(y);
                    repYear = " " + y;
                }
            }
            var m = time.getMonth();
            if (m != null) {
                titMonth = org.rr0.time.monthName(m);
                timeLink += "/" + zero(m);
                var otherMonth = otherYear || m != contextTime.getMonth();
                if (otherMonth) {
                    contextTime.setMonth(m);
                    repMonth = " " + titMonth;
                }
            }
            var d = time.getDayOfMonth();
            if (d != null) {
                var dayAsNumber = parseInt(d, 10);
                var otherDay = 0;
                var dOW;
                if (!!(dayAsNumber)) {
                    dOW = org.rr0.time.dayOfWeekNam(org.rr0.time.getDayOfWeek(y, m, d));
                    titDay = dOW + " " + d + (d == 1 ? "er" : "");
                    if (otherMonth) otherDay = 30;
                    else {
                        otherDay = d - contextTime.getDayOfMonth();
                    }
                } else {
                    titDay = d;
                    otherDay = 1;
                }
                if (otherDay != 0) {
                    timeLink += "/" + zero(d);
                    repDay = titDay;
                    if (contextTime.getDayOfMonth()) {
                        switch (otherDay) {
                            case -1:
                                repDay = "veille";
                                break;
                            case 1:
                                repDay = "lendemain";
                                break;
                            case 2:
                                repDay = "surlendemain";
                                break;
                            default:
                                if (otherDay <= 7) {
                                    repDay = dOW + " suivant";
                                }
                        }
                    }
                    contextTime.setDayOfMonth(d);
                }
            }
            var titHour;
            var h = time.getHour();
            if (h != null) {
                var hourAsNumber = parseInt(h, 10);
                var otherHour;
                if (!!(hourAsNumber)) {
                    titHour = zero(h);
                } else {
                    titHour = h;
                    otherHour = true;
                }
                var o;
//                var s = h;
//                if (s) {
//                    var timesToUpdate = getTimes();
//                    for (var i = 0; i < timesToUpdate.getNumberOfRows(); i++) {
//                        o = times.getValue(i, 0);
//                        if (o == s) {
//                            var c = timesToUpdate.getValue(i, 1);
//                            c++;
//                            timesToUpdate.setValue(i, 1, c);
//                            break;
//                        }
//                    }
//                }
                otherHour = otherHour || otherDay || h != contextTime.getHour();
                titHour = (time.isApprox() ? 'vers' : 'à') + ' ' + titHour;
                if (otherHour) {
                    contextTime.setHour(h);
                }// TODO: else manage to display "30 mn later"
                repHour = titHour;  // For now, always display hours, even if unchanged
            }
            var mn = time.getMinutes();
            if (mn != null) {
                var th = ':' + zero(mn);
                titHour += th;
                var otherMinutes = otherHour || mn != contextTime.getMinutes();
                if (otherMinutes) {
                    contextTime.setMinutes(mn);
                    repHour += th;
                }
            }
            var titZ;
            var z = time.getTimeZone();
            if (z) {
                titZ = "(UTC" + (z >= 0 ? '+' : "") + z + ")";
            }
            var replacement = "";
            var title = "";
            if (repDay) {
                replacement += repDay;
            }
//            else {
//                if (! repMonth) {
//                    replacement = "même jour";
//                }
//            }
            if (titDay) title += titDay;
            if (repMonth) replacement += repMonth;
            if (titMonth) title += " " + titMonth;
            if (repYear) replacement += repYear;
            if (titYear) title += " " + titYear;
            if (repHour) {
                replacement += " " + repHour;
            }
            if (titHour) title += ", " + titHour;
            if (titZ) title += " " + titZ;
            if (time.startDate) {
                var start = toString(time, time.startDate).replacement;
                var end = replacement;
                var betweenWord = repDay ? 'au' : 'à';
                replacement = start + ' ' + betweenWord + ' ' + end;
                title = start + ' ' + betweenWord + ' ' + title;
            }
            return { "replacement": replacement,
                "timeLink": timeLink,
                "title": title};
        }

        var r = toString(currentTime, decodedTime);
        e.setAttribute("datetime", decodedTime.toISOString());
        checkedLink(e, txt, r.timeLink, r.replacement, false, r.title);

    }

    var dateRegex = /(-)?[1-9]\d{3}(-\d{1,2}(-\d{1,2})?)?/g;

    function affectsContext(e) {
        return !org.hasClass(e.parentNode, "source") && !org.hasClass(e.parentNode, "note");
    }

    function timeTextHandler(e) {
        if (e.tagName == "TIME") {
            return handleTimeTag(e);
        } else if (org.getUri().indexOf("/time/") >= 0 && e.tagName == "LI") {
            return handleListItem(e);
        }
        if (e.parentNode.tagName == "TIME") return;

        var txt = org.textValue(e);
        var parentNode = e.parentNode;

        function regexFound(foundExprs) {
            var toReplace = foundExprs[0];
            var s;
            if (txt.substring(0, 1) == '-') s = toReplace;
            else s = toReplace.split('-');
            var y = s[0];
            if (org.isNumber(y) && y <= today.getFullYear()) {
                var wBefore = org.wordBefore(txt, foundExprs.index).toLowerCase();
                var mIndexBefore = monthIndex(wBefore);
                var isPreYearWord = preYearWord(wBefore);
                var isPreMonthWord = preMonthWord(wBefore);
                var isPreDayWord = preDayWord(wBefore);
                if (wBefore == "" || mIndexBefore || isPreYearWord || isPreMonthWord || isPreDayWord) {
                    if (!mIndexBefore) {
                        var nextPos = foundExprs.index + y.length;
                        var wAfter = org.wordAfter(txt, nextPos);
                        var nextChar = txt.charAt(nextPos);
                    }
                    if (parentNode) {
                        if (mIndexBefore || wAfter == "" || org.isProNoun(wAfter) || !(org.isPlural(wAfter) && !org.isProperName(wAfter)) && !org.arrayIndex(wAfter, units) && !monthIndex(wAfter)) {     // Plural on a sibling noun means count rather than getTime().year
                            var affectsCtx = affectsContext(e);
                            if (affectsCtx) {
                                org.rr0.time.setYear(y);
                            }
                            if (org.wordBefore(txt, foundExprs.index - wBefore.length) == "naît")
                                getPeople().born = y;
                            var title = parentNode.title;
                            if (title) {
                                var first;
                                var dash = title.indexOf('-');
                                if (dash > 0) first = title.substring(0, dash);
                                else first = title;
                                if (first < y) {
                                    first += '-';
                                } else {
                                    y = first;
                                    first = "";
                                }
                            } else first = "";
                            parentNode.title = first + org.rr0.time.getTime().year;
                            var peo = getPeople();
                            if (peo) {
                                var age = org.rr0.time.getTime().year - peo.born;
                                if (age > 0) {
                                    parentNode.title += " : " + peo.lastName + " a " + age + " ans";
                                }
                            }
                            var decade = nextChar === 's';      // Decade quoted as "1940s" for example
                            var replacement = toReplace;
                            var dateLink;
                            if (mIndexBefore) {
                                dateLink = org.rr0.time.yearLink(y) + "/" + zero(mIndexBefore);
                            } else {
                                dateLink = org.rr0.time.yearLink(y, decade);
                                if (s.length > 1 && s.length <= 3) {
                                    mIndexBefore = parseInt(s[1], 10);
                                    if (affectsCtx) {
                                        org.rr0.time.setMonth(mIndexBefore);
                                    }
                                    dateLink += "/" + zero(mIndexBefore);
                                    replacement = org.rr0.time.monthName(mIndexBefore) + " " + y;
                                    if (s.length > 2) {
                                        var jIndex = parseInt(s[2], 10);
                                        if (affectsCtx) {
                                            org.rr0.time.setDayOfMonth(jIndex);
                                        }
                                        dateLink += "/" + zero(jIndex);
                                        replacement = org.rr0.time.dayOfWeekNam(org.rr0.time.getDayOfWeek(y, mIndexBefore, jIndex)) + " " + jIndex + (jIndex == 1 ? "er" : "") + " " + replacement;
                                    }
                                }
                            }
                            checkedLink(e, toReplace, dateLink, replacement, true);
                        }
                    }
                }
            }
        }

        if (txt) {
            var foundExprs;
            while ((foundExprs = dateRegex.exec(txt)) !== null) {
                regexFound(foundExprs);
            }
        }
        return false;
    }


    var onGoogleChartsLoaded = [parseForTimes];

    function setChartsHeight(h) {
        chartZone.style.height = h + '%';
        org.getSideZone("map-canvas").style.height = (100 - h) + '%';
    }

    function init() {
        initGoogleCharts(function () {
            chartZone = org.getSideZone("chart");
            setChartsHeight(30);
            chart = new google.visualization.ColumnChart(chartZone);
            org.rr0.sideCallbacks = org.rr0.sideCallbacks.concat([this.drawChart]);

            for (var i = 0; i < onGoogleChartsLoaded.length; i++) {
                onGoogleChartsLoaded[i]();
            }
        });
    }

    starts.push({
            dir: uriPart,
            label: "<span class='iconic clock'></span>",
            title: "Historique"
        }
    );
    org.onContentsLoaded(init);

    return this;
})();