angular.module('rr0.time')
    .directive('time', ['commonsService', 'netService', 'timeService', function (commonsService, netService, timeService) {
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
                    var previousSibling = elem[0].previousSibling;
                    if (r.replacement && (!previousSibling || previousSibling.textContent.trim().length === 0)) {
                        r.replacement = commonsService.capitalizeFirstLetter(r.replacement);
                    }
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