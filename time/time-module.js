angular.module('rr0.time', [])
    .service('timeService', [function () {
        return {
            getTime: function () {
                return org.rr0.time.addDate();
            }
        };
    }])
    .run(function () {
        starts.push({
                dir: org.rr0.time.uriPart,
                label: "<span class='iconic clock'></span>",
                title: "Historique"
            }
        );
        function parseForTimes() {
            org.nounToLink(org.rr0.time.uriPart + "Vagues.html", "vague");
            org.nounToLink(org.rr0.time.uriPart + "pluies", "pluie");

            org.handleTags.apply(this, [org.rr0.time.timeTextHandler]);
        }

        var onGoogleChartsLoaded = [parseForTimes];

        function initGoogleCharts(chartsApiLoaded) {
            google.load('visualization', '1.0', {
                'packages': ['corechart'],
                callback: chartsApiLoaded
            });
        }

        if (typeof google !== 'undefined') {
            initGoogleCharts(function () {
                console.info("rr0timerun8");
                org.rr0.time.chartZone = org.rr0.getSideZone("chart");
                org.rr0.time.setChartsHeight(30);
                var chart = new google.visualization.ColumnChart(org.rr0.time.chartZone);
                org.rr0.sideCallbacks = org.rr0.sideCallbacks.concat([org.rr0.time.drawChart]);

                for (var i = 0; i < onGoogleChartsLoaded.length; i++) {
                    onGoogleChartsLoaded[i]();
                }
            });
        } else {
            console.warn("Google API is not loaded");
        }
    })
    .directive('time', function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                var txt = elem.text();

                var currentTime = org.rr0.time.getTime();

                var decodedTime = new org.rr0.time.NewMoment();
                decodedTime.year = currentTime.getYear();
                decodedTime.month = currentTime.getMonth();
                decodedTime.dayOfMonth = currentTime.getDayOfMonth();
                decodedTime.hour = currentTime.getHour();
                decodedTime.minutes = currentTime.getMinutes();

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
                        timeLink += "/" + org.zero(m);
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
                            timeLink += "/" + org.zero(d);
                            repDay = titDay;
                            if (!org.rr0.time.isTimeURL() && contextTime.getDayOfMonth()) {
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
                                            repDay = otherDay < 0 ? dOW + " précédent" : dOW + " suivant";
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
                            titHour = org.zero(h);
                        } else {
                            titHour = h;
                            otherHour = true;
                        }
//                var o;
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
                        if (d) {
                            titHour = (time.isApprox() ? 'vers' : 'à') + ' ' + titHour;
                        }
                        if (otherHour) {
                            contextTime.setHour(h);
                        }// TODO: else manage to display "30 mn later"
                        repHour = titHour;  // For now, always display hours, even if unchanged
                    }
                    var mn = time.getMinutes();
                    if (mn != null) {
                        var th = ':' + org.zero(mn);
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
                    return {
                        "replacement": replacement,
                        "timeLink": timeLink,
                        "title": title
                    };
                }

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
                        if (maxString.charAt(0) != 'P') maxString = 'P' + maxString;
                        var durMax = new org.rr0.time.Duration();
                        durationMax = durMax.fromString(maxString).toString();
                        var durationMin = new org.rr0.time.Duration().fromString(dataStr).toString(durMax.unit.name);
                        durationStr = durationMin + " à " + durationMax;
                    } else {
                        durationStr = new org.rr0.time.Duration().fromString(dataStr).toString();
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
                    r = toString(currentTime, decodedTime);
                    dataStr = decodedTime.toISOString();
                    org.rr0.net.checkedLink(e, txt, r.timeLink, r.replacement, false, r.title);
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
        }
    });
