"use strict";
var Label = (function () {
    function Label() {
        this.ago = 'ago';
        this.fromNow = 'from now';
        this.second = 'second';
        this.minute = 'minute';
        this.hour = 'hour';
        this.day = 'day';
        this.week = 'week';
        this.month = 'month';
        this.year = 'year';
    }
    return Label;
}());
exports.Label = Label;
var Props = (function () {
    function Props() {
        this.date = '';
        this.live = true;
        this.component = 'span';
        this.loseTime = Infinity;
        this.loseFormat = 'YYYY-MM-DD HH:mm:ss';
        this.minPeriod = 0;
        this.maxPeriod = Infinity;
        this.label = new Label();
        this.formatter = function (value, unit, suffix, then) {
            if (value !== 1) {
                unit += 's';
            }
            return value + ' ' + unit + ' ' + suffix;
        };
    }
    return Props;
}());
exports.Props = Props;
var State = (function () {
    function State() {
    }
    return State;
}());
exports.State = State;
