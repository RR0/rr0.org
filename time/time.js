var org = org || {}; // Useless as we depend on org functions
org.rr0 = org.rr0 || {};
function TimeModule() {

    var timeModuleThis = this;

    /**
     * http://www.w3.org/html/wg/drafts/html/master/text-level-semantics.html#the-time-element
     * http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#global-dates-and-times
     *
     * ((-)?[1-9]\d{3})(-(\d{1,2})(-(\d{1,2})(T\d{1,2}:\d{1:2])?)?)?
     *
     * 1947-06-21T14:20-02:00
     */
    this.uriPart = "/time/";

    this.isTimeURL = function (u) {
        if (!u) {
            u = org.getUri();
        }
        return u.indexOf(this.uriPart) === 0;
    };

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

    this.chartZone = null;
    var chart;

    this.drawChart = function () {
        if (times) {
            var options = {
                'title': "Heures d'observation",
                'width': this.chartZone.offsetWidth,
                'height': this.chartZone.offsetHeight - document.getElementById("head").offsetHeight,
                legend: {position: 'none'}
            };
            chart.draw(times, options);
        } else {
            timeModuleThis.setChartsHeight(0);
        }
    };

    this.Duration = function () {
        var durationThis = this;
        this.Unit = function (f, n) {
            this.factor = f;
            this.name = n;
            this.toString = function (value) {
                return value > 0 ? value + '&nbsp;' + this.name + (value > 1 ? 's' : '') : '';
            }
        };
        durationThis.second = new this.Unit(1, 'seconde');
        durationThis.minute = new this.Unit(60 * durationThis.second.factor, 'minute');
        durationThis.hour = new this.Unit(60 * durationThis.minute.factor, 'heure');
        durationThis.day = new this.Unit(24 * durationThis.hour.factor, 'jour');

        var durationRegex = /P(\d+D)*(\d+H)*(\d+M)*(\d+S)*/;
        durationThis.fromString = function (txt) {
            var foundExprs = durationRegex.exec(txt);
            durationThis.durationInSeconds = 0;
            for (var i = 1; i < foundExprs.length; i++) {
                var expr = foundExprs[i];
                if (expr) {
                    var lastCharPos = expr.length - 1;
                    var value = parseInt(expr.substring(0, lastCharPos), 10);
                    switch (expr.charAt(lastCharPos)) {
                        case 'D':
                            durationThis.unit = durationThis.day;
                            break;
                        case 'H':
                            durationThis.unit = durationThis.hour;
                            break;
                        case 'M':
                            durationThis.unit = durationThis.minute;
                            break;
                        case 'S':
                            durationThis.unit = durationThis.second;
                            break;
                        case 'P':
                    }
                    durationThis.durationInSeconds += value * durationThis.unit.factor;
                }
            }

            return this;
        };

        this.toString = function (unitStated) {
            var txt = [];
            var remaining = durationThis.durationInSeconds;
            var days = Math.floor(remaining / durationThis.day.factor);
            if (days >= 1) {
                txt.push(unitStated != durationThis.day.name ? durationThis.day.toString(days) : days);
            }
            remaining = remaining % durationThis.day.factor;
            var hours = Math.floor(remaining / durationThis.hour.factor);
            if (hours >= 1) {
                txt.push(unitStated != durationThis.hour.name ? this.hour.toString(hours) : hours);
            }
            remaining = remaining % durationThis.hour.factor;
            var minutes = Math.floor(remaining / durationThis.minute.factor);
            if (minutes >= 1) {
                txt.push(unitStated != durationThis.minute.name ? durationThis.minute.toString(minutes) : minutes);
            }
            remaining = remaining % durationThis.minute.factor;
            var seconds = remaining;
            if (seconds >= 1) {
                txt.push(unitStated != durationThis.second.name ? durationThis.second.toString(seconds) : seconds);
            }
            var last = txt.length - 1;
            var s = '';
            for (var i = last; i >= 0; i--) {
                s = (i === last && i > 0 ? ' et ' : i > 0 ? ', ' : '') + txt[i] + s;
            }
            return s;
        }
    };

    this.Moment = function () {
        var momentSelf = this;

        function clear() {
            momentSelf.decade = false;
            momentSelf.dayOfMonth = null;
            momentSelf.timeZone = null;
            momentSelf.year = null;
            momentSelf.month = null;
            momentSelf.hour = null;
            momentSelf.minutes = null;
            momentSelf.seconds = null;
        }

        clear.call(this);

        this.setSeconds = function (s) {
            momentSelf.seconds = s;
        };

        this.setMinutes = function (mn) {
            momentSelf.minutes = mn;
            momentSelf.setSeconds();
        };

        this.setHour = function (h) {
            momentSelf.hour = h;
            momentSelf.setMinutes();
        };

        this.setTimeZone = function (z) {
            momentSelf.timeZone = z;
        };

        this.setDayOfMonth = function (d) {
            momentSelf.dayOfMonth = d;
            momentSelf.setHour();
        };

        this.setMonth = function (m) {
            momentSelf.month = m;
            momentSelf.setDayOfMonth();
        };

        this.setYear = function (number) {
            momentSelf.year = number;
            momentSelf.setMonth();
        };

        this.getYear = function () {
            return momentSelf.year;
        };

        this.getMonth = function () {
            return momentSelf.month;
        };

        this.getDayOfMonth = function () {
            return momentSelf.dayOfMonth;
        };

        this.getHour = function () {
            return momentSelf.hour;
        };

        this.getMinutes = function () {
            return momentSelf.minutes;
        };

        this.getTimeZone = function () {
            return momentSelf.timeZone;
        };

        this.isApprox = function () {
            return momentSelf.approx;
        };

        this.fromString = function (dString) {
            var number;
            var era;
            var txt;
            var monthReady;
            var zReady;

            function resetParse() {
                clear.call(momentSelf);
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
                momentSelf.setTimeZone(z);
                txt = null;
            }

            function value() {
                return number != null ? zReady ? number : txt + number : txt != null ? txt : null;
            }

            var i;

            function timeSet() {
                if (momentSelf.year != null && number <= 59) {
                    monthReady = monthReady || dString.charAt(i) == '-';
                    if (!monthReady) {
                        if (momentSelf.month != null) {
                            if (momentSelf.dayOfMonth != null || momentSelf.hour != null) {
                                if (momentSelf.hour != null) {
                                    if (this.minutes != null) {
                                        momentSelf.setDayOfMonth(value());     // setHour is processed after ':' only
                                    } else {
                                        momentSelf.setMinutes(value());
                                    }
                                } else {
                                    momentSelf.setDayOfMonth(value());     // setHour is processed after ':' only
                                }
                            } else {
                                momentSelf.setDayOfMonth(value());
                            }
                        } else {
                            // Probably just text
                        }
                    } else {
                        momentSelf.setMonth(value());
                        monthReady = false;
                    }
                } else if (momentSelf.hour != null) {
                    momentSelf.setMinutes(value());
                } else {
                    momentSelf.setYear(era * number);
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
                            momentSelf.setHour(null);  // Next value cannot be minutes
                            timeSet.call(this); // End of year or month
                        } else {
                            txt += c;
                        }
                        break;
                    case 's':
                        if (number != null && txt.charAt(i - 1) != ' ') {
                            momentSelf.decade = true;
                        } else {
                            txt += c;
                        }
                        break;
                    case '+':
                        era = 1;
                        break;
                    case '~':
                        momentSelf.approx = true;
                        break;
                    case ':':
                        if (momentSelf.hour != null && zReady) {
                            momentSelf.setTimeZone(number * era);
                        } else {
                            momentSelf.setHour(value());
                            zReady = true;
                        }
                        number = null;
                        break;
                    case 'T':
                        var hourNumber = !isNaN(dString.charAt(i + 1));
                    case ' ':
                        if (!hourNumber && (txt || zReady)) {
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
                        if (digit) {
                            txt += digit;
                            number = null;
                            digit = null;
                        }
                        txt += c;
                }
            }
            parseEnd.call(this);
            return momentSelf;
        };

        this.toISOString = function () {
            var s = momentSelf.year;
            if (momentSelf.month) {
                s += '-' + org.zero(momentSelf.month);
            }
            if (momentSelf.dayOfMonth) {
                s += '-' + org.zero(momentSelf.dayOfMonth);
            }
            if (momentSelf.hour) {
                s += org.zero(momentSelf.hour) + ":" + org.zero(momentSelf.minutes);
            }
            return s;
        }
    };

    org.rr0.context.time = new this.Moment();

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
            if (this.isTimeURL(u)) {
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
        var yLink = timeModuleThis.uriPart;
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
        var t = timeModuleThis.getTime();
        if (m) t.month = m;
        if (t.month) {
            var mName = monthName();
            s += mName;
        }
        return s;
    }

    function addYear(y, yLink, t) {
        var s = "";
        if (!y) y = timeModuleThis.getTime().year;
        if (!yLink) yLink = timeModuleThis.yearLink(y);
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
        var t = timeModuleThis.getTime();
        if (!d) d = t.dayOfMonth;
        if (d) {
            var dayName = dayOfWeekNam(timeModuleThis.getDayOfWeek(t.year, t.month, d));
            s += dayName + " ";
            s += (d == 1 ? "1<sup>er</sup>" : d);
        }
        return s;
    }

    function setHour(h) {
        if (h) timeModuleThis.getTime().hour = h;
    }

    function setMinutes(mn) {
        if (mn) timeModuleThis.getTime().minutes = mn;
    }

    function getHour() {
        return timeModuleThis.getTime().hour;
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
        return timeModuleThis.getTime().month;
    }

    function getDate(y, m, d) {
        var dat;
        if (!y) y = timeModuleThis.getYear();
        if (y) {                    // No getTime().year set means no date set
            dat = new Date();
            dat.setFullYear(y);
            if (!m) m = getMonth();
            if (m) dat.setMonth(m - 1);
            if (!d) d = timeModuleThis.getDayOfMonth();
            dat.setDate(d);
        }
        return dat;
    }

    this.getDayOfWeek = function (y, m, d) {
        return getDate(y, m, d).getDay();
    };

    this.addDate = function (p, y, m, d) {
        if (!y) y = timeModuleThis.getTime().year;
        var s = "";
        if (y) {
            if (!m) m = getMonth();
            if (!d) d = timeModuleThis.getTime().dayOfMonth;
            var newDate = new Date();
            newDate.setFullYear(y);
            var dateLink = this.yearLink(y);
            if (m) {
                newDate.setMonth(m);
                dateLink += "/" + org.zero(m);
                if (d) {
                    newDate.setDate(d);
//                s = "le ";
                    s += addDayOfMonth(d);
                    dateLink += "/" + org.zero(d);
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
        var l = timeModuleThis.yearLink(y);
        m = ret.m;
        var label = y;
        if (m) {
            setContents(oy, timeModuleThis.yearLink(oy));
            l += "/" + org.zero(m);
            label = monthNam(m - 1);
            if (y != timeModuleThis.getTime().year) label += ' ' + y;
        } else {
            var cLink = timeModuleThis.yearLink(oy, true);
            if (cLink != timeModuleThis.getUri()) {
                setContents(~~(oy / 10) + "0s", cLink)
            }
        }
        org.onExists(l, function (req) {
            foundProc(label, l);
        }, function (failReq) {
            timeModuleThis.findTimeSibling(y, m, changeProc, foundProc);
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
        if (!org.hasClass(e, org.constantClass) && uls.length > 0) {
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

    var dateRegex = /(-)?[1-9]\d{3}(-\d{1,2}(-\d{1,2})?)?/g;

    function affectsContext(e) {
        return !org.hasClass(e.parentNode, "source") && !org.hasClass(e.parentNode, "note");
    }

    this.timeTextHandler = function (e) {
        if (org.rr0.time.isTimeURL() && e.tagName == "LI") {
            return handleListItem(e);
        }
        if (e.parentNode.tagName === "TIME") return;

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
                                dateLink = org.rr0.time.yearLink(y) + "/" + org.zero(mIndexBefore);
                            } else {
                                dateLink = org.rr0.time.yearLink(y, decade);
                                if (s.length > 1 && s.length <= 3) {
                                    mIndexBefore = parseInt(s[1], 10);
                                    if (affectsCtx) {
                                        org.rr0.time.setMonth(mIndexBefore);
                                    }
                                    dateLink += "/" + org.zero(mIndexBefore);
                                    replacement = org.rr0.time.monthName(mIndexBefore) + " " + y;
                                    if (s.length > 2) {
                                        var jIndex = parseInt(s[2], 10);
                                        if (affectsCtx) {
                                            org.rr0.time.setDayOfMonth(jIndex);
                                        }
                                        dateLink += "/" + org.zero(jIndex);
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
    };
    this.setChartsHeight = function (h) {
        this.chartZone.style.height = h + '%';
        org.rr0.getSideZone("map-canvas").style.height = (100 - h) + '%';
    };
    return this;
}
org.rr0.time = new TimeModule();