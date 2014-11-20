angular.module('rr0')
    .service('resourceBundleService', ['$log', '$q', '$rootScope', '$http', function ($log, $q, $rootScope, $http) {
        var uri = 'http://rr0.org/time/1/9/7/7/Poher_Matrice/';
        var bundleName = 'Matrix';
        var localeFile = uri + bundleName + '_' + userLang + '.json';
        var loaded = $q.defer();
        $http({method: 'GET', url: localeFile}).
            success(function (data, status, headers, config) {
                $log.info("Loaded '" + localeFile + "'");
                loaded.resolve(data);
            }).
            error(function (data, status, headers, config) {
                loaded.reject("Could not load '" + localeFile + "': " + status);
            });
        return loaded.promise;
    }]).service('matrixService', ['$log', '$rootScope', '$http', 'resourceBundleService', function ($log, $rootScope, $http, resourceBundleService) {

        function Question(t, i) {
            this.title = t;
            this.choices = {};
            this.index = i;
        }

        var questions = {};

        function Choice(l, a, knownPhenomenaProbabilities) {
            this.label = l;
            this.answerType = a;
            this.knownPhenomenaProbabilities = knownPhenomenaProbabilities;
            this.value = false;
        }

        var matrixDataFile = 'http://rr0.org/time/1/9/7/7/Poher_Matrice/matrix.json';
        var msg;
        $http({method: 'GET', url: matrixDataFile}).
            success(function (data, status, headers, config) {
                $log.info("Loaded '" + matrixDataFile + "'");

                resourceBundleService.then(function (messages) {
                    msg = messages;
                    var i = 0;
                    for (var d in data) {
                        if (data.hasOwnProperty(d)) {
                            var item = data[d];
                            var dotPos = item.question.indexOf('.');
                            var questionKey = item.question.substring(0, dotPos);
                            var choiceKey = item.question.substring(dotPos + 1);
                            var question = questions[questionKey];
                            if (!question) {
                                question = new Question(messages[questionKey], i++);
                                questions[questionKey] = question;
                            }
                            question.choices[choiceKey] = new Choice(messages[item.question], item.answertype, item.knownPhenomenaProbabilities);
                        }
                    }
                    $rootScope.$broadcast("dataLoaded", questions);
                }, function (reason) {
                    $log.error(reason);
                });
            }).
            error(function (data, status, headers, config) {
                $log.info("Could not load '" + matrixDataFile + "': " + status);
            });
        return {
            compute: function (probable) {
                var zerosCount = {};
                var max = 0;
                for (var q in questions) {
                    if (questions.hasOwnProperty(q)) {
                        var question = questions[q];
                        for (var c in question.choices) {
                            if (question.choices.hasOwnProperty(c)) {
                                var choice = question.choices[c];
                                if (choice.value !== false) {
                                    var knownPhenomenaProbabilities = choice.knownPhenomenaProbabilities;
                                    for (var p in knownPhenomenaProbabilities) {
                                        if (knownPhenomenaProbabilities.hasOwnProperty(p)) {
                                            if (!zerosCount[p]) {
                                                zerosCount[p] = 0;
                                            }
                                            if (knownPhenomenaProbabilities[p] === 0) {
                                                zerosCount[p]++;
                                                if (zerosCount[p] > max) {
                                                    max = zerosCount[p];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var explanations = [];
                for (var z in zerosCount) {
                    if (zerosCount.hasOwnProperty(z)) {
                        var count = zerosCount[z];
                        var index = probable ? max - count : count;
                        var trad = msg[z];
                        if (explanations[index]) {
                            explanations[index] += ", " + trad;
                        } else {
                            explanations[index] = trad.charAt(0).toUpperCase() + trad.slice(1);
                        }
                    }
                }
                var explanationsWithoutHoles = [];
                for (var i = 0; i < explanations.length; i++) {
                    if (explanations[i]) {
                        explanationsWithoutHoles.push(explanations[i]);
                    }
                }
                return explanationsWithoutHoles;
            }
        };
    }]).controller('matrixFormCtrl', ['$log', '$scope', 'matrixService', function ($log, $scope, matrixService) {

        $scope.questionIndex = 0;

        $scope.parameterChanged = function () {
            $scope.questionIndex = $scope.currentQuestion.index;
            questionChanged();
        };
        function questionChanged() {
            $scope.currentQuestion = $scope.questions[$scope.questionsKeys[$scope.questionIndex]];
            function Field(type, label) {
                this.type = type;
                this.label = label;
            }

            $scope.fields = {};
            var choices = $scope.currentQuestion.choices;
            var keys = Object.keys(choices);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                $scope.fields[key] = new Field(choices[key].answerType, choices[key].label);
            }
        }

        $scope.$on("dataLoaded", function (event, questions) {
            $scope.questions = questions;
            $scope.questionsKeys = Object.keys(questions);
            questionChanged();
        });
        $scope.onPrevious = function () {
            if ($scope.questionIndex >= 0) {
                $scope.questionIndex--;
                questionChanged();
            }
        };
        $scope.onNext = function () {
            if ($scope.questionIndex < $scope.questionsKeys.length) {
                $scope.questionIndex++;
                questionChanged();
            }
        };
        $scope.resultsType = "NonProbable";
        var explanationsZone = document.getElementById("explanations");
        $scope.compute = function (key) {
            var changedChoice = $scope.currentQuestion.choices[key];
            if (changedChoice && changedChoice.answerType === 'radio') {
                for (var c in $scope.currentQuestion.choices) {
                    if ($scope.currentQuestion.choices.hasOwnProperty(c)) {
                        var choice = $scope.currentQuestion.choices[c];
                        if (choice.answerType === 'radio') {
                            choice.value = c === key ? key : false;
                        }
                    }
                }
            }
            $scope.explanations = matrixService.compute($scope.resultsType === "NonProbable");
            if (org.debug) {
                org.walkIt(explanationsZone);
            }
        };
    }]);