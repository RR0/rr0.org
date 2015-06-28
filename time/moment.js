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

  getSeconds() {
    return this.seconds;
  }

  getTimeZone() {
    return this.timeZone;
  }

  isApprox() {
    return this.approx;
  }

  fromString(dString) {
    var number;
    var hourNumber;
    var era;
    var txt;
    var monthReady;
    var zReady;

    var self = this;

    var resetParse = function () {
      this.clear();
      number = null;
      hourNumber = null;
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
      self.setTimeZone(z);
      txt = null;
    }

    function value() {
      return number !== null ? (zReady ? number : (txt !== null ? txt + number : number)) : (txt !== null ? txt : null);
    }

    var i;

    function timeSet() {
      var valueToSet = value();
      var valueIsNumber = typeof valueToSet === 'number';
      if (self.year && valueIsNumber && number <= 59) {
        monthReady = monthReady || dString.charAt(i) === '-';
        if (!monthReady) {
          if (self.month) {
            if (self.dayOfMonth || self.hour) {
              if (self.hour) {
                if (self.minutes) {
                  if (self.seconds) {
                    self.setDayOfMonth(valueToSet);     // setHour is processed after ':' only
                  } else {
                    self.setSeconds(valueToSet);
                  }
                } else {
                  self.setMinutes(valueToSet);
                }
              } else {
                self.setDayOfMonth(valueToSet);     // setHour is processed after ':' only
              }
            } else {
              self.setDayOfMonth(valueToSet);
            }
          } else {
            // Probably just text
          }
        } else {
          self.setMonth(valueToSet);
          monthReady = false;
        }
      } else if (self.minutes) {
        if (valueIsNumber) {
          self.setSeconds(valueToSet);
        }
      } else if (self.hour) {
        self.setMinutes(valueToSet);
      } else {
        self.setYear(era * number);
        monthReady = true;
      }
      number = null;
    }

    function parseEnd() {
      var val = value();
      if (val !== null && val !== undefined) {
        timeSet.call(self); // End of date
      }
      if (txt) {
        setTz.call(self);
      }
    }

    for (i = 0; i < dString.length; i++) {
      var c = dString.charAt(i);
      var digit = null;
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
          digit = (c - '0');
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
          } else if (this.minutes) {
            this.setSeconds(value());
            zReady = true;
          } else if (this.hour) {
            this.setMinutes(value());
            zReady = true;
          } else {
            this.setHour(value());
          }
          number = null;
          break;
        case 'T':
          if (!txt) {
            hourNumber = !isNaN(dString.charAt(i + 1));
          } else {
            txt = txt ? txt + c : c;
            break;
          }
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
          if (number) {
            timeSet.call(this); // End of minutes or seconds
          }
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
}