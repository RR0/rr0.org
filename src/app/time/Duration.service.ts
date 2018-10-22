import {Unit} from "./Unit.service";

export class Duration {
  durationInSeconds: number;
  second: Unit;
  minute: Unit;
  hour: Unit;
  day: Unit;
  unit: Unit;

  constructor() {
    'use strict';
    const durationThis = this;

    durationThis.second = new Unit(1, 'seconde');
    durationThis.minute = new Unit(60 * durationThis.second.factor, 'minute');
    durationThis.hour = new Unit(60 * durationThis.minute.factor, 'heure');
    durationThis.day = new Unit(24 * durationThis.hour.factor, 'jour');

  }

  fromString(txt) {
    const durationThis = this;
    var durationRegex = /P(\d+D)*(\d+H)*(\d+M)*(\d+S)*/;
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
  }

  toString(unitStated) {
    var durationThis = this;
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
  }
}