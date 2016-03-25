"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Label = function Label() {
    _classCallCheck(this, Label);

    this.ago = 'ago';
    this.fromNow = 'from now';
    this.second = 'second';
    this.minute = 'minute';
    this.hour = 'hour';
    this.day = 'day';
    this.week = 'week';
    this.month = 'month';
    this.year = 'year';
};

exports.Label = Label;
var TimeagoModule;
(function (TimeagoModule) {
    var Props = function Props() {
        _classCallCheck(this, Props);

        this.date = '';
        this.live = true;
        this.component = 'span';
        this.loseTime = Infinity;
        this.loseFormat = 'YYYY-MM-DD HH:mm:ss';
        this.minPeriod = 0;
        this.maxPeriod = Infinity;
        this.useChinese = false;
        this.label = new Label();
        this.formatter = function (value, unit, suffix, then) {
            if (value !== 1) {
                unit += 's';
            }
            return value + ' ' + unit + ' ' + suffix;
        };
    };

    TimeagoModule.Props = Props;
})(TimeagoModule = exports.TimeagoModule || (exports.TimeagoModule = {}));