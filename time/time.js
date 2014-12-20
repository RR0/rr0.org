angular.module('rr0.time', ['rr0.nav', 'rr0.net', 'rr0.people'])
    .constant('timeRoot', '/time/')
    .service('timeService', ['timeRoot', 'commonsService', function (timeRoot, commonsService) {
        'use strict';

        /**
         * http://www.w3.org/html/wg/drafts/html/master/text-level-semantics.html#the-time-element
         * http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#global-dates-and-times
         *
         * ((-)?[1-9]\d{3})(-(\d{1,2})(-(\d{1,2})(T\d{1,2}:\d{1:2])?)?)?
     *
     * 1947-06-21T14:20-02:00
     */
        var times;

        var Duration = function () {
            var durationThis = this;

            class Unit {
                constructor(f, n) {
                    this.factor = f;
                    this.name = n;
                }

                toString(value) {
                    return value > 0 ? value + '&nbsp;' + this.name + (value > 1 ? 's' : '') : '';
                }
            }

            durationThis.second = new Unit(1, 'seconde');
            durationThis.minute = new Unit(60 * durationThis.second.factor, 'minute');
            durationThis.hour = new Unit(60 * durationThis.minute.factor, 'heure');
            durationThis.day = new Unit(24 * durationThis.hour.factor, 'jour');

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
                    txt.push(unitStated !== durationThis.day.name ? durationThis.day.toString(days) : days);
                }
                remaining = remaining % durationThis.day.factor;
                var hours = Math.floor(remaining / durationThis.hour.factor);
                if (hours >= 1) {
                    txt.push(unitStated !== durationThis.hour.name ? this.hour.toString(hours) : hours);
                }
                remaining = remaining % durationThis.hour.factor;
                var minutes = Math.floor(remaining / durationThis.minute.factor);
                if (minutes >= 1) {
                    txt.push(unitStated !== durationThis.minute.name ? durationThis.minute.toString(minutes) : minutes);
                }
                remaining = remaining % durationThis.minute.factor;
                var seconds = remaining;
                if (seconds >= 1) {
                    txt.push(unitStated !== durationThis.second.name ? durationThis.second.toString(seconds) : seconds);
                }
                var last = txt.length - 1;
                var s = '';
                for (var i = last; i >= 0; i--) {
                    s = (i === last && i > 0 ? ' et ' : i > 0 ? ', ' : '') + txt[i] + s;
                }
                return s;
            };
        };

        class Moment {

            clear() {
                this.decade = false;
                this.dayOfMonth = null;
                this.timeZone = null;
                this.year = null;
                this.month = null;
                this.hour = null;
                this.minutes = null;
                this.seconds = null;
            }

            constructor() {
                this.decade = false;
                this.dayOfMonth = null;
                this.timeZone = null;
                this.year = null;
                this.month = null;
                this.hour = null;
                this.minutes = null;
                this.seconds = null;
            }

            setSeconds(s) {
                this.seconds = s;
            }

            setMinutes(mn) {
                this.minutes = mn;
                this.setSeconds();
            }

            setHour(h) {
                this.hour = h;
                this.setMinutes();
            }

            setTimeZone(z) {
                this.timeZone = z;
            }

            setDayOfMonth(d) {
                this.dayOfMonth = d;
                this.setHour();
            }

            setMonth(m) {
                this.month = m;
                this.setDayOfMonth();
            }

            setYear(number) {
                this.year = number;
                this.setMonth();
            }

            getYear() {
                return this.year;
            }

            getMonth() {
                return this.month;
            }

            getDayOfMonth() {
                return this.dayOfMonth;
            }

            getHour() {
                return this.hour;
            }

            getMinutes() {
                return this.minutes;
            }

            getTimeZone() {
                return this.timeZone;
            }

            isApprox() {
                return this.approx;
            }

            fromString(dString) {
                var number;
                var era;
                var txt;
                var monthReady;
                var zReady;

                var resetParse = function () {
                    this.clear();
                    number = null;
                    era = 1;
                    txt = null;
                    monthReady = undefined;
                    zReady = undefined;
                };

                resetParse.call(this);

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
                    return number !== null ? (zReady ? number : (txt !== null ? txt + number : number)) : (txt !== null ? txt : null);
                }

                var i;

                function timeSet() {
                    if (this.year && number <= 59) {
                        monthReady = monthReady || dString.charAt(i) === '-';
                        if (!monthReady) {
                            if (this.month) {
                                if (this.dayOfMonth || this.hour) {
                                    if (this.hour) {
                                        if (this.minutes) {
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
                                // Probably just text
                            }
                        } else {
                            this.setMonth(value());
                            monthReady = false;
                        }
                    } else if (this.hour) {
                        this.setMinutes(value());
                    } else {
                        this.setYear(era * number);
                        monthReady = true;
                    }
                    number = null;
                }

                function parseEnd() {
                    if (value()) {
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
                            if (number === null) {
                                number = digit * era;
                            } else {
                                number = number * 10 + digit;
                            }
                            break;
                        case '-':
                            if (!txt) {
                                if (number === null) {
                                    era = -1;
                                }
                                this.setHour(null);  // Next value cannot be minutes
                                timeSet.call(this); // End of year or month
                            } else {
                                txt = txt ? txt + c : c;
                            }
                            break;
                        case 's':
                            if (number !== null && txt.charAt(i - 1) !== ' ') {
                                this.decade = true;
                            } else {
                                txt = txt ? txt + c : c;
                            }
                            break;
                        case '+':
                            era = 1;
                            break;
                        case '~':
                            this.approx = true;
                            break;
                        case ':':
                            if (this.hour !== null && zReady) {
                                this.setTimeZone(number * era);
                            } else {
                                this.setHour(value());
                                zReady = true;
                            }
                            number = null;
                            break;
                        case 'T':
                            var hourNumber = !isNaN(dString.charAt(i + 1));
                        case ' ':
                            if (!hourNumber && (txt || zReady)) {
                                txt = txt ? txt + c : c;
                            } else {
                                timeSet.call(this); // End of date
                            }
                            break;
                        case '/':
                            parseEnd.call(this);
                            this.startDate = org.clone(this);
                            org.rr0.context.time = this.startDate;
                            resetParse.call(this);
                            break;
                        default:
                            if (digit) {
                                txt = txt ? txt + digit : digit;
                                number = null;
                                digit = null;
                            }
                            txt = txt ? txt + c : c;
                    }
                }
                parseEnd.call(this);
                return this;
            }

            toISOString() {
                var s = this.year;
                if (this.month) {
                    s += '-' + commonsService.zero(this.month);
                }
                if (this.dayOfMonth) {
                    s += '-' + commonsService.zero(this.dayOfMonth);
                }
                if (this.hour) {
                    s += 'T' + commonsService.zero(this.hour) + ":" + commonsService.zero(this.minutes);
                }
                return s;
            }
        }

        function setHour(h) {
            if (h) {
                timeModuleThis.getTime().hour = h;
            }
        }

        function setMinutes(mn) {
            if (mn) {
                timeModuleThis.getTime().minutes = mn;
            }
        }

        function getHour() {
            return timeModuleThis.getTime().hour;
        }

        function addYear(y, yLink, t) {
            var s = "";
            if (!y) {
                y = thisService.getTime().year;
            }
            if (!yLink) {
                yLink = thisService.yearLink(y);
            }
            if (!t) {
                var p = getPeople();
                if (p) {
                    t = p.toString();
                    if (p.born) t += " a " + (y - p.born.getFullYear()) + " ans";
                    else t = "Naissance de " + t;
                }
            }
            if (y) {
                s += org.link(yLink, y, t);
            }
            return s;
        }

        var dayOfWeekNames = {
            "fr": ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
            "en": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        };

        var paramLang = function (lang) {
            return (!lang) ? org.rr0.context.language : lang;
        };

        org.rr0.context.time = new Moment();

        var chart;

        return {
            /*getTimes: function () {
                if (typeof google !== 'undefined' && typeof google.visualization !== 'undefined' && !times) {
                    times = createTimesData();
                }
                return times;
            },*/
            chartZone: null,
            setChartsHeight: function (h) {
                this.chartZone.style.height = h + '%';
                org.rr0.getSideZone("map-canvas").style.height = (100 - h) + '%';
            },
            /*drawChart: function () {
                if (times) {
                    var options = {
                        'title': "Heures d'observation",
                        'width': this.chartZone.offsetWidth,
                        'height': this.chartZone.offsetHeight - document.getElementById("head").offsetHeight,
                        legend: {position: 'none'}
                    };
                    chart.draw(times, options);
                } else {
                    self.setChartsHeight(0);
                }
            },*/
            NewDuration: function () {
                return new Duration();
            },
            NewMoment: function () {
                return new Moment();
            },
            getDate: function (y, m, d) {
                var dat;
                if (!y) {
                    y = this.getYear();
                }
                if (y) {                    // No getTime().year set means no date set
                    dat = new Date();
                    dat.setFullYear(y);
                    if (!m) {
                        m = this.getMonth();
                    }
                    if (m) {
                        dat.setMonth(m - 1);
                    }
                    if (!d) {
                        d = this.getDayOfMonth();
                    }
                    dat.setDate(d);
                }
                return dat;
            },
            getTime: function () {
                return org.rr0.context.time;
            },
            getMonth: function () {
                return this.getTime().month;
            },
            addMonth: function (m) {
                var s = "";
                var t = this.getTime();
                if (m) {
                    t.month = m;
                }
                if (t.month) {
                    s += this.monthName();
                }
                return s;
            },
            /**
             *
             * @param d
             * @param dow Day of week
             * @returns {string}
             */
            addDayOfMonth: function (d, dow) {
                var s = "";
                var t = this.getTime();
                if (!d) {
                    d = t.dayOfMonth;
                }
                if (d) {
                    var dayName = this.dayOfWeekNam(this.getDayOfWeek(t.year, t.month, d));
                    s += dayName + " ";
                    s += (d === 1 ? "1<sup>er</sup>" : d);
                }
                return s;
            },
            addDate: function (p, y, m, d) {
                if (!y) {
                    y = this.getTime().year;
                }
                var s = "";
                if (y) {
                    if (!m) {
                        m = this.getMonth();
                    }
                    if (!d) {
                        d = this.getTime().dayOfMonth;
                    }
                    var newDate = new Date();
                    newDate.setFullYear(y);
                    var dateLink = this.yearLink(y);
                    if (m) {
                        newDate.setMonth(m);
                        dateLink += "/" + org.zero(m);
                        if (d) {
                            newDate.setDate(d);
//                s = "le ";
                            s += this.addDayOfMonth(d);
                            dateLink += "/" + org.zero(d);
                        } else {
//                s = "en ";
                        }
                        s += " " + this.addMonth(m);
                    } else {
//            s += "en ";
                    }
                    var t = null;
                    s += " " + addYear(y, dateLink, t);
                }
                return s;
            },
            monthNames: {
                "fr": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                "en": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            },
            /*            getTime: function () {
             return addDate();
             },*/
            monthName: function (m) {
                var t = this.getTime();
                if (!m && t.month) {
                    m = t.month;
                }
                return this.monthNam(m - 1);
            },
            monthNam: function (m, lang) {
                return this.monthNames[paramLang(lang)][m];
            },
            /**
             * Builds a address to link to a year page/directory.
             *
             * @param y The year
             * @param decade if the year (such as "1950") is to be understood as a decade (1950s).
             * @returns {string} The link
             */
            yearLink: function (y, decade) {
                var yString = y.toString();
                var yLink = timeRoot;
                var pos = 0;
                yLink += (y < 1000 ? "0" : yString.substring(pos, ++pos)) + "/";
                yLink += (y < 100 ? "0" : yString.substring(pos, ++pos)) + "/";
                yLink += (y < 10 ? "0" : yString.substring(pos, ++pos)) + "/";
                if (!decade) {
                    yLink += yString.substring(pos, ++pos);
                }
                return yLink;
            },
            dayOfWeekNam: function (d, lang) {
                return dayOfWeekNames[paramLang(lang)][d];
            },
            getDayOfWeek: function (y, m, d) {
                return this.getDate(y, m, d).getDay();
            },
            getDayOfMonth: function () {
                return this.getTime().dayOfMonth;
            },
            setYear: function (y) {
                if (y) {
                    this.getTime().year = y;
                }
            },
            isTimeURL: function (u) {
                if (!u) {
                    u = commonsService.getUri();
                }
                return u.indexOf(timeRoot) === 0;
            },
            getYear: function () {
                var t = this.getTime();
                if (!t.year) {
                    var u = commonsService.getUri();
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
                                } else if (!t.month) {
                                    t.month = parseInt(v, 10);
                                } else if (!t.dayOfMonth) {
                                    t.dayOfMonth = parseInt(v, 10);
                                }
                            } else
                                break;
                        }
                    }
                }
                return t.year;
            },
            setMonth: function (m) {
                if (m) {
                    this.getTime().setMonth(m);
                }
            },
            setDayOfMonth: function (d) {
                if (d) {
                    var t = this.getTime();
                    t.dayOfMonth = d;
                    t.hour = null;
                    t.minutes = null;
                }
            },
            toString: function (contextTime, time) {
                var timeLink;
                var repYear;
                var titYear;
                var repMonth;
                var titMonth;
                var repDay;
                var titDay;
                var repHour;
                var self = this;
                var y = time.getYear();
                var otherYear;
                if (y) {
                    otherYear = y !== contextTime.getYear();
                    timeLink = this.yearLink(y);
                    titYear = y;
                    if (otherYear) {
                        contextTime.setYear(y);
                        repYear = " " + y;
                    }
                }
                var otherMonth;
                var m = time.getMonth();
                if (m) {
                    titMonth = this.monthName(m);
                    timeLink += "/" + commonsService.zero(m);
                    otherMonth = otherYear || m !== contextTime.getMonth();
                    if (otherMonth) {
                        contextTime.setMonth(m);
                        repMonth = " " + titMonth;
                    }
                }
                var otherDay = 0;
                var d = time.getDayOfMonth();
                if (d) {
                    var dayAsNumber = parseInt(d, 10);
                    var dOW;
                    if (!!(dayAsNumber)) {
                        dOW = this.dayOfWeekNam(this.getDayOfWeek(y, m, d));
                        titDay = dOW + " " + d + (d === 1 ? "er" : "");
                        otherDay = otherMonth ? 30 : d - contextTime.getDayOfMonth();
                    } else {
                        titDay = d;
                        otherDay = 1;
                    }
                    if (otherDay !== 0) {
                        timeLink += "/" + commonsService.zero(d);
                        repDay = titDay;
                        if (!this.isTimeURL() && contextTime.getDayOfMonth()) {
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
                                        repDay = otherDay < 0 ? dOW + " pr\xE9c\xE9dent" : dOW + " suivant";
                                    }
                            }
                        }
                        contextTime.setDayOfMonth(d);
                    }
                }
                var titHour;
                var h = time.getHour();
                var otherHour;

                function registerTimeToDraw(updatedHour) {
          /*          var timesToUpdate = self.getTimes();
                    if (timesToUpdate) {
                        self.setChartsHeight(30);
                        for (var i = 0; i < timesToUpdate.getNumberOfRows(); i++) {
                            var iteratedHour = timesToUpdate.getValue(i, 0);
                            if (iteratedHour === updatedHour) {
                                var countForThatHour = timesToUpdate.getValue(i, 1);
                                countForThatHour++;
                                timesToUpdate.setValue(i, 1, countForThatHour);
                                break;
                            }
                        }
                    }*/
                }

                function handleHour() {
                    var hourAsNumber = parseInt(h, 10);
                    if (!!(hourAsNumber)) {
                        titHour = commonsService.zero(h);
                    } else {
                        titHour = h;
                        otherHour = true;
                    }
                    if (h) {
                        registerTimeToDraw(h);
                    }
                    otherHour = otherHour || otherDay || h !== contextTime.getHour();
                    if (d) {
                        titHour = (time.isApprox() ? 'vers' : '\xE0') + ' ' + titHour;
                    }
                    if (otherHour) {
                        contextTime.setHour(h);
                    }// TODO: else manage to display "30 mn later"
                    repHour = titHour;  // For now, always display hours, even if unchanged
                }

                if (h) {
                    handleHour();
                }
                var mn = time.getMinutes();
                if (mn) {
                    var th = ':' + commonsService.zero(mn);
                    titHour += th;
                    var otherMinutes = otherHour || mn !== contextTime.getMinutes();
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
//                    replacement = "m\xEAme jour";
//                }
//            }
                if (titDay) {
                    title += titDay;
                }
                if (repMonth) {
                    replacement += repMonth;
                }
                if (titMonth) {
                    title += " " + titMonth;
                }
                if (repYear) {
                    replacement += repYear;
                }
                if (titYear) {
                    title += " " + titYear;
                }
                if (repHour) {
                    replacement += " " + repHour;
                }
                if (titHour) {
                    title += ", " + titHour;
                }
                if (titZ) {
                    title += " " + titZ;
                }
                if (time.startDate) {
                    var start = self.toString(time, time.startDate).replacement;
                    var end = replacement;
                    var betweenWord = repDay ? 'au' : '\xE0';
                    replacement = start + ' ' + betweenWord + ' ' + end;
                    title = start + ' ' + betweenWord + ' ' + title;
                }
                return {
                    "replacement": replacement,
                    "timeLink": timeLink,
                    "title": title
                };
            }
        };
    }])
    .run(['timeRoot', 'commonsService', 'netService', 'navigationService', 'timeService', 'peopleService', 'constantClass', function (commonsService, timeRoot, netService, navigationService, timeService, peopleService, constantClass) {
        'use strict';
        navigationService.addStart({
                dir: timeRoot,
                label: "<span class='iconic clock'> <span class='label'>Historique</span></span>",
                title: "Historique"
            }
        );

        var today = new Date();

        function handleListItem(e) {
            var uls = e.getElementsByTagName("UL");
            if (!org.hasClass(e, constantClass) && uls.length > 0) {
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

        var timeTextHandler = function (e) {
            if (timeService.isTimeURL() && e.tagName === "LI") {
                return handleListItem(e);
            }
            if (e.parentNode.tagName === "TIME") {
                return; // Handled by directive
            }
            var txt = org.textValue(e);
            var parentNode = e.parentNode;

            /**
             *
             * @param w
             * @return {*} January = 1
             */
            function monthIndex(w) {
                return org.arrayIndex(w, timeService.monthNames[org.rr0.context.language]);
            }

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

            function affectsContext(e) {
                return !org.hasClass(e.parentNode, "source") && !org.hasClass(e.parentNode, "note");
            }

            function regexFound(foundExprs) {
                var toReplace = foundExprs[0];
                var s;
                if (txt.substring(0, 1) === '-') {
                    s = toReplace;
                } else {
                    s = toReplace.split('-');
                }
                var y = s[0];
                if (org.isNumber(y) && y <= today.getFullYear()) {
                    var wBefore = org.wordBefore(txt, foundExprs.index).toLowerCase();
                    var mIndexBefore = monthIndex(wBefore);
                    var isPreYearWord = preYearWord(wBefore);
                    var isPreMonthWord = preMonthWord(wBefore);
                    var isPreDayWord = preDayWord(wBefore);
                    if (wBefore === "" || mIndexBefore || isPreYearWord || isPreMonthWord || isPreDayWord) {
                        var wAfter;
                        var nextChar;
                        if (!mIndexBefore) {
                            var nextPos = foundExprs.index + y.length;
                            wAfter = org.wordAfter(txt, nextPos);
                            nextChar = txt.charAt(nextPos);
                        }
                        if (parentNode) {
                            if (mIndexBefore || wAfter === "" || org.isProNoun(wAfter) || !(org.isPlural(wAfter) && !org.isProperName(wAfter)) && !org.arrayIndex(wAfter, units) && !monthIndex(wAfter)) {     // Plural on a sibling noun means count rather than getTime().year
                                var affectsCtx = affectsContext(e);
                                if (affectsCtx) {
                                    timeService.setYear(y);
                                }
                                if (org.wordBefore(txt, foundExprs.index - wBefore.length) === "naît") {
                                    peopleService.getPeople().born = y;
                                }
                                var title = parentNode.title;
                                var first;
                                if (title) {
                                    var dash = title.indexOf('-');
                                    first = dash > 0 ? title.substring(0, dash) : title;
                                    if (first < y) {
                                        first += '-';
                                    } else {
                                        y = first;
                                        first = "";
                                    }
                                } else {
                                    first = "";
                                }
                                parentNode.title = first + timeService.getTime().year;
                                var peo = peopleService.getPeople();
                                if (peo) {
                                    var age = timeService.getTime().year - peo.born;
                                    if (age > 0) {
                                        parentNode.title += " : " + peo.lastName + " a " + age + " ans";
                                    }
                                }
                                var decade = nextChar === 's';      // Decade quoted as "1940s" for example
                                var replacement = toReplace;
                                var dateLink;
                                if (mIndexBefore) {
                                    dateLink = timeService.yearLink(y) + "/" + commonsService.zero(mIndexBefore);
                                } else {
                                    dateLink = timeService.yearLink(y, decade);
                                    if (s.length > 1 && s.length <= 3) {
                                        mIndexBefore = parseInt(s[1], 10);
                                        if (affectsCtx) {
                                            timeService.setMonth(mIndexBefore);
                                        }
                                        dateLink += "/" + commonsService.zero(mIndexBefore);
                                        replacement = timeService.monthName(mIndexBefore) + " " + y;
                                        if (s.length > 2) {
                                            var jIndex = parseInt(s[2], 10);
                                            if (affectsCtx) {
                                                timeService.setDayOfMonth(jIndex);
                                            }
                                            dateLink += "/" + commonsService.zero(jIndex);
                                            replacement = timeService.dayOfWeekNam(timeService.getDayOfWeek(y, mIndexBefore, jIndex)) + " " + jIndex + (jIndex === 1 ? "er" : "") + " " + replacement;
                                        }
                                    }
                                }
                                netService.checkedLink(e, toReplace, dateLink, replacement, true);
                            }
                        }
                    }
                }
            }

            var dateRegex = /(-)?[1-9]\d{3}(-\d{1,2}(-\d{1,2})?)?/g;

            if (txt) {
                var foundExprs;
                while ((foundExprs = dateRegex.exec(txt)) !== null) {
                    regexFound(foundExprs);
                }
            }
            return false;
        };

        var times;

/*        function createTimesData() {
            times = new google.visualization.DataTable();
            times.addColumn('string', 'Heure');
            times.addColumn('number');
            for (var i = 0; i < 24; i++) {
                times.addRow([i + "", 0]);
            }
            return times;
        }
*/
        function parseForTimes() {
            org.nounToLink(timeRoot + "Vagues.html", "vague");
            org.nounToLink(timeRoot + "pluies", "pluie");

            org.handleTags.apply(this, [timeTextHandler]);
        }

        var onGoogleChartsLoaded = [/*createTimesData, */parseForTimes];

        function initGoogleCharts(chartsApiLoaded) {
            google.load('visualization', '1.0', {
                'packages': ['corechart'],
                callback: chartsApiLoaded
            });
        }

        /*if (typeof google !== 'undefined') {
            initGoogleCharts(function () {
                timeService.chartZone = org.rr0.getSideZone("chart");
                var chart = new google.visualization.ColumnChart(timeService.chartZone);
                org.rr0.sideCallbacks = org.rr0.sideCallbacks.concat([timeService.drawChart]);

                for (var i = 0; i < onGoogleChartsLoaded.length; i++) {
                    onGoogleChartsLoaded[i]();
                }
            });
        } else {
            console.warn("Google API is not loaded");
        }*/
    }])
    .directive('time', ['netService', 'timeService', function (netService, timeService) {
        'use strict';
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                var txt = elem.text();

                var currentTime = timeService.getTime();

                var decodedTime = new timeService.NewMoment();
                decodedTime.year = currentTime.getYear();
                decodedTime.month = currentTime.getMonth();
                decodedTime.dayOfMonth = currentTime.getDayOfMonth();
                decodedTime.hour = currentTime.getHour();
                decodedTime.minutes = currentTime.getMinutes();

                var r;
                var e = elem[0];
                var datetime;
                var dataStr;
                if (attrs.datetime) {
                    datetime = attrs.datetime;
                    dataStr = datetime;
                } else {
                    dataStr = txt;
                }
                function handleDuration() {
                    var durationStr;
                    var durationMax;
                    var slashPos = dataStr.indexOf('/');
                    if (slashPos > 0) {
                        var maxString = dataStr.substring(slashPos + 1);
                        if (maxString.charAt(0) !== 'P') {
                            maxString = 'P' + maxString;
                        }
                        var durMax = timeService.NewDuration();
                        durationMax = durMax.fromString(maxString).toString();
                        var durationMin = timeService.NewDuration().fromString(dataStr).toString(durMax.unit.name);
                        durationStr = durationMin + " \xE0 " + durationMax;
                    } else {
                        durationStr = timeService.NewDuration().fromString(dataStr).toString();
                    }
                    r = {
                        replacement: durationStr
                    };
                    if (!datetime) {
                        e.setAttribute("datetime", dataStr);
                    }
                    e.innerHTML = r.replacement;
                    elem.addClass('duration');
                }

                function handleTime() {
                    decodedTime.fromString(dataStr);
                    r = timeService.toString(currentTime, decodedTime);
                    dataStr = decodedTime.toISOString();
                    netService.checkedLink(e, txt, r.timeLink, r.replacement, false, r.title);
                    if (!datetime) {
                        e.setAttribute("datetime", dataStr);
                    }
                }

                if (dataStr.charAt(0) === 'P') {
                    handleDuration();
                } else {
                    handleTime();
                }
            }
        };
    }]);
