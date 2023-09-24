"use strict"
angular.module("rr0").service("matrixService", ["$log", "$q", "$rootScope", "$http", function ($log, $q, $rootScope, $http) {
  "use strict"

  function Question(t, i) {
    this.title = t
    this.choices = {}
    this.index = i
  }

  var self = this

  function Choice(l, a, knownPhenomenaProbabilities) {
    this.label = l
    this.answerType = a
    this.knownPhenomenaProbabilities = knownPhenomenaProbabilities
    this.value = false
  }

  function loadURL(u) {
    return $q(function (resolve, reject) {
      $http({
        method: "GET",
        url: u
      }).success(function (labelsData, status, headers, config) {
        $log.info("Loaded '" + u + "'")
        resolve(labelsData)
      }).error(function (data, status, headers, config) {
        reject("Could not load '" + u + "': " + status)
      })
    })
  }

  function loadFile(f) {
    return $q(function (resolve, reject) {
      var matrixFileReader = new FileReader()
      matrixFileReader.onloadend = function (e) {
        try {
          var matrixData = JSON.parse(e.target.result)
          resolve(matrixData)
        } catch (err) {
          reject(err)
        }
      }
      matrixFileReader.readAsText(f)
    })
  }

  function loadLabels(labelsInput) {
    return typeof labelsInput === "object" ? loadFile(labelsInput) : loadURL(labelsInput)
  }

  function loadMatrixData(matrixData, labelsInput) {
    loadLabels(labelsInput).then(function (messages) {
      msg = messages
      var i = 0
      var questions = self.questions = {}
      for (var d in matrixData) {
        if (matrixData.hasOwnProperty(d)) {
          var item = matrixData[d]
          var dotPos = item.question.indexOf(".")
          var questionKey = item.question.substring(0, dotPos)
          var choiceKey = item.question.substring(dotPos + 1)
          var question = questions[questionKey]
          if (!question) {
            question = new Question(messages[questionKey], i++)
            questions[questionKey] = question
          }
          question.choices[choiceKey] = new Choice(messages[item.question], item.answertype, item.knownPhenomenaProbabilities)
        }
      }
      $rootScope.$broadcast("dataLoaded", questions)
    }, function (reason) {
      $log.error(reason)
      $rootScope.$broadcast("dataError", reason)
    })
  }

  var msg
  return {
    load: function (matrixInput, labelsInput) {
      if (typeof matrixInput === "object") {
        loadFile(matrixInput).then(function (matrixData) {
          loadMatrixData(matrixData, labelsInput)
        }, function (reason) {
          $rootScope.$broadcast("dataError", reason)
        })
      } else {
        loadURL(matrixInput).then(function (matrixData) {
          loadMatrixData(matrixData, labelsInput)
        }, function (reason) {
          $rootScope.$broadcast("dataError", reason)
        })
      }
    },
    compute: function (probable) {
      var zerosCount = {}
      var max = 0
      var questions = self.questions
      for (var q in questions) {
        if (questions.hasOwnProperty(q)) {
          var question = questions[q]
          for (var c in question.choices) {
            if (question.choices.hasOwnProperty(c)) {
              var choice = question.choices[c]
              if (choice.value !== false) {
                var knownPhenomenaProbabilities = choice.knownPhenomenaProbabilities
                for (var p in knownPhenomenaProbabilities) {
                  if (knownPhenomenaProbabilities.hasOwnProperty(p)) {
                    if (!zerosCount[p]) {
                      zerosCount[p] = 0
                    }
                    if (knownPhenomenaProbabilities[p] === 0) {
                      zerosCount[p]++
                      if (zerosCount[p] > max) {
                        max = zerosCount[p]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      var explanations = []
      for (var z in zerosCount) {
        if (zerosCount.hasOwnProperty(z)) {
          var count = zerosCount[z]
          var index = probable ? max - count : count
          var trad = msg[z]
          if (explanations[index]) {
            explanations[index] += ", " + trad
          } else {
            explanations[index] = trad.charAt(0).toUpperCase() + trad.slice(1)
          }
        }
      }
      var explanationsWithoutHoles = []
      for (var i = 0; i < explanations.length; i++) {
        if (explanations[i]) {
          explanationsWithoutHoles.push(explanations[i])
        }
      }
      return explanationsWithoutHoles
    }
  }
}]).controller("MatrixFormController", ["$log", "$scope", "matrixService", function ($log, $scope, matrixService) {
  "use strict"
  $scope.load = function () {
    var matrixInput = document.getElementById("matrixFile").files[0] || $scope.matrixURL
    var labelsInput = document.getElementById("labelsFile").files[0] || $scope.labelsURL
    if (matrixInput && labelsInput) {
      $scope.questions = []
      matrixService.load(matrixInput, labelsInput)
    }
  }
  $scope.questionIndex = 0
  $scope.parameterChanged = function () {
    $scope.questionIndex = $scope.currentQuestion.index
    questionChanged()
  }

  function questionChanged() {
    $scope.currentQuestion = $scope.questions[$scope.questionsKeys[$scope.questionIndex]]

    function Field(type, label) {
      this.type = type
      this.label = label
    }

    $scope.fields = {}
    var choices = $scope.currentQuestion.choices
    var keys = Object.keys(choices)
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      $scope.fields[key] = new Field(choices[key].answerType, choices[key].label)
    }
  }

  $scope.$on("dataError", function (event, msg) {
    $log.error(msg)
    window.alert(msg)
  })
  $scope.$on("dataLoaded", function (event, questions) {
    $scope.questions = questions
    $scope.questionsKeys = Object.keys(questions)
    questionChanged()
  })
  $scope.onPrevious = function () {
    if ($scope.questionIndex >= 0) {
      $scope.questionIndex--
      questionChanged()
    }
  }
  $scope.onNext = function () {
    if ($scope.questionIndex < $scope.questionsKeys.length) {
      $scope.questionIndex++
      questionChanged()
    }
  }
  $scope.resultsType = "NonProbable"
  $scope.compute = function (key) {
    var changedChoice = $scope.currentQuestion.choices[key]
    if (changedChoice && changedChoice.answerType === "radio") {
      for (var c in $scope.currentQuestion.choices) {
        if ($scope.currentQuestion.choices.hasOwnProperty(c)) {
          var choice = $scope.currentQuestion.choices[c]
          if (choice.answerType === "radio") {
            choice.value = c === key ? key : false
          }
        }
      }
    }
    $scope.explanations = matrixService.compute($scope.resultsType === "NonProbable")
  }
}])
//# sourceMappingURL=matrix.js.map
