angular.module('rr0.time', ['rr0.nav', 'rr0.net', 'rr0.people'])
    .constant('timeRoot', '/time/')
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
            commonsService.nounToLink(timeRoot + "Vagues.html", "vague");
            commonsService.nounToLink(timeRoot + "pluies", "pluie");

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
    }]);
