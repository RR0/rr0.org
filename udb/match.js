class CriterionMatcher {
  constructor(type, prop, value) {
    this.type = type
    this.prop = prop
    this.value = value
  }

  getType() {
    return this.type
  }
}

class EqualMatcher extends CriterionMatcher {
  constructor(type, prop, value) {
    super(type, prop, value)
  }

  match(record) {
    return record[this.prop] == this.value
  }
}

class NotEqualMatcher extends CriterionMatcher {
  constructor(type, prop, value) {
    super(type, prop, value)
  }

  match(record) {
    return record[this.prop] != this.value
  }
}

class AboveMatcher extends CriterionMatcher {
  constructor(type, prop, value) {
    super(type, prop, value)
  }

  match(record) {
    return record[this.prop] > this.value
  }
}

class BelowMatcher extends CriterionMatcher {
  constructor(type, prop, value) {
    super(type, prop, value)
  }

  match(record) {
    return record[this.prop] < this.value
  }
}

class BelowOrEqualMatcher extends CriterionMatcher {
  constructor(type, prop, value) {
    super(type, prop, value)
  }

  match(record) {
    return record[this.prop] <= this.value
  }
}

class AboveOrEqualMatcher extends CriterionMatcher {
  constructor(type, prop, value) {
    super(type, prop, value)
  }

  match(record) {
    return record[this.prop] >= this.value
  }
}

const operators = {
  "<>": NotEqualMatcher,
  "!=": NotEqualMatcher,
  ">=": BelowOrEqualMatcher,
  "<=": BelowOrEqualMatcher,
  "=": EqualMatcher,
  ">": AboveMatcher,
  "<": BelowMatcher
}

export class MatchError extends Error {
  constructor(msg) {
    super(msg)
    Object.setPrototypeOf(this, MatchError.prototype)
  }
}

export class RecordMatcher {
  constructor(criteria = "", allowEmpty = true) {
    this.criteria = criteria
    this.allowEmpty = allowEmpty
    this.matchers = []
    const andCriterions = criteria.split("&")
    for (let a = 0; a < andCriterions.length; ++a) {
      let type = "and"
      const andCriterion = andCriterions[a]
      let orCriterions = andCriterion.split("|")
      for (let o = 0; o < orCriterions.length; ++o) {
        const orCriterion = orCriterions[o]
        let matcher
        for (let operator in operators) {
          let operands = orCriterion.split(operator)
          if (operands.length <= 1) {
            continue
          }
          matcher = new operators[operator](type, operands[0], operands[1])
          type = "or"
          this.matchers.push(matcher)
          break
        }
        if (!allowEmpty && !matcher) {
          throw new MatchError(`Expected some expression with operators ${Object.keys(operators)}`)
        }
      }
    }
  }

  matches(record) {
    let type
    let result = true
    for (let i = 0; i < this.matchers.length; ++i) {
      let matcher = this.matchers[i]
      let matched = matcher.match(record)
      type = matcher.getType()
      switch (matcher.getType()) {
        case "or":
          result = result || matched
          break
        case "and":
        default:
          result = result && matched
      }
    }
    return result
  }
}

//# sourceMappingURL=match.js.map
